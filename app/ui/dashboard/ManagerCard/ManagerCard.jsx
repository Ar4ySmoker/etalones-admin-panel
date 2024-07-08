'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function ManagerCard() {
    const [managers, setManagers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchManagers();
    }, []);
    
    const fetchManagers = async () => {
        try {
            const response = await fetch('https://www.etalones.com/api/manager');
            const data = await response.json();
            
            console.log("Fetched managers:", data);

            // Извлекаем массив managers из полученного объекта
            const extractedManagers = data.managers;

            if (Array.isArray(extractedManagers)) {
                setManagers(extractedManagers);
                setIsLoading(false);
            } else {
                console.error("Data.managers is not an array:", data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching managers:", error);
            setIsLoading(false);
        }
    };
    

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
                                <th>Телефон</th>
                                <th>Telegram</th>
                                <th>Viber</th>
                                <th>WhatsApp</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {managers.map((manager) => (
                                <tr key={manager._id}>
                                    <td>
                                    {manager.image ? (
                                        <Image
                                        src={`data:${manager.image.contentType};base64,${Buffer.from(manager.image.data).toString('base64')}`}
                                        alt={manager.image.name}
                                            width={150} height={150}
                                        />
                                    ) : (
                                        'No image'
                                    )}
                                </td>
                                    <td>{manager.name}</td>
                                    <td>{manager.phone}</td>
                                    <td>{manager.telegram}</td>
                                    <td>{manager.viber}</td>
                                    <td>{manager.whatsapp}</td>
                                    <td>
                                        <Link href={`/dashboard/managers/edit/${manager._id}`}>
                                            <p className="btn btn-sm btn-outline btn-error w-max">
                                                Редактировать
                                            </p>
                                        </Link>
                                    </td>
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
