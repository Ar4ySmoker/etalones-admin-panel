'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
// import {Viber} from '@/app/ui/svg/viber'
// import {Telegram} from '@/app/ui/svg/telegram'
// import {WhatsApp} from '@/app/ui/svg/whatsapp'
import Link from 'next/link';
import { Checkbox } from 'react-daisyui';


function VacancyCard() {
    const [vacancies, setVacancies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchVacancies = async () => {
        try {
            // const response = await fetch('http://localhost:3000/api/vacancy');
            const response = await fetch('https://www.candidat.store/api/vacancy');

            const data = await response.json();
            setVacancies(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching vacancies:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVacancies();
    }, []);

    return (
<>    
        <div className="overflow-x-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Список вакансий на сайте</h2>
            {isLoading ? (
                <p><span className="loading loading-spinner loading-md"></span> Загрузка...</p>
            ) : (
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
                                    <div className='badge badge-ghost badge-md w-[150px] font-semibold'>{vacancy.manager.name}</div>
                                    <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'><p>Опубликовано</p><Checkbox/></div>
                                    <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>Срочно<Checkbox/></div>
                                    <div className='badge badge-ghost badge-sm w-[150px] flex justify-between'>Осталось 1 место<Checkbox/></div>



                                </td>
                                <td>{vacancy.title}</td>
                                <td>{vacancy.salary}</td>
                                <td>{vacancy.location}</td>
                                <td>
                                    {vacancy.image ? (
                                        <Image
                                        src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}                                            alt={vacancy.image.name}
                                            width={150} height={150}
                                        />
                                    ) : (
                                        'No image'
                                    )}
                                </td>
                                <td> <Link href={`/dashboard/vacancy/edit/${vacancy._id}`}>
                        <button className="btn btn-sm btn-outline btn-error w-max">
                          Редактировать
                        </button>
                      </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
    );
}

export default VacancyCard;
