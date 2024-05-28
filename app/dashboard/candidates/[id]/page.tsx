//app\editProduct\[id]\page.js

import CandidateDetails from "@/app/ui/dashboard/CandidateDetails/CandidateDetails";

 
const getCandidateById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/candidates/${id}`, {
            cache: "no-store",
        });
        // const res = await fetch(`https://www.candidat.store/api/candidates/${id}`, {
        //     cache: "no-store",
        // });
 
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
    
    return <CandidateDetails  candidate={candidate} />;
}