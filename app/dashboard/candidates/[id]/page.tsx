import { Candidate } from "@/app/lib/models";
import { fetchProfession, fetchLocation  } from "@/app/lib/myData";
import UpdateForm from "@/app/ui/dashboard/FormCandidate/FormCandidateUpdate";
export default async function UpdatePage({ params }) {
  const candidateId = params.id; // Получение ID кандидата из URL
  const candidate = await Candidate.findById(candidateId);
  const locations = await fetchLocation();
  const profession = await fetchProfession();

  return (
    <main>
      <UpdateForm candidate={candidate} locations={locations} profession={profession}/>
    </main>
  );
}
