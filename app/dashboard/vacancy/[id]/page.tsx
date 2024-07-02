//app\editProduct\[id]\page.js
import { fetchManager, fetchProfession } from "@/app/lib/myData";
import EditVacancyForm from "@/app/ui/dashboard/EditVacancyForm/EditVacancyForm";

 
const getVacancyById = async (id) => {
    try {
        // const res = await fetch(`http://localhost:3000/api/vacancy/${id}`, {
        //     cache: "no-store",
        // });
        const res = await fetch(`https://www.candidat.store/api/vacancy/${id}`, {
            cache: "no-store",
        });
 
        if (!res.ok) {
            throw new Error("Failed to fetch vacancy");
        }
 
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
 
export default async function EditVacancy({ params }) {
    const { id } = params;
    const { vacancy } = await getVacancyById(id);
    const managers = await fetchManager();

    const professions = await fetchProfession()
    return <EditVacancyForm 
        vacancy={vacancy} managers={managers} professions={professions}    />;
}