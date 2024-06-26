// 'use client';
// import { useState } from "react";
// import Image from 'next/image';
// import PreviewVacancy from '@/app/ui/dashboard/FormVacancy/PreviewVacancy'

// const FormVacancy = ({ vacancy, managers}) => {

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);

// const body = {
//     image: formData.get('file') || vacancy.image,
//     title: formData.get('title') || vacancy.title,
//     salary: formData.get('salary') || vacancy.salary,
//     location: formData.get('location') || vacancy.location,
//     roof_type: formData.get('roof_type') || vacancy.roof_type,
//     auto: formData.get('auto') || vacancy.auto,
//     positions_available: formData.get('positions_available') || vacancy.positions_available,
//     homePrice: formData.get('homePrice') || vacancy.homePrice,
//     home_descr: formData.get('home_descr') || vacancy.home_descr,
//     work_descr: formData.get('work_descr') || vacancy.work_descr,
//     grafik: formData.get('grafik') || vacancy.grafik,
//     documents: formData.get('documents') || vacancy.documents,
//     selectedManager: formData.get('selectedManager') || vacancy.selectedManager,
//     category: formData.get('category') || vacancy.category
// }
//         try {
//             let res = await fetch(`http://localhost:3000/api/vacancy/${id}`, {
//                 headers: {
//                     "Content-type": "application/json",
//                 },
//                 body: JSON.stringify(body),
//             });
//             if (!res.ok) {
//                 throw new Error("Failed to update Candidate");
//             }
    
//             router.refresh();
//             router.push("/dashboard/vacancy");
//         } catch (error) {
//             console.log(error);
//         }
//     };


//     return (
//         <>
//             <h2>Создать вакансию</h2>
//             <div className="grid grid-cols-2 gap-4">
//             <form onSubmit={handleSubmit}>
//             <label htmlFor="manager">
//                     <div>Менеджер {vacancy.title}</div>
//                     <select
//                         className="select w-full max-w-xs"
//                         id="manager"
//                         name="manager"
//                         defaultValue={vacancy?.manager?._id} 
//                     >
//                         <option disabled value="">Выберите менеджера</option>
//                         {managers.map(m => (
//                             <option key={m._id} value={m._id}>{m.name}</option>
//                         ))}
//                     </select>
//                 </label><br /><br />
//                 <label htmlFor="category">
//                     <div>Выберите категорию работ</div>
//                     <select
//                     defaultValue={vacancy.category}
//                         className="select w-md max-w-xs"
//                         id="category"
//                         name="category"
                        
//                     >
//                         <option disabled >Выберите категорию</option>
//                         <option value="indor">Внутренняя отделка</option>
//                         <option value="outdoor">Улица/Земляные работы</option>
//                         <option value="krovl">Кровля/Фасады</option>
//                         <option value="mehan">Сварщики/Механики</option>

//                     </select>
//                 </label><br /><br />
//                 <input
//                     defaultValue={vacancy.title}
//                     type='text'
//                     name='title'
//                     placeholder='Job Title'
//                 /><br /><br />
//                 <input
//                     type='text'
//                     name='salary'
//                     placeholder='Salary'
//                     defaultValue={vacancy.salary}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     name='location'
//                     placeholder='Location'
//                     defaultValue={vacancy.location}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     defaultValue={vacancy.roof_type}
//                     placeholder="Пару слов о вакансии"
//                     name='roof_type'
//                 /><br /><br />
//                 <input
//                     type='text'
//                     defaultValue={vacancy.auto}
//                     placeholder="Про транспорт"
//                     name='auto'
//                 /><br /><br />
//                 <input
//                     type='text'
//                     defaultValue={vacancy.positions_available}
//                     placeholder="Сколько свободных мест"
//                     name='positions_available'
//                 /><br /><br />
//                 <input
//                     type='text'
//                     placeholder="Стоимость проживания"
//                     defaultValue={vacancy.homePrice}
//                     name='homePrice'
//                 /><br /><br />
//                 <textarea
//                 className="textarea textarea-accent md:w-[300px] "
//                     placeholder="Описание условий проживания"
//                     defaultValue={vacancy.home_descr}
//                     name='home_descr'
//                 /><br /><br />
//                 <textarea
//                                 className="textarea textarea-accent md:w-[300px] "
//                                 defaultValue={vacancy.work_descr}

//                     placeholder="Развёрнутое описание вакансии"
//                     name='work_descr'
//                 /><br /><br />
//                 <textarea
//                 className="textarea textarea-accent  w-[300px]"
//                 defaultValue={vacancy.grafik}
//                     type='text'
//                     placeholder="График работы"
//                     name='grafik'
//                 /><br /><br />
//                 <textarea
//                                 className="textarea textarea-accent  w-[300px]"
//                                 defaultValue={vacancy.documents}
//                     placeholder="Подходящие документы"
//                     name='documents'
//                 /><br /><br />
              
               
//                 {/* <input
//                     type='text'
//                     placeholder="Категория вакансии"
//                     name='category'
//                     onChange={(e) => setCategory(e.target.value)}
//                 /><br /><br /> */}
//                 {/* <select name="category" id="category" 
//                 defaultValue={vacancy.category}
//                 onChange={(e) => setCategory(e.target.value)}>
// <option selected hidden disabled>
//             Выберите категорию
//           </option>                    <option value="indor">Внутриняя отделка</option>
//                     <option value="outdor">Улица/Земляные работы</option>
//                     <option value="krovl">Кровля/Фасады</option>
//                     <option value="mehan">Сварка/Механик</option>
//                 </select> */}
//                 <input
//                     type='file'
//                     name='file'
//                 /><br /><br />
//  <button className="btn btn-primary w-full max-w-xs">
//                 Обновить вакансию 
//             </button>            
//             </form>
//             <div>
//             <div className="flex flex-wrap justify-center w-full h-max mt-8">
//                 <div className="card w-96 glass m-4">
//                     <figure>
//                     {vacancy.image ? (
//     <Image
//         src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}
//         alt="Uploaded file"
//         width={400}
//         height={400}
//     />
// ) : (
//     'No image'
// )}

//                     </figure>
//                     <div className="card-body">
//                         <h2 className="card-title font-bold">{vacancy.title}</h2>
//                         <p className="text-md font-semibold mt-2">📍<i className="bi bi-geo-alt-fill text-red-500"></i> {vacancy.location}</p>
//                         {vacancy.roof_type && (
//                             <span className="text-muted text-sm">
//                                 ⚙️ <i className="bi bi-dash-lg text-red-700 font-bold">{vacancy.roof_type}</i>
//                             </span>
//                         )}
//                         <p className="text-sm font-bold">💰 <i className="bi bi-cash ">Зарплата</i>&nbsp; {vacancy.salary}</p>
//                         <p className="text-sm font-bold">🏠 <i className="bi bi-cash ">Проживание</i>&nbsp; {vacancy.homePrice}</p>
//                         <p className="text-sm font-bold">🚘 <i className="bi bi-cash ">Транспорт</i>&nbsp; {vacancy.auto}</p>
//                         <p className="text-sm font-bold">📄 <i className="bi bi-cash ">Документы:</i><br /> {vacancy.documents}</p>
//                     </div>
//                 </div>
//             </div>
//             <PreviewVacancy vacancy={vacancy} />

//             </div>
//             </div>
//         </>
//     );
// };

// export default FormVacancy;
'use client';
import { useState } from "react";
import Image from 'next/image';
import PreviewVacancy from '@/app/ui/dashboard/FormVacancy/PreviewVacancy';
import TransparentInput from "../../inputs/TransparentInput/TransparentInput";

const FormVacancy = ({ vacancy, managers, router }) => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const body = {
            image: file || vacancy.image,
            title: formData.get('title') || vacancy.title,
            salary: formData.get('salary') || vacancy.salary,
            location: formData.get('location') || vacancy.location,
            roof_type: formData.get('roof_type') || vacancy.roof_type,
            auto: formData.get('auto') || vacancy.auto,
            positions_available: formData.get('positions_available') || vacancy.positions_available,
            homePrice: formData.get('homePrice') || vacancy.homePrice,
            home_descr: formData.get('home_descr') || vacancy.home_descr,
            work_descr: formData.get('work_descr') || vacancy.work_descr,
            grafik: formData.get('grafik') || vacancy.grafik,
            documents: formData.get('documents') || vacancy.documents,
            selectedManager: formData.get('manager') || vacancy.selectedManager,
            category: formData.get('category') || vacancy.category
        };

        try {
            const res = await fetch(`http://localhost:3000/api/vacancy/${vacancy._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error('Failed to update vacancy');
            }

            console.log('Vacancy updated successfully!');
            router.refresh();
            router.push('/dashboard/vacancy');
        } catch (error) {
            console.error('Error updating vacancy:', error);
            alert('Failed to update vacancy');
        }
    };

    return (
        <>
            <h2>Создать вакансию</h2>
            <div className="grid grid-cols-2 gap-4">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="manager">
                        <div>Менеджер {vacancy.title}</div>
                        <select
                            className="select w-full max-w-xs"
                            id="manager"
                            name="manager"
                            defaultValue={vacancy?.manager._id} 
                        >
                            <option disabled >Выберите менеджера</option>
                            {managers.map(m => (
                                <option key={m._id} value={m._id}>{m.name}</option>
                            ))}
                        </select>
                    </label><br /><br />
                    <label htmlFor="category">
                        <div>Выберите категорию работ</div>
                        <select
                            defaultValue={vacancy.category}
                            className="select w-md max-w-xs"
                            id="category"
                            name="category"
                        >
                            <option disabled>Выберите категорию</option>
                            <option value="indor">Внутренняя отделка</option>
                            <option value="outdoor">Улица/Земляные работы</option>
                            <option value="krovl">Кровля/Фасады</option>
                            <option value="mehan">Сварщики/Механики</option>
                        </select>
                    </label><br /><br />
                    <input
                        defaultValue={vacancy.title}
                        type='text'
                        name='title'
                        placeholder='Job Title'
                    /><br /><br />
                    <input
                        type='text'
                        name='salary'
                        placeholder='Salary'
                        defaultValue={vacancy.salary}
                    /><br /><br />
                    <input
                        type='text'
                        name='location'
                        placeholder='Location'
                        defaultValue={vacancy.location}
                    /><br /><br />
                    <input
                        type='text'
                        defaultValue={vacancy.roof_type}
                        placeholder="Пару слов о вакансии"
                        name='roof_type'
                    /><br /><br />
                    <input
                        type='text'
                        defaultValue={vacancy.auto}
                        placeholder="Про транспорт"
                        name='auto'
                    /><br /><br />
                    <input
                        type='text'
                        defaultValue={vacancy.positions_available}
                        placeholder="Сколько свободных мест"
                        name='positions_available'
                    /><br /><br />
                    <input
                        type='text'
                        placeholder="Стоимость проживания"
                        defaultValue={vacancy.homePrice}
                        name='homePrice'
                    /><br /><br />
                    <textarea
                        className="textarea textarea-accent md:w-[300px] "
                        placeholder="Описание условий проживания"
                        defaultValue={vacancy.home_descr}
                        name='home_descr'
                    /><br /><br />
                    <textarea
                        className="textarea textarea-accent md:w-[300px] "
                        defaultValue={vacancy.work_descr}
                        placeholder="Развёрнутое описание вакансии"
                        name='work_descr'
                    /><br /><br />
                    <textarea
                        className="textarea textarea-accent  w-[300px]"
                        defaultValue={vacancy.grafik}
                        type='text'
                        placeholder="График работы"
                        name='grafik'
                    /><br /><br />
                    <textarea
                        className="textarea textarea-accent  w-[300px]"
                        defaultValue={vacancy.documents}
                        placeholder="Подходящие документы"
                        name='documents'
                    /><br /><br />
                    <input
                        type='file'
                        name='file'
                        onChange={(e) => setFile(e.target.files[0])}
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
                                defaultValue={vacancy.title}  type='text' name='title'/>
                                <p className="text-md font-semibold mt-2 w-max">📍<i className="bi bi-geo-alt-fill text-red-500"></i>
                                <TransparentInput className='font-bold bg-transparent' 
                                defaultValue={vacancy.location} type='text' name='location'/></p>
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
