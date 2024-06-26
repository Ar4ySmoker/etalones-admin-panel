import {  fetchManager } from "@/app/lib/myData";
import FormVacancy from "@/app/ui/dashboard/FormVacancy/FormVacancy";

export default async function Page() {

  const manager = await fetchManager();

  return (
      <main>
          <FormVacancy 
        manager={manager} />
      </main>
  );
}