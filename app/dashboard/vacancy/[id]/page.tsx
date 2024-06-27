//app\editProduct\[id]\page.js
import EditVacancyForm from "@/app/ui/dashboard/EditVacancyForm/EditVacancyForm";

 
const getVacancyById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/vacancy/${id}`, {
            cache: "no-store",
        });
        // const res = await fetch(`https://www.candidat.store/api/candidates/${id}`, {
        //     cache: "no-store",
        // });
 
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
    const allManagers = await fetch("http://www.candidat.store/api/manager");
    const managers = await allManagers.json();
    return <EditVacancyForm 
        vacancy={vacancy} managers={managers}   
    />;
}