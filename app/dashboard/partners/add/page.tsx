import {  fetchManager, fetchProfession} from "@/app/lib/myData";
import FormPartner from "@/app/ui/dashboard/FormPartner/FormPartner";

export default async function Page() {
  const professions = await fetchProfession();
  const manager = await fetchManager();
  


  return (
      <main>
          <FormPartner 
     
        manager={manager} />
      </main>
  );
}