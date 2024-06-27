//app\editProduct\[id]\page.js

import { fetchPartners } from "@/app/lib/myData";
import EditCandidateForm from "@/app/ui/dashboard/FormCandidate/EditCandidateForm";

 
const getCandidateById = async (id) => {
    try {
        // const res = await fetch(`http://localhost:3000/api/candidates/${id}`, {
        //     cache: "no-store",
        // });
        const res = await fetch(`https://www.candidat.store/api/candidates/${id}`, {
            cache: "no-store",
        });
 
        if (!res.ok) {
            throw new Error("Failed to fetch candidate");
        }
 
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
 
export default async function EditCandidate({ params }) {
    const { id } = params;
    const { candidate } = await getCandidateById(id);
    
    // const { name, age, phone, profession, location, langue, status, manager, experience } = candidate;
 
    const partners = await fetchPartners();
    const allProfessions = await fetch(`http://www.candidat.store/api/profession`);
    const professions = await allProfessions.json();
    const allManagers = await fetch("http://www.candidat.store/api/manager");
    const managers = await allManagers.json();
    return <EditCandidateForm 
    id={id} candidate={candidate} 
    professions={professions}  managers={managers}
    partners = {partners}
    />;
}