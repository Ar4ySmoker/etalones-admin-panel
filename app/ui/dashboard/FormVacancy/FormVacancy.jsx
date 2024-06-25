'use client';

// import { useState } from "react";

// const UploadImage = () => {
//     const [file, setFile] = useState();
//     const [title, setTitle] = useState('');
//     const [salary, setSalary] = useState('');
//     const [location, setLocation] = useState('');
//     const [roof_type, setRoof_type] = useState('');
//     const [auto, setAuto] = useState('');
//     const [positions_available, setPositions_available] = useState('');
//     const [homePrice, setHomePrice] = useState('');
//     const [home_descr, setHome_descr] = useState('');
//     const [work_descr, setWork_descr] = useState('');
//     const [grafik, setGrafik] = useState('');
//     const [documents, setHDocuments] = useState('');
//     const [managerName, setManagerName] = useState('');
//     const [managerPhone, setManagerPhone] = useState('');
//     const [managerImage, setManagerImage] = useState('');
//     const [managerViber, setManagerViber] = useState('');
//     const [managerTelegram, setManagerTelegram] = useState('');
//     const [managerWhatsapp, setManagerWhatsapp] = useState('');
//     const [category, setCategory] = useState('');




//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!file || !title || !salary || !location || 
//             !roof_type || !auto || !positions_available || !homePrice ||
//             !home_descr || !work_descr || !grafik || !documents ||
//             !managerName || !managerPhone || !managerImage || !managerViber ||
//             !managerTelegram || !managerWhatsapp || !category) {
//             alert('Please fill in all fields and select a file');
//             return;
//         }

//         const data = new FormData();
//         data.append('file', file);
//         data.append('title', title);
//         data.append('salary', salary);
//         data.append('location', location);

//         data.append('roof_type', roof_type);
//         data.append('auto', auto);
//         data.append('positions_available', positions_available);
//         data.append('homePrice', homePrice);
//         data.append('home_descr', home_descr);
//         data.append('work_descr', work_descr);
//         data.append('grafik', grafik)
//         data.append('documents', documents)
//         data.append('manager.name', managerName);
//         data.append('manager.phone', managerPhone);
//         data.append('manager.image', managerImage);
//         data.append('manager.viber', managerViber);
//         data.append('manager.telegram', managerTelegram);
//         data.append('manager.whatsapp', managerWhatsapp);
//         data.append('category', category)

//         try {
//             let result = await fetch('/api/vacancy', {
//                 method: "POST",
//                 body: data
//             });
//             result = await result.json();
//             if (result.success) {
//                 alert("Successfully Uploaded!!");
//             } else {
//                 alert("Failed!!");
//             }
//         } catch (error) {
//             console.log(error);
//             alert("Failed!!");
//         }
//     };

//     return (
//         <>
//             <h2>Создать вакансию</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type='text'
//                     name='title'
//                     placeholder='Job Title'
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     name='salary'
//                     placeholder='Salary'
//                     value={salary}
//                     onChange={(e) => setSalary(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     name='location'
//                     placeholder='Location'
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                 /><br /><br />
               
//                 <input
//                     type='text'
//                     placeholder="Пару слов о вакансии"
//                     name='roof_type'
//                     onChange={(e) => setRoof_type(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     placeholder="Про транспорт"
//                     name='auto'
//                     onChange={(e) => setAuto(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     placeholder="Сколько свободных мест"
//                     name='positions_available'
//                     onChange={(e) => setPositions_available(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     placeholder="Стоимость проживания"
//                     name='homePrice'
//                     onChange={(e) => setHomePrice(e.target.value)}
//                 /><br /><br />
//                 <textarea
//                 className="textarea textarea-accent w-full "
//                     placeholder="Описание условий проживания"
//                     name='home_descr'
//                     onChange={(e) => setHome_descr(e.target.value)}
//                 /><br /><br />
//                 <textarea
//                 className="textarea textarea-accent w-full "
//                     type='text'
//                     placeholder="Развёрнутое описание вакансии"
//                     name='work_descr'
//                     onChange={(e) => setWork_descr(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     placeholder="График работы"
//                     name='grafik'
//                     onChange={(e) => setGrafik(e.target.value)}
//                 /><br /><br />
//                  <input
//                     type='text'
//                     placeholder="Подходящие документы"
//                     name='documents'
//                     onChange={(e) => setHDocuments(e.target.value)}
//                 /><br /><br />
//                 <h3>Manager Information</h3>
//                 <input
//                     type='text'
//                     placeholder="Имя менеджера"
//                     name='managerName'
//                     onChange={(e) => setManagerName(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     placeholder="Телефон менеджера"
//                     name='managerPhone'
//                     onChange={(e) => setManagerPhone(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     placeholder="Изображение менеджера"
//                     name='managerImage'
//                     onChange={(e) => setManagerImage(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     placeholder="Viber менеджера"
//                     name='managerViber'
//                     onChange={(e) => setManagerViber(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     placeholder="Telegram менеджера"
//                     name='managerTelegram'
//                     onChange={(e) => setManagerTelegram(e.target.value)}
//                 /><br /><br />
//                 <input
//                     type='text'
//                     placeholder="Whatsapp менеджера"
//                     name='managerWhatsapp'
//                     onChange={(e) => setManagerWhatsapp(e.target.value)}
//                 /><br /><br />
//                  <input
//                     type='text'
//                     placeholder="Категория"
//                     name='category'
//                     onChange={(e) => setCategory(e.target.value)}
//                 /><br /><br />


// <input
//                     type='file'
//                     name='file'
//                     onChange={(e) => setFile(e.target.files?.[0])}
//                 /><br /><br />
//                 <button type='submit'>Создать</button>
//             </form>
//         </>
//     );
// };

// export default UploadImage;
// UploadImage.js

import { useState } from "react";

const UploadImage = () => {
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
    const [managerName, setManagerName] = useState('');
    const [managerPhone, setManagerPhone] = useState('');
    const [managerImage, setManagerImage] = useState('');
    const [managerViber, setManagerViber] = useState('');
    const [managerTelegram, setManagerTelegram] = useState('');
    const [managerWhatsapp, setManagerWhatsapp] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title || !salary || !location || !roof_type || !auto || !positions_available ||
            !homePrice || !home_descr || !work_descr || !grafik || !documents || !managerName ||
            !managerPhone || !managerImage || !managerViber || !managerTelegram || !managerWhatsapp || !category) {
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
        data.append('managerName', managerName);
        data.append('managerPhone', managerPhone);
        data.append('managerImage', managerImage);
        data.append('managerViber', managerViber);
        data.append('managerTelegram', managerTelegram);
        data.append('managerWhatsapp', managerWhatsapp);
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
        } catch (error) {
            console.error("Error uploading vacancy:", error);
            alert("Failed to upload");
        }
    };

    return (
        <>
            <h2>Создать вакансию</h2>
            <form onSubmit={handleSubmit}>
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
                <input
                    type='text'
                    placeholder="Описание условий проживания"
                    name='home_descr'
                    onChange={(e) => setHome_descr(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Развёрнутое описание вакансии"
                    name='work_descr'
                    onChange={(e) => setWork_descr(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="График работы"
                    name='grafik'
                    onChange={(e) => setGrafik(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Подходящие документы"
                    name='documents'
                    onChange={(e) => setDocuments(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Имя менеджера"
                    name='managerName'
                    onChange={(e) => setManagerName(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Телефон менеджера"
                    name='managerPhone'
                    onChange={(e) => setManagerPhone(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Фото менеджера"
                    name='managerImage'
                    onChange={(e) => setManagerImage(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Viber менеджера"
                    name='managerViber'
                    onChange={(e) => setManagerViber(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Telegram менеджера"
                    name='managerTelegram'
                    onChange={(e) => setManagerTelegram(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Whatsapp менеджера"
                    name='managerWhatsapp'
                    onChange={(e) => setManagerWhatsapp(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    placeholder="Категория вакансии"
                    name='category'
                    onChange={(e) => setCategory(e.target.value)}
                /><br /><br />
                <input
                    type='file'
                    name='file'
                    onChange={(e) => setFile(e.target.files?.[0])}
                /><br /><br />
                <button type='submit'>Создать</button>
            </form>
        </>
    );
};

export default UploadImage;
