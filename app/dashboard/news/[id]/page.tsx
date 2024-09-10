//app\editProduct\[id]\page.js
import EditNewsForm from "@/app/ui/dashboard/EditNewsForm/EditNewsForm";

 
const getNewsById = async (id) => {
    try {
        // const res = await fetch(`http://localhost:3001/api/news/${id}`, {
        //     cache: "no-store",
        // });
        const res = await fetch(`https://www.candidat.store/api/news/${id}`, {
            cache: "no-store",
        });
 
        if (!res.ok) {
            throw new Error("Failed to fetch news");
        }
 
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
 
export default async function EditNews({ params }) {
    const { id } = params;
    const { news } = await getNewsById(id);

    return <EditNewsForm 
        news={news} />;
}