'use client';
import { useState } from "react";
import Image from 'next/image';
import PreviewVacancy from '@/app/ui/dashboard/FormVacancy/PreviewVacancy';
import TransparentInput from "../../inputs/TransparentInput/TransparentInput";

const FormVacancy = ({ vacancy, managers }) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
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
        formData.append('category', category);

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
                router.push('/dashboard/vacancy');
            } else {
                alert('Не удалось обновить');
            }
        } catch (error) {
            console.error('Ошибка обновления вакансии:', error);
            alert('Не удалось обновить вакансию');
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            <h2>Изменить вакансию</h2>
            <div className="grid grid-cols-2 gap-4">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="manager">
                        <div>Менеджер {vacancy.manager.name}</div>
                        <select
                            className="select w-full max-w-xs"
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
                            <option disabled>Выберите категорию</option>
                            <option value="indor">Внутренняя отделка</option>
                            <option value="outdoor">Улица/Земляные работы</option>
                            <option value="krovl">Кровля/Фасады</option>
                            <option value="mehan">Сварщики/Механики</option>
                        </select>
                    </label><br /><br />
                    <input
                        type='text'
                        name='title'
                        placeholder='Job Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    /><br /><br />
                    <input
                        type='text'
                        name='salary'
                        placeholder='Salary'
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    /><br /><br />
                    <input
                        type='text'
                        name='location'
                        placeholder='Location'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    /><br /><br />
                    <input
                        type='text'
                        placeholder="Пару слов о вакансии"
                        name='roof_type'
                        value={roof_type}
                        onChange={(e) => setRoof_type(e.target.value)}
                    /><br /><br />
                    <input
                        type='text'
                        placeholder="Про транспорт"
                        name='auto'
                        value={auto}
                        onChange={(e) => setAuto(e.target.value)}
                    /><br /><br />
                    <input
                        type='text'
                        placeholder="Сколько свободных мест"
                        name='positions_available'
                        value={positions_available}
                        onChange={(e) => setPositions_available(e.target.value)}
                    /><br /><br />
                    <input
                        type='text'
                        placeholder="Стоимость проживания"
                        name='homePrice'
                        value={homePrice}
                        onChange={(e) => setHomePrice(e.target.value)}
                    /><br /><br />
                    <textarea
                        className="textarea textarea-accent md:w-[300px]"
                        placeholder="Описание условий проживания"
                        name='home_descr'
                        value={home_descr}
                        onChange={(e) => setHome_descr(e.target.value)}
                    /><br /><br />
                    <textarea
                        className="textarea textarea-accent md:w-[300px]"
                        placeholder="Развёрнутое описание вакансии"
                        name='work_descr'
                        value={work_descr}
                        onChange={(e) => setWork_descr(e.target.value)}
                    /><br /><br />
                    <textarea
                        className="textarea textarea-accent w-[300px]"
                        placeholder="График работы"
                        name='grafik'
                        value={grafik}
                        onChange={(e) => setGrafik(e.target.value)}
                    /><br /><br />
                    <textarea
                        className="textarea textarea-accent w-[300px]"
                        placeholder="Подходящие документы"
                        name='documents'
                        value={documents}
                        onChange={(e) => setDocuments(e.target.value)}
                    /><br /><br />
                    <input
                        type='file'
                        name='file'
                        onChange={handleFileChange}
                    /><br /><br />
                    <button className="btn btn-primary w-full max-w-xs" type="submit">
                        Обновить вакансию
                    </button>
                </form>
                <div>
                    <div className="flex flex-wrap justify-center w-full h-max mt-8">
                        <div className="card w-96 glass m-4">
                            <figure>
                                {vacancy.image ? (
                                    <Image
                                        src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}
                                        alt="Uploaded file"
                                        width={400}
                                        height={400}
                                    />
                                ) : (
                                    'No image'
                                )}
                            </figure>
                            <div className="card-body">
                                <TransparentInput className='font-bold bg-transparent'
                                    defaultValue={vacancy.title} type='text' name='title' />
                                <p className="text-md font-semibold mt-2 w-max">📍<i className="bi bi-geo-alt-fill text-red-500"></i>
                                    <TransparentInput className='font-bold bg-transparent'
                                        defaultValue={vacancy.location} type='text' name='location' /></p>
                                {vacancy.roof_type && (
                                    <span className="text-muted text-sm">
                                        ⚙️ <i className="bi bi-dash-lg text-red-700 font-bold">{vacancy.roof_type}</i>
                                    </span>
                                )}
                                <p className="text-sm font-bold">💰 <i className="bi bi-cash ">Зарплата</i>&nbsp; {vacancy.salary}</p>
                                <p className="text-sm font-bold">🏠 <i className="bi bi-cash ">Проживание</i>&nbsp; {vacancy.homePrice}</p>
                                <p className="text-sm font-bold">🚘 <i className="bi bi-cash ">Транспорт</i>&nbsp; {vacancy.auto}</p>
                                <p className="text-sm font-bold">📄 <i className="bi bi-cash ">Документы:</i><br /> {vacancy.documents}</p>
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

// 'use client';
// import { useState } from "react";
// import Image from 'next/image';
// import PreviewVacancy from '@/app/ui/dashboard/FormVacancy/PreviewVacancy';
// import TransparentInput from "../../inputs/TransparentInput/TransparentInput";

// const FormVacancy = ({ vacancy, managers}) => {
//     const [file, setFile] = useState(null);
//     const [title, setTitle] = useState(vacancy.title);
//     const [salary, setSalary] = useState(vacancy.salary);
//     const [location, setLocation] = useState(vacancy.location);
//     const [roof_type, setRoof_type] = useState(vacancy.roof_type);
//     const [auto, setAuto] = useState(vacancy.auto);
//     const [positions_available, setPositions_available] = useState(vacancy.positions_available);
//     const [homePrice, setHomePrice] = useState(vacancy.homePrice);
//     const [home_descr, setHome_descr] = useState(vacancy.home_descr);
//     const [work_descr, setWork_descr] = useState(vacancy.work_descr);
//     const [grafik, setGrafik] = useState(vacancy.grafik);
//     const [documents, setDocuments] = useState(vacancy.documents);
//     const [selectedManager, setSelectedManager] = useState(vacancy.selectedManager);
//     const [category, setCategory] = useState(vacancy.category);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
        
//         const reader = new FileReader();
//         reader.onload = async () => {
//             const arrayBuffer = reader.result; // Получаем ArrayBuffer из FileReader
    
//             const body = {
//                 image: {
//                     name: file.name,
//                     data: arrayBuffer,
//                     contentType: file.type
//                 },
//                 title,
//                 salary,
//                 location,
//                 roof_type,
//                 auto,
//                 positions_available,
//                 homePrice,
//                 home_descr,
//                 work_descr,
//                 grafik,
//                 documents,
//                 selectedManager,
//                 category
//             };
    
//             try {
//                 const response = await fetch(`/api/vacancy/${id}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(body)
//                 });
    
//                 if (!response.ok) {
//                     throw new Error('Failed to upload vacancy');
//                 }
    
//                 const result = await response.json();
//                 if (result.success) {
//                     alert('Успешно загружено!!');
//                     router.push('/dashboard/vacancy');
//                 } else {
//                     alert('Не удалось загрузить');
//                 }
//             } catch (error) {
//                 console.error('Ошибка загрузки вакансии:', error);
//                 alert('Не удалось загрузить вакансию');
//             }
//         };
    
//         reader.readAsArrayBuffer(file);
//     };
    

//     return (
//         <>
//             <h2>Создать вакансию</h2>
//             <div className="grid grid-cols-2 gap-4">
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="manager">
//                         <div>Менеджер {vacancy.manager.name}</div>
//                         <select
//                             className="select w-full max-w-xs"
//                             id="manager"
//                             name="manager"
//                             defaultValue={vacancy?.manager._id} 
//                         >
//                             <option disabled >Выберите менеджера</option>
//                             {managers.map(m => (
//                                 <option key={m._id} value={m._id}>{m.name}</option>
//                             ))}
//                         </select>
//                     </label><br /><br />
//                     <label htmlFor="category">
//                         <div>Выберите категорию работ</div>
//                         <select
//                             defaultValue={vacancy.category}
//                             className="select w-md max-w-xs"
//                             id="category"
//                             name="category"
//                         >
//                             <option disabled>Выберите категорию</option>
//                             <option value="indor">Внутренняя отделка</option>
//                             <option value="outdoor">Улица/Земляные работы</option>
//                             <option value="krovl">Кровля/Фасады</option>
//                             <option value="mehan">Сварщики/Механики</option>
//                         </select>
//                     </label><br /><br />
//                     <input
//                         defaultValue={vacancy.title}
//                         type='text'
//                         name='title'
//                         placeholder='Job Title'
//                     /><br /><br />
//                     <input
//                         type='text'
//                         name='salary'
//                         placeholder='Salary'
//                         defaultValue={vacancy.salary}
//                     /><br /><br />
//                     <input
//                         type='text'
//                         name='location'
//                         placeholder='Location'
//                         defaultValue={vacancy.location}
//                     /><br /><br />
//                     <input
//                         type='text'
//                         defaultValue={vacancy.roof_type}
//                         placeholder="Пару слов о вакансии"
//                         name='roof_type'
//                     /><br /><br />
//                     <input
//                         type='text'
//                         defaultValue={vacancy.auto}
//                         placeholder="Про транспорт"
//                         name='auto'
//                     /><br /><br />
//                     <input
//                         type='text'
//                         defaultValue={vacancy.positions_available}
//                         placeholder="Сколько свободных мест"
//                         name='positions_available'
//                     /><br /><br />
//                     <input
//                         type='text'
//                         placeholder="Стоимость проживания"
//                         defaultValue={vacancy.homePrice}
//                         name='homePrice'
//                     /><br /><br />
//                     <textarea
//                         className="textarea textarea-accent md:w-[300px] "
//                         placeholder="Описание условий проживания"
//                         defaultValue={vacancy.home_descr}
//                         name='home_descr'
//                     /><br /><br />
//                     <textarea
//                         className="textarea textarea-accent md:w-[300px] "
//                         defaultValue={vacancy.work_descr}
//                         placeholder="Развёрнутое описание вакансии"
//                         name='work_descr'
//                     /><br /><br />
//                     <textarea
//                         className="textarea textarea-accent  w-[300px]"
//                         defaultValue={vacancy.grafik}
//                         type='text'
//                         placeholder="График работы"
//                         name='grafik'
//                     /><br /><br />
//                     <textarea
//                         className="textarea textarea-accent  w-[300px]"
//                         defaultValue={vacancy.documents}
//                         placeholder="Подходящие документы"
//                         name='documents'
//                     /><br /><br />
//                     <input
//                         type='file'
//                         name='file'
//                          onChange={(e) => setFile(e.target.files[0])}
//                     /><br /><br />
//                     <button className="btn btn-primary w-full max-w-xs" type="submit">
//                         Обновить вакансию
//                     </button>
//                 </form>
//                 <div>
//                     <div className="flex flex-wrap justify-center w-full h-max mt-8">
//                         <div className="card w-96 glass m-4">
//                             <figure>
//                                 {vacancy.image ? (
//                                     <Image
//                                         src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}
//                                         alt="Uploaded file"
//                                         width={400}
//                                         height={400}
//                                     />
//                                 ) : (
//                                     'No image'
//                                 )}
//                             </figure>
//                             <div className="card-body">
//                                 <TransparentInput className='font-bold bg-transparent' 
//                                 defaultValue={vacancy.title}  type='text' name='title'/>
//                                 <p className="text-md font-semibold mt-2 w-max">📍<i className="bi bi-geo-alt-fill text-red-500"></i>
//                                 <TransparentInput className='font-bold bg-transparent' 
//                                 defaultValue={vacancy.location} type='text' name='location'/></p>
//                                 {vacancy.roof_type && (
//                                     <span className="text-muted text-sm">
//                                         ⚙️ <i className="bi bi-dash-lg text-red-700 font-bold">{vacancy.roof_type}</i>
//                                     </span>
//                                 )}
//                                 <p className="text-sm font-bold">💰 <i className="bi bi-cash ">Зарплата</i>&nbsp; {vacancy.salary}</p>
//                                 <p className="text-sm font-bold">🏠 <i className="bi bi-cash ">Проживание</i>&nbsp; {vacancy.homePrice}</p>
//                                 <p className="text-sm font-bold">🚘 <i className="bi bi-cash ">Транспорт</i>&nbsp; {vacancy.auto}</p>
//                                 <p className="text-sm font-bold">📄 <i className="bi bi-cash ">Документы:</i><br /> {vacancy.documents}</p>
//                             </div>
//                         </div>
//                     </div>
//                     <PreviewVacancy vacancy={vacancy} />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default FormVacancy;
