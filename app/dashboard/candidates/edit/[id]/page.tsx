//app\editProduct\[id]\page.js

import EditCandidateForm from "@/app/ui/dashboard/FormCandidate/EditCandidateForm";

 
const getCandidateById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/candidates/${id}`, {
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
    
    const { name, age, phone, profession, location, langue, status, manager, experience } = candidate;
 

    const allProfessions = await fetch(`http://localhost:3000/api/profession`);
    const professions = await allProfessions.json();
    const allLangues = await fetch(`http://localhost:3000/api/langue`);
    const langues = await allLangues.json();
    const allLocations = await fetch(`http://localhost:3000/api/locations`);
    const locations = await allLocations.json();
    const allStatuses = await fetch("http://localhost:3000/api/status");
    const statuses = await allStatuses.json();
    const allManagers = await fetch("http://localhost:3000/api/manager");
    const managers = await allManagers.json();
    return <EditCandidateForm id={id} candidate={candidate} professions={professions} langues={langues} locations={locations} statuses={statuses} managers={managers} />;
}