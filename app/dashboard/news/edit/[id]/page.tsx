import EditNewsForm from "@/app/ui/dashboard/EditNewsForm/EditNewsForm";

const getNewsById = async (id) => {
    const url = `http://localhost:3001/api/news/${id}`;
    // const url = `https://www.candidat.store/api/news/${id}`;

    try {
        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Failed to fetch news, status: ${res.status}`);
            throw new Error("Failed to fetch news");
        }

        const data = await res.json();
              return data;
    } catch (error) {
        console.error('Error fetching news:', error); // Лог ошибки
        return null; // Возвращаем null в случае ошибки
    }
};

export default async function EditNews({ params }) {
    const { id } = params;
    const data = await getNewsById(id);

    if (!data || !data.news) {
        // Обработка случая, когда данные не были получены
        return <div>Error loading News data</div>;
    }

    const { news } = data;



    return (
        <EditNewsForm 
            news={news} 
        />
    );
}
