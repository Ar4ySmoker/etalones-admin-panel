import EditVacancyForm from "@/app/ui/dashboard/EditVacancyForm/EditVacancyForm";

const getVacancyById = async (id) => {
    const url = `http://localhost:3000/api/vacancy/${id}`;
    console.log(`Fetching vacancy from URL: ${url}`);
    try {
        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Failed to fetch vacancy, status: ${res.status}`);
            throw new Error("Failed to fetch vacancy");
        }

        const data = await res.json();
        console.log('Vacancy data:', data); // Лог данных вакансии
        return data;
    } catch (error) {
        console.error('Error fetching vacancy:', error); // Лог ошибки
        return null; // Возвращаем null в случае ошибки
    }
};

export default async function EditVacancy({ params }) {
    const { id } = params;
    console.log(`Editing vacancy with ID: ${id}`);
    const data = await getVacancyById(id);

    if (!data || !data.vacancy) {
        // Обработка случая, когда данные не были получены
        return <div>Error loading vacancy data</div>;
    }

    const { vacancy } = data;
    const allManagers = await fetch("http://www.candidat.store/api/manager");
    const managers = await allManagers.json();   

    return (
        <EditVacancyForm 
            vacancy={vacancy} 
            managers={managers}
        />
    );
}
