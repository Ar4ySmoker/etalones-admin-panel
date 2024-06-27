import {  fetchManager, fetchProfession } from "@/app/lib/myData";
import FormVacancy from "@/app/ui/dashboard/FormVacancy/FormVacancy";

export default async function Page() {

  const manager = await fetchManager();
  const professions = await fetchProfession();
  return (
      <main>
          <FormVacancy 
        manager={manager} professions={professions}/>
      </main>
  );
}