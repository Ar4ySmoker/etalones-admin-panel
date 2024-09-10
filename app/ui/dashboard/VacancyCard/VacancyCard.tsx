// 'use client';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Checkbox } from 'react-daisyui';

// function VacancyCard() {
//     const [vacancies, setVacancies] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const fetchVacancies = async () => {
//         try {
//             // const response = await fetch('http://localhost:3000/api/vacancy');
//             const response = await fetch('https://www.candidat.store/api/vacancy');

//             const data = await response.json();
//             setVacancies(data);
//             setIsLoading(false);
//         } catch (error) {
//             console.error("Error fetching vacancies:", error);
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchVacancies();
//     }, []);

//     const handleCheckboxChange = async (vacancy, field, value) => {
//         try {
//             // const response = await fetch(`http://localhost:3000/api/checkboxVacancy/${vacancy._id}`, {
//                 const response = await fetch(`https://www.candidat.store/api/checkboxVacancy/${vacancy._id}`, {

//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ [field]: value }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update vacancy');
//             }

//             const updatedVacancy = await response.json();
//             setVacancies((prevVacancies) =>
//                 prevVacancies.map((v) =>
//                     v._id === vacancy._id ? { ...v, [field]: value } : v
//                 )
//             );
//         } catch (error) {
//             console.error('Error updating vacancy:', error);
//         }
//     };

//     return (
//         <div className="overflow-x-auto flex flex-col items-center">
//             <h2 className="text-2xl font-bold mb-4">Список вакансий на сайте</h2>
//             {isLoading ? (
//                 <p><span className="loading loading-spinner loading-md"></span> Загрузка...</p>
//             ) : (
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Владелец</th>
//                             <th>Заголовок</th>
//                             <th>Зарплата</th>
//                             <th>Местоположение</th>
//                             <th>Картинка</th>
//                             <th>Обновить</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {vacancies.map((vacancy) => (
//                             <tr key={vacancy._id}>
//                                 <td className='flex flex-col gap-3'>
//                                     <div className='badge badge-ghost badge-md w-[150px] font-semibold'>{vacancy.manager.name}</div>
//                                     <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>
//                                         <p>Опубликовано</p>
//                                         <Checkbox
//                                             checked={vacancy.published}
//                                             onChange={(e) => handleCheckboxChange(vacancy, 'published', e.target.checked)}
//                                         />
//                                     </div>
//                                     <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>
//                                         Срочно
//                                         <Checkbox
//                                             checked={vacancy.urgently}
//                                             onChange={(e) => handleCheckboxChange(vacancy, 'urgently', e.target.checked)}
//                                         />
//                                     </div>
//                                     <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>
//                                         Осталось 1 место
//                                         <Checkbox
//                                             checked={vacancy.last}
//                                             onChange={(e) => handleCheckboxChange(vacancy, 'last', e.target.checked)}
//                                         />
//                                     </div>
//                                 </td>
//                                 <td>{vacancy.title}</td>
//                                 <td>{vacancy.salary}</td>
//                                 <td>{vacancy.location}</td>
//                                 <td>
//                                     {vacancy.image ? (
//                                         <Image
//                                             src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}
//                                             alt={vacancy.image.name}
//                                             width={150}
//                                             height={150}
//                                         />
//                                     ) : (
//                                         'No image'
//                                     )}
//                                 </td>
//                                 <td>
//                                     <Link href={`/dashboard/vacancy/edit/${vacancy._id}`}>
//                                         <button className="btn btn-sm btn-outline btn-error w-max">
//                                             Редактировать
//                                         </button>
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default VacancyCard;


// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Checkbox } from 'react-daisyui';

// interface IVacancy {
//     _id: string;
//     title: string;
//     salary: string;
//     location: string;
//     published: boolean;
//     urgently: boolean;
//     last: boolean;
//     image?: {
//         contentType: string;
//         data: Buffer;
//         name: string;
//     };
//     manager?: {
//         name: string;
//     };
// }

// function VacancyCard() {
//     const [vacancies, setVacancies] = useState<IVacancy[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [page, setPage] = useState(1);

//     const fetchVacancies = async () => {
//         try {
//             // const response = await fetch(`http://localhost:3000/api/vacancy?page=${page}&limit=1`);
//             const response = await fetch(`https://www.candidat.store/api/vacancy?page=${page}&limit=1`);
//             const data = await response.json();
//             setVacancies(prevVacancies => [...prevVacancies, ...data]);
//             setIsLoading(false);
//         } catch (error) {
//             console.error("Error fetching vacancies:", error);
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchVacancies();
//     }, [page]);

//     const observer = useRef<IntersectionObserver | null>(null);
//     const lastVacancyElementRef = useRef<HTMLTableRowElement | null>(null);

//     useEffect(() => {
//         if (observer.current) observer.current.disconnect();
    
//         observer.current = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting) {
//                 console.log("Last element intersected, loading more vacancies...");
//                 setPage(prevPage => prevPage + 1);
//             }
//         });
    
//         if (lastVacancyElementRef.current) {
//             observer.current.observe(lastVacancyElementRef.current);
//         }
    
//         return () => {
//             if (observer.current) observer.current.disconnect();
//         };
//     }, [lastVacancyElementRef.current]);
    

//     const handleCheckboxChange = async (vacancy: IVacancy, field: keyof IVacancy, value: boolean) => {
//         try {
//             const response = await fetch(`https://www.candidat.store/api/checkboxVacancy/${vacancy._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ [field]: value }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update vacancy');
//             }

//             setVacancies(prevVacancies =>
//                 prevVacancies.map(v => (v._id === vacancy._id ? { ...v, [field]: value } : v))
//             );
//         } catch (error) {
//             console.error('Error updating vacancy:', error);
//         }
//     };

//     return (
//         <div className="overflow-x-auto flex flex-col items-center">
//             <h2 className="text-2xl font-bold mb-4">Список вакансий на сайте</h2>
//             {isLoading && vacancies.length === 0 ? (
//                 <p><span className="loading loading-spinner loading-md"></span> Загрузка...</p>
//             ) : (
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Владелец</th>
//                             <th>Заголовок</th>
//                             <th>Зарплата</th>
//                             <th>Местоположение</th>
//                             <th>Картинка</th>
//                             <th>Обновить</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {vacancies.map((vacancy, index) => (
//                             <tr
//                                 key={vacancy._id}
//                                 ref={index === vacancies.length - 1 ? lastVacancyElementRef : null}
//                             >
//                                 <td className='flex flex-col gap-3'>
//                                     <div className='badge badge-ghost badge-md w-[150px] font-semibold'>{vacancy.manager?.name}</div>
//                                     <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>
//                                         <p>Опубликовано</p>
//                                         <Checkbox
//                                             checked={vacancy.published}
//                                             onChange={(e) => handleCheckboxChange(vacancy, 'published', e.target.checked)}
//                                         />
//                                     </div>
//                                     <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>
//                                         Срочно
//                                         <Checkbox
//                                             checked={vacancy.urgently}
//                                             onChange={(e) => handleCheckboxChange(vacancy, 'urgently', e.target.checked)}
//                                         />
//                                     </div>
//                                     <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>
//                                         Осталось 1 место
//                                         <Checkbox
//                                             checked={vacancy.last}
//                                             onChange={(e) => handleCheckboxChange(vacancy, 'last', e.target.checked)}
//                                         />
//                                     </div>
//                                 </td>
//                                 <td>{vacancy.title}</td>
//                                 <td>{vacancy.salary}</td>
//                                 <td>{vacancy.location}</td>
//                                 <td>
//                                     {vacancy.image ? (
//                                         <Image
//                                             src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}
//                                             alt={vacancy.image.name}
//                                             width={150}
//                                             height={150}
//                                         />
//                                     ) : (
//                                         'No image'
//                                     )}
//                                 </td>
//                                 <td>
//                                     <Link href={`/dashboard/vacancy/edit/${vacancy._id}`}>
//                                         <button className="btn btn-sm btn-outline btn-error w-max">
//                                             Редактировать
//                                         </button>
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//             {isLoading && vacancies.length > 0 && (
//                 <p><span className="loading loading-spinner loading-md"></span> Загрузка...</p>
//             )}
//         </div>
//     );
// }

// export default VacancyCard;


'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Checkbox } from 'react-daisyui';

interface IVacancy {
    _id: string;
    title: string;
    salary: string;
    location: string;
    published: boolean;
    urgently: boolean;
    last: boolean;
    image?: {
        contentType: string;
        data: Buffer;
        name: string;
    };
    manager?: {
        name: string;
    };
}

function VacancyCard() {
    const [vacancies, setVacancies] = useState<IVacancy[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchVacancies = async (page: number) => {
        try {
            const response = await fetch(`https://www.candidat.store/api/vacancy?page=${page}&limit=5`);
            // const response = await fetch(`http://localhost:3000/api/vacancy?page=${page}&limit=5`);


        
            const data = await response.json();
            setVacancies(data.vacancies);
            setTotalPages(data.totalPages);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching vacancies:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVacancies(page);
    }, [page]);

    const handleCheckboxChange = async (vacancy: IVacancy, field: keyof IVacancy, value: boolean) => {
        try {
            const response = await fetch(`https://www.candidat.store/api/checkboxVacancy/${vacancy._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: value }),
            });

            if (!response.ok) {
                throw new Error('Failed to update vacancy');
            }

            setVacancies(prevVacancies =>
                prevVacancies.map(v => (v._id === vacancy._id ? { ...v, [field]: value } : v))
            );
        } catch (error) {
            console.error('Error updating vacancy:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setIsLoading(true);
            setPage(newPage);
        }
    };

    return (
        <div className="overflow-x-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Список вакансий на сайте</h2>
            {isLoading && vacancies.length === 0 ? (
                <p><span className="loading loading-spinner loading-md"></span> Загрузка...</p>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Владелец</th>
                                <th>Заголовок</th>
                                <th>Зарплата</th>
                                <th>Местоположение</th>
                                <th>Картинка</th>
                                <th>Обновить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vacancies.map((vacancy) => (
                                <tr key={vacancy._id}>
                                    <td className='flex flex-col gap-3'>
                                        <div className='badge badge-ghost badge-md w-[150px] font-semibold'>{vacancy.manager?.name}</div>
                                        <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>
                                            <p>Опубликовано</p>
                                            <Checkbox
                                                checked={vacancy.published}
                                                onChange={(e) => handleCheckboxChange(vacancy, 'published', e.target.checked)}
                                            />
                                        </div>
                                        <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>
                                            Срочно
                                            <Checkbox
                                                checked={vacancy.urgently}
                                                onChange={(e) => handleCheckboxChange(vacancy, 'urgently', e.target.checked)}
                                            />
                                        </div>
                                        <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>
                                            Осталось 1 место
                                            <Checkbox
                                                checked={vacancy.last}
                                                onChange={(e) => handleCheckboxChange(vacancy, 'last', e.target.checked)}
                                            />
                                        </div>
                                    </td>
                                    <td>{vacancy.title}</td>
                                    <td>{vacancy.salary}</td>
                                    <td>{vacancy.location}</td>
                                    <td>
                                        {vacancy.image ? (
                                            <Image
                                                src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}
                                                alt={vacancy.image.name}
                                                width={150}
                                                height={150}
                                            />
                                        ) : (
                                            'No image'
                                        )}
                                    </td>
                                    <td>
                                        <Link href={`/dashboard/vacancy/edit/${vacancy._id}`}>
                                            <button className="btn btn-sm btn-outline btn-error w-max">
                                                Редактировать
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center mt-4">
                        <button
                            className="btn btn-outline btn-primary mr-2"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            Предыдущая
                        </button>
                        <span>{page} из {totalPages}</span>
                        <button
                            className="btn btn-outline btn-primary ml-2"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            Следующая
                        </button>
                    </div>
                </>
            )}
            {isLoading && vacancies.length > 0 && (
                <p><span className="loading loading-spinner loading-md"></span> Загрузка...</p>
            )}
        </div>
    );
}

export default VacancyCard;
