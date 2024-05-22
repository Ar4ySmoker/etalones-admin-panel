//app\editProduct\[id]\page.js

import PartnerDetails from "@/app/ui/dashboard/PartnerDetails/PartnerDetails";

 
const getPartnerById = async (id) => {
    try {
        const res = await fetch(`http:localhost:3000/api/partners/${id}`, {
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
 
export default async function EditPartner({ params }) {
    const { id } = params;
    const  {partner}  = await getPartnerById(id);
    // const {name, companyName, phone} = partner

    return <PartnerDetails  partner={partner}   />;
}