'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Checkbox } from 'react-daisyui';
import PaginationC from '../Pagination/PaginationC';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const fetchVacancies = async (page: number) => {
        try {
            // const response = await fetch(`http://localhost:3000/api/vacancy?page=${page}&limit=5`);
            const response = await fetch(`https://www.candidat.store/api/vacancy?page=${page}&limit=5`);

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
        fetchVacancies(currentPage);
    }, [currentPage]);

    const handleCheckboxChange = async (vacancy: IVacancy, field: keyof IVacancy, value: boolean) => {
        try {
            // const response = await fetch(`http://localhost:3000/api/checkboxVacancy/${vacancy._id}`, {
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

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="overflow-x-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Список вакансий на сайте</h2>
            {isLoading ? (
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
                    <PaginationC currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            )}
        </div>
    );
}

export default VacancyCard;

