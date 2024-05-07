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
    const { name, age, phone, profession, locations, langue, status, manager } = candidate;
 
    return <EditCandidateForm id={id} name={name} age={age} phone={phone} profession={profession} locations={locations} langue={langue} status={status} manager={manager}  />;
}