import {  fetchManager, fetchPartners, fetchProfession} from "@/app/lib/myData";
import Form from "@/app/ui/dashboard/FormCandidate/FormCandidate";

export default async function Page() {
  const professions = await fetchProfession();
  const manager = await fetchManager();
  const partners = await fetchPartners();


  return (
      <main>
          <Form 
        professions={professions}
        manager={manager} partners={partners} />
      </main>
  );
}