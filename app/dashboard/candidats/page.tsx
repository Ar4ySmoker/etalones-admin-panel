import CandidatsTable from "@/app/ui/dashboard/Tables/CandidatsTable";

export default async function Page() {
  let candidates = [];
  try {
    const response = await fetch(`http://localhost:3000/api/candidats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Не удалось получить кандидатов');
    }

    const data = await response.json();
    candidates = data.candidates;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }

  return (
    <main>
      <CandidatsTable candidates={ candidates }  />
    </main>
  );
}
