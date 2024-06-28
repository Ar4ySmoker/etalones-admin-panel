'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
// import {Viber} from '@/app/ui/svg/viber'
// import {Telegram} from '@/app/ui/svg/telegram'
// import {WhatsApp} from '@/app/ui/svg/whatsapp'
import Link from 'next/link';
import { Checkbox } from 'react-daisyui';


function ManagerCard() {
    const [manager, setManager] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchManager = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/manager');
            // const response = await fetch('https://www.candidat.store/api/vacancy');

            const data = await response.json();
            setManager(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching manager:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchManager();
    }, []);

    return (
<>    
        <div className="overflow-x-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Список менеджеров</h2>
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
                        {manager.map((manager) => (
                            <tr key={manager._id}>
                                <td className='flex flex-col gap-3'>
                                    <div className='badge badge-ghost badge-md w-[150px] font-semibold'>{manager.name}</div>
                                </td>
                                <td>{manager.phone}</td>
                                <td>{manager.telegram}</td>
                                <td>{manager.viber}</td>
                                <td>{manager.whatsapp}</td>

                           
                                {/* <td>
                                    {vacancy.image ? (
                                        <Image
                                        src={`data:${manager.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}                                            alt={vacancy.image.name}
                                            width={150} height={150}
                                        />
                                    ) : (
                                        'No image'
                                    )}
                                </td> */}
                                <td> <Link href={`/dashboard/managers/edit/${manager._id}`}>
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

export default ManagerCard;
