import EditManagerForm from "@/app/ui/dashboard/EditManagerForm/EditManagerForm";

const getManagerById = async (id) => {
    const url = `http://localhost:3000/api/manager/${id}`;
    // const url = `https://www.candidat.store/api/vacancy/${id}`;

    try {
        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Failed to fetch manager, status: ${res.status}`);
            throw new Error("Failed to fetch manager");
        }

        const data = await res.json();
              return data;
    } catch (error) {
        console.error('Error fetching manager:', error); // Лог ошибки
        return null; // Возвращаем null в случае ошибки
    }
};

export default async function EditManager({ params }) {
    const { id } = params;
    const data = await getManagerById(id);

    if (!data || !data.manager) {
        // Обработка случая, когда данные не были получены
        return <div>Error loading manager data</div>;
    }

    const { manager } = data;
  

    return (
        <EditManagerForm 
            manager={manager}
        />
    );
}
