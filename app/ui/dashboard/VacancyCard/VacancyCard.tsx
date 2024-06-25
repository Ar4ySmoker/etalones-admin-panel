import Image from 'next/image';
import { useState, useEffect } from 'react';

function VacancyCard() {
    const [vacancies, setVacancies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchVacancies = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/vacancy');
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
        <div className="flex flex-wrap justify-center w-full">
        {vacancies.map((vacancy) => (
            <div key={vacancy._id} className="card w-96 glass m-4">
                <figure>
                {vacancy.image ? (
                                        <Image
                                        src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}                                            alt={vacancy.image.name}
                                           width={200} height={200}
                                        />
                                    ) : (
                                        'No image'
                                    )}                </figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">{vacancy.job_title}</h2>
                    <p className="text-md font-semibold mt-2">📍<i className="bi bi-geo-alt-fill text-red-500"></i> {vacancy.location}</p>
                    {vacancy.roof_type && (
    <span className="text-muted text-sm">
      ⚙️ <i className="bi bi-dash-lg text-red-700 font-bold">{vacancy.roof_type}</i>
    </span>
  )}                        <p className="text-sm font-bold">💰 <i className="bi bi-cash ">Зарплата</i>&nbsp; {vacancy.salary}</p>
                    <p className="text-sm font-bold">🏠 <i className="bi bi-cash ">Проживание</i>&nbsp; {vacancy.homePrice}</p>
                    <p className="text-sm font-bold">🚘 <i className="bi bi-cash ">Транспорт</i>&nbsp; {vacancy.auto}</p>
                    <p className="text-sm font-bold">📄 <i className="bi bi-cash ">Документы:</i><br /> {vacancy.documents}</p>

                    <div className="card-actions justify-around items-center mt-4">
                        <a href={vacancy.viber} target='blank'>V</a>
                        <a href={vacancy.telegram} target='blank'>T</a>
                        <a href={vacancy.whatsapp} target='blank'>W</a>
                        <div className="self-end">

</div>
                    </div>
                </div>
            </div>
        ))}
    </div>

    
        <div className="overflow-x-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Vacancies</h2>
            {isLoading ? (
                <p><span className="loading loading-spinner loading-md"></span> Loading...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Salary</th>
                            <th>Location</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacancies.map((vacancy) => (
                            <tr key={vacancy._id}>
                                <td>{vacancy.title}</td>
                                <td>{vacancy.salary}</td>
                                <td>{vacancy.location}</td>
                                <td>
                                    {vacancy.image ? (
                                        <img
                                        src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}                                            alt={vacancy.image.name}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    ) : (
                                        'No image'
                                    )}
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

export default VacancyCard;
