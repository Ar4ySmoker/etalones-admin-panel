'use client';
import { useState } from "react";
import Image from 'next/image';
import PreviewVacancy from '@/app/ui/dashboard/FormVacancy/PreviewVacancy';
import TransparentInput from "../../inputs/TransparentInput/TransparentInput";
import { useRouter } from "next/navigation";
import TextInput from "../../inputs/TextInput/TextInput";

const FormVacancy = ({ vacancy, managers, professions }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(vacancy.title || '');
    const [salary, setSalary] = useState(vacancy.salary || '');
    const [location, setLocation] = useState(vacancy.location || '');
    const [roof_type, setRoof_type] = useState(vacancy.roof_type || '');
    const [auto, setAuto] = useState(vacancy.auto || '');
    const [positions_available, setPositions_available] = useState(vacancy.positions_available || '');
    const [homePrice, setHomePrice] = useState(vacancy.homePrice || '');
    const [home_descr, setHome_descr] = useState(vacancy.home_descr || '');
    const [work_descr, setWork_descr] = useState(vacancy.work_descr || '');
    const [grafik, setGrafik] = useState(vacancy.grafik || '');
    const [documents, setDocuments] = useState(vacancy.documents || '');
    const [selectedManager, setSelectedManager] = useState(vacancy.manager ? vacancy.manager._id : '');
    const [category, setCategory] = useState(vacancy.category || '');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        formData.append('title', title);
        formData.append('salary', salary);
        formData.append('location', location);
        formData.append('roof_type', roof_type);
        formData.append('auto', auto);
        formData.append('positions_available', positions_available);
        formData.append('homePrice', homePrice);
        formData.append('home_descr', home_descr);
        formData.append('work_descr', work_descr);
        formData.append('grafik', grafik);
        formData.append('documents', documents);
        formData.append('manager', selectedManager);
        formData.append('category', category); // добавление категории в форму

        try {
            const response = await fetch(`/api/vacancy/${vacancy._id}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update vacancy');
            }

            const result = await response.json();
            if (result.success) {
                alert('Успешно обновлено!');
                router.refresh();
                router.push("/dashboard/vacancy");
            } else {
                alert('Не удалось обновить');
            }
        } catch (error) {
            console.error('Ошибка обновления вакансии:', error);
            alert('Не удалось обновить вакансию');
        }
    };

    const handleProfessionChange = (e) => {
        const selectedProfession = professions.find(prof => prof.name === e.target.value);
        if (selectedProfession) {
            setTitle(selectedProfession.name);
            setCategory(selectedProfession.category);
            console.log("ProfessionName", selectedProfession.name);
            console.log("ProfessionCategory", selectedProfession.category);
        }
    };
    

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            <h2>Изменить вакансию</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap justify-center w-full h-max mt-8">
                        <div className="card w-96 glass m-4">
                            <figure>
                                {file ? (
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt="Uploaded file"
                                        width={400}
                                        height={400}
                                    />
                                ) : (
                                    <Image
                                        src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}
                                        alt={vacancy.image.name}
                                        width={400}
                                        height={400}
                                    />
                                )}
                            </figure>
                            <div className="card-body">
                                <select className="select select-bordered select-sm w-full max-w-xs"
                                defaultValue={vacancy.title}
                                    onChange={handleProfessionChange}>
                                    {professions.map(profession => (
                                        <option key={profession._id} value={profession.name}>{profession.name}</option>
                                    ))}
                                </select>
                                <p className="text-md font-semibold mt-2 w-max">📍<i className="bi bi-geo-alt-fill text-red-500"></i>
                                    <TransparentInput className='font-bold bg-transparent'
                                        defaultValue={vacancy.location} type='text' name='location' onChange={(e) => setLocation(e.target.value)} /></p>
                                {vacancy.roof_type && (
                                    <span className="text-muted text-sm">
                                        ⚙️ <i className="bi bi-dash-lg text-red-700 font-bold">
                                            <TransparentInput className='font-bold bg-transparent'
                                                defaultValue={vacancy.roof_type} type='text' name='roof_type' onChange={(e) => setRoof_type(e.target.value)} /></i>
                                    </span>
                                )}
                                <p className="text-sm font-bold">💰 <i className="bi bi-cash ">Зарплата</i>&nbsp;
                                    <TransparentInput className='font-bold bg-transparent'
                                        defaultValue={vacancy.salary} type='text' name='salary' onChange={(e) => setSalary(e.target.value)} />
                                </p>
                                <p className="text-sm font-bold">🏠 <i className="bi bi-cash ">Проживание</i>&nbsp;
                                    <TransparentInput className='font-bold bg-transparent'
                                        defaultValue={vacancy.homePrice} type='text' name='homePrice' onChange={(e) => setHomePrice(e.target.value)} />
                                </p>
                                <p className="text-sm font-bold">🚘 <i className="bi bi-cash ">Транспорт</i>&nbsp;
                                    <TransparentInput className='font-bold bg-transparent'
                                        defaultValue={vacancy.auto} type='text' name='auto' onChange={(e) => setAuto(e.target.value)} />
                                </p>
                                <p className="text-sm font-bold">📄 <i className="bi bi-cash ">Документы:</i><br /> {documents}</p>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <PreviewVacancy vacancy={vacancy} file={file} />
                        <div className="grid items-end">
                            <label htmlFor="manager">
                                <div>Менеджер {vacancy.manager?.name}</div>
                                <select
                                    className="select select-bordered select-sm w-full max-w-xs"
                                    id="manager"
                                    name="manager"
                                    value={selectedManager}
                                    onChange={(e) => setSelectedManager(e.target.value)}
                                >
                                    <option disabled>Выберите менеджера</option>
                                    {managers.map(m => (
                                        <option key={m._id} value={m._id}>{m.name}</option>
                                    ))}
                                </select>
                            </label>
                            <input
                                className="file-input file-input-bordered w-full max-w-xs"
                                type='file'
                                name='file'
                                onChange={handleFileChange}
                            />
                            <TextInput title="Сколько свободных мест" type='text'
                                placeholder="Сколько свободных мест"
                                name='positions_available'
                                value={positions_available}
                                onChange={(e) => setPositions_available(e.target.value)} />
                            <label htmlFor="">
                                <div>Описание условий проживания</div>
                                <textarea
                                    className="textarea textarea-accent md:w-[300px] h-[200px]"
                                    placeholder="Описание условий проживания"
                                    name='home_descr'
                                    value={home_descr}
                                    onChange={(e) => setHome_descr(e.target.value)}
                                />
                            </label>
                            <label htmlFor="">
                                <div>Развёрнутое описание вакансии</div>
                                <textarea
                                    className="textarea textarea-accent md:w-[300px] h-[200px]"
                                    placeholder="Развёрнутое описание вакансии"
                                    name='work_descr'
                                    value={work_descr}
                                    onChange={(e) => setWork_descr(e.target.value)}
                                />
                            </label>
                            <label htmlFor="">
                                <div>График работы</div>
                                <textarea
                                    className="textarea textarea-accent w-[300px]"
                                    placeholder="График работы"
                                    name='grafik'
                                    value={grafik}
                                    onChange={(e) => setGrafik(e.target.value)}
                                />
                            </label>
                            <label htmlFor="">
                                <div>Документы</div>
                                <textarea
                                    className="textarea textarea-accent md:w-[300px] h-[100px]"
                                    placeholder={vacancy.documents}
                                    defaultValue={vacancy.documents}
                                    name='documents'
                                    onChange={(e) => setDocuments(e.target.value)}
                                />
                            </label>
                            <button className="btn btn-primary w-full max-w-xs" type="submit">
                                Обновить вакансию
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormVacancy;
