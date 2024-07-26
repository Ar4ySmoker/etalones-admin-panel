'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function NewsCard() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNews = async () => {
        try {
            const response = await fetch('/api/news'); // Убедитесь, что путь корректный
            const data = await response.json();
            setNews(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="overflow-x-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Список новостей на сайте</h2>
            {isLoading ? (
                <p><span className="loading loading-spinner loading-md"></span> Загрузка...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {news.map((newsItem) => (
                        <div key={newsItem._id} className="card w-96 glass m-4 p-4">
                            <figure>
                                {newsItem.image ? (
                                    <Image
                                        src={`data:${newsItem.image.contentType};base64,${Buffer.from(newsItem.image.data).toString('base64')}`}
                                        alt={newsItem.image.name}
                                        width={400}
                                        height={400}
                                        className="rounded-lg"
                                    />
                                ) : (
                                    'No image'
                                )}
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title font-bold">{newsItem.title}</h2>
                                <p className="text-sm font-semibold mt-2">Источник: {newsItem.source}</p>
                                <p className="text-sm font-semibold mt-2">Категория: {newsItem.category}</p>
                                <p className="text-sm">
                                {newsItem.description.length > 100 ? `${newsItem.description.substring(0, 100)}...` : newsItem.description}
                                </p>
                                <Link href={`/dashboard/news/edit/${newsItem._id}`}>
                                    <button className="btn btn-sm btn-outline btn-error w-max mt-4">
                                        Редактировать
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewsCard;
