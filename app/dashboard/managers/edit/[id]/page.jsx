//app\editProduct\[id]\page.js

import EditManagerForm from "@/app/ui/dashboard/EditManagerForm/EditManagerForm";

 
const getManagerById = async (id) => {
    try {
        // const res = await fetch(`http://localhost:3000/api/manager/${id}`, {
        //     cache: "no-store",
        // });
        const res = await fetch(`https://www.candidat.store/api/manager/${id}`, {
            cache: "no-store",
        });
 
        if (!res.ok) {
            throw new Error("Failed to fetch managers");
        }
 
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
 
export default async function EditManager({ params }) {
    const { id } = params;
    const { manager } = await getManagerById(id);
    
 
    
    return <EditManagerForm 
    id={id} manager={manager} 
   
    />;
}