'use client';
import { useState } from "react";
import Image from 'next/image';
import PreviewVacancy from '@/app/ui/dashboard/FormVacancy/PreviewVacancy'

const FormVacancy = ({manager}) => {
    console.log(manager)
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [roof_type, setRoof_type] = useState('');
    const [auto, setAuto] = useState('');
    const [positions_available, setPositions_available] = useState('');
    const [homePrice, setHomePrice] = useState('');
    const [home_descr, setHome_descr] = useState('');
    const [work_descr, setWork_descr] = useState('');
    const [grafik, setGrafik] = useState('');
    const [documents, setDocuments] = useState('');
    const [selectedManager, setSelectedManager] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title || !salary || !location || !roof_type || !auto || !positions_available ||
            !homePrice || !home_descr || !work_descr || !grafik || !documents || !selectedManager
            || !category) {
            alert('Please fill in all fields and select a file');
            return;
        }

        const data = new FormData();
        data.append('file', file);
        data.append('title', title);
        data.append('salary', salary);
        data.append('location', location);
        data.append('roof_type', roof_type);
        data.append('auto', auto);
        data.append('positions_available', positions_available);
        data.append('homePrice', homePrice);
        data.append('home_descr', home_descr);
        data.append('work_descr', work_descr);
        data.append('grafik', grafik);
        data.append('documents', documents);
        data.append('manager', selectedManager);
        data.append('category', category);

        try {
            let result = await fetch('/api/vacancy', {
                method: "POST",
                body: data
            });
            result = await result.json();
            if (result.success) {
                alert("Successfully Uploaded!!");
            } else {
                alert("Failed to upload");
            }
            router.refresh();
            router.push("/dashboard/vacancy");
        } catch (error) {
            console.error("Error uploading vacancy:", error);
            alert("Failed to upload");
        }
    };
    const vacancy = {
        job_title: title,
        location,
        image: file ? URL.createObjectURL(file) : null,
        positions_available,
        salary,
        homePrice,
        home_descr,
        work_descr,
        grafik,
        documents,
        category
    };

    return (
        <>
            <h2>Создать вакансию</h2>
            <div className="grid grid-cols-2 gap-4">
            <form onSubmit={handleSubmit}>
            <label htmlFor="manager">
                    <div>Менеджер</div>
                    <select
                        className="select w-full max-w-xs"
                        id="manager"
                        name="manager"
                        value={selectedManager}
                        onChange={(e) => setSelectedManager(e.target.value)}
                    >
                        <option disabled value="">Выберите менеджера</option>
                        {manager.map(m => (
                            <option key={m._id} value={m._id}>{m.name}</option>
                        ))}
                    </select>
                </label><br /><br />
                <label htmlFor="category">
                    <div>Выберите категорию работ</div>
                    <select
                        className="select w-md max-w-xs"
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option disabled value="">Выберите категорию</option>
                        <option value="indor">Внутренняя отделка</option>
                        <option value="outdoor">Улица/Земляные работы</option>
                        <option value="krovl">Кровля/Фасады</option>
                        <option value="mehan">Сварщики/Механики</option>

                    </select>
                </label><br /><br />
                <input
                    type='text'
                    name='title'
                    placeholder='Заголовок/ Название вакансии'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    name='salary'
                    placeholder='Зарплата'
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    name='location'
                    placeholder='Город, страна'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Пару слов о вакансии"
                    name='roof_type'
                    onChange={(e) => setRoof_type(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Про транспорт"
                    name='auto'
                    onChange={(e) => setAuto(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Сколько свободных мест"
                    name='positions_available'
                    onChange={(e) => setPositions_available(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Стоимость проживания"
                    name='homePrice'
                    onChange={(e) => setHomePrice(e.target.value)}
                /><br /><br />
                <textarea
                className="textarea textarea-accent md:w-[300px] "
                    placeholder="Описание условий проживания"
                    name='home_descr'
                    onChange={(e) => setHome_descr(e.target.value)}
                /><br /><br />
                <textarea
                                className="textarea textarea-accent md:w-[300px] "
                    placeholder="Развёрнутое описание вакансии"
                    name='work_descr'
                    onChange={(e) => setWork_descr(e.target.value)}
                /><br /><br />
                <textarea
                className="textarea textarea-accent  "
                    type='text'
                    placeholder="График работы"
                    name='grafik'
                    onChange={(e) => setGrafik(e.target.value)}
                /><br /><br />
                <textarea
                                className="textarea textarea-accent  "
                    placeholder="Подходящие документы"
                    name='documents'
                    onChange={(e) => setDocuments(e.target.value)}
                /><br /><br />
              
               
                {/* <input
                    type='text'
                    placeholder="Категория вакансии"
                    name='category'
                    onChange={(e) => setCategory(e.target.value)}
                /><br /><br /> */}
                <select name="category" id="category"
                onChange={(e) => setCategory(e.target.value)}>
<option selected hidden disabled>
            Выберите категорию
          </option>                    <option value="indor">Внутриняя отделка</option>
                    <option value="outdor">Улица/Земляные работы</option>
                    <option value="krovl">Кровля/Фасады</option>
                    <option value="mehan">Сварка/Механик</option>
                </select>
                <input
                    type='file'
                    name='file'
                    onChange={(e) => setFile(e.target.files?.[0])}
                /><br /><br />
                <button type='submit'>Создать</button>
            </form>
            <div>
            <div className="flex flex-wrap justify-center w-full h-max mt-8">
                <div className="card w-96 glass m-4">
                    <figure>
                        {file ? (
                            <Image
                                src={URL.createObjectURL(file)}
                                alt="Uploaded file"
                                width={400} height={400}
                            />
                        ) : (
                            'No image'
                        )}
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">{title}</h2>
                        <p className="text-md font-semibold mt-2">📍<i className="bi bi-geo-alt-fill text-red-500"></i> {location}</p>
                        {roof_type && (
                            <span className="text-muted text-sm">
                                ⚙️ <i className="bi bi-dash-lg text-red-700 font-bold">{roof_type}</i>
                            </span>
                        )}
                        <p className="text-sm font-bold">💰 <i className="bi bi-cash ">Зарплата</i>&nbsp; {salary}</p>
                        <p className="text-sm font-bold">🏠 <i className="bi bi-cash ">Проживание</i>&nbsp; {homePrice}</p>
                        <p className="text-sm font-bold">🚘 <i className="bi bi-cash ">Транспорт</i>&nbsp; {auto}</p>
                        <p className="text-sm font-bold">📄 <i className="bi bi-cash ">Документы:</i><br /> {documents}</p>
                    </div>
                </div>
            </div>
            <PreviewVacancy vacancy={vacancy} />

            </div>
            </div>
        </>
    );
};

export default FormVacancy;
