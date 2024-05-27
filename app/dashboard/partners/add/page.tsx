import {  fetchManager, fetchProfession } from "@/app/lib/myData";
import FormPartner from "@/app/ui/dashboard/FormPartner/FormPartner";

export default async function Page() {
  const manager = await fetchManager();
  const professions = await fetchProfession();
  


  return (
      <main>
          <FormPartner 
     
        manager={manager} professions={professions} />
      </main>
  );
}