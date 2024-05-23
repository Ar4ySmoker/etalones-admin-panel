//app\editProduct\[id]\page.js

import EditPartnerForm from "@/app/ui/dashboard/FormPartner/EditParttnerForm";

 
const getPartnerById = async (id) => {
    try {
        const res = await fetch(`https://www.candidat.store/api/partners/${id}`, {
            cache: "no-store",
        });
 
        if (!res.ok) {
            console.log("NOFETCHPARTNER")
            throw new Error("Failed to fetch partners");
        }
 
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
 
export default async function EditPartner({ params }) {
    const { id } = params;
    const  { partner }  = await getPartnerById(id);
    
    // const { name, age, phone, profession, location, langue, status, manager, experience } = candidate;
 

   
    const allManagers = await fetch("http://www.candidat.store/api/manager");
    const managers = await allManagers.json();
    return <EditPartnerForm id={id} partner={partner}  managers={managers} />;
}