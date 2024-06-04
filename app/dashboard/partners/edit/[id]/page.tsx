//app\editProduct\[id]\page.js

import { fetchManager, fetchProfession } from "@/app/lib/myData";
import EditPartnerForm from "@/app/ui/dashboard/FormPartner/EditParttnerForm";

 
const getPartnerById = async (id) => {
    try {
        // const res = await fetch(`http://localhost:3000/api/partners/${id}`, {
            const res = await fetch(`https://www.candidat.store/api/partners/${id}`, {

        cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch partners");
        }

        const data = await res.json();
        console.log("Fetched partner data:", data); // Добавьте этот лог для отладки
        return data;
    } catch (error) {
        console.log(error);
        return null; // Возвращаем null, если произошла ошибка
    }
};

 
export default async function EditPartner({ params }) {
    const { id } = params;
    const  { partner }  = await getPartnerById(id);
    const professions = await fetchProfession()
    const managers = await fetchManager();
    return <EditPartnerForm id={id} partner={partner} managers={managers} professions={professions} />;
}