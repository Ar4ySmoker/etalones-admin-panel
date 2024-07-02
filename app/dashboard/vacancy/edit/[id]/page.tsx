import { fetchProfession } from "@/app/lib/myData";
import EditVacancyForm from "@/app/ui/dashboard/EditVacancyForm/EditVacancyForm";

const getVacancyById = async (id) => {
    // const url = `http://localhost:3000/api/vacancy/${id}`;
    const url = `https://www.candidat.store/api/vacancy/${id}`;

    try {
        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Failed to fetch vacancy, status: ${res.status}`);
            throw new Error("Failed to fetch vacancy");
        }

        const data = await res.json();
              return data;
    } catch (error) {
        console.error('Error fetching vacancy:', error); // Лог ошибки
        return null; // Возвращаем null в случае ошибки
    }
};

export default async function EditVacancy({ params }) {
    const { id } = params;
    const data = await getVacancyById(id);

    if (!data || !data.vacancy) {
        // Обработка случая, когда данные не были получены
        return <div>Error loading vacancy data</div>;
    }

    const { vacancy } = data;
    const allManagers = await fetch("http://www.candidat.store/api/manager");
    const managers = await allManagers.json();   
    const professions = await fetchProfession();


    return (
        <EditVacancyForm 
        professions={professions}
            vacancy={vacancy} 
            managers={managers}
        />
    );
}
