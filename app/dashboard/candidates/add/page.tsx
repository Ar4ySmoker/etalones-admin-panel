import {  fetchManager, fetchProfession} from "@/app/lib/myData";
import Form from "@/app/ui/dashboard/FormCandidate/FormCandidate";

export default async function Page() {
  const professions = await fetchProfession();
  const manager = await fetchManager();
  


  return (
      <main>
          <Form 
        professions={professions}
        manager={manager} />
      </main>
  );
}