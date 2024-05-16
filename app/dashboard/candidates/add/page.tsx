import {  fetchLangue, fetchLocation, fetchManager, fetchProfession, fetchStatus} from "@/app/lib/myData";
import Form from "@/app/ui/dashboard/FormCandidate/FormCandidate";

export default async function Page() {
  const professions = await fetchProfession();
  const status = await fetchStatus();
  const manager = await fetchManager();
  


  return (
      <main>
          <Form 
        professions={professions}
        status={status} 
        manager={manager} />
      </main>
  );
}