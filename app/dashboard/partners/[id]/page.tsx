//app\editProduct\[id]\page.js

import PartnerDetails from "@/app/ui/dashboard/PartnerDetails/PartnerDetails";

 
const getPartnerById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/partners/${id}`, {
//  const res = await fetch(`https://www.candidat.store/api/partners/${id}`, {

        cache: "no-store",
        });
 console.log('PARTNERS!!!!:::', res)
        if (!res.ok) {
            throw new Error("Failed to fetch partner");
        }
 
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
 
export default async function PartnerDetailsPage({ params }) {
    const { id } = params;
    const  { partner }  = await getPartnerById(id);

    return <PartnerDetails  partner={ partner }   />;
}