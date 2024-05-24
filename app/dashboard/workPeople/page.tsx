import WorkCandidateTable from "@/app/ui/dashboard/WorkCandidateTable/WorkCandidateTable";



async function fetchCandidates(status: string, managerName: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/candidates?status=${status}&managerName=${managerName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
}

async function WorkPeoplePage() {
  const status = 'Работает';

  try {
    const dataLilia = await fetchCandidates('Работает', 'Лилия');
    console.log('LILIA', dataLilia);

    const dataTatyana = await fetchCandidates('Работает', 'Татьяна');
    console.log('TATIANA', dataTatyana);

    return (
      <div>
        <h2> Лилия</h2>
        <WorkCandidateTable 
         
        />

        <h2> Татьяна</h2>
        <WorkCandidateTable 
          
        />
      </div>
    );
  } catch (error) {
    console.error('Error in WorkPeoplePage:', error);
    return <div>Error: {error.message}</div>;
  }
}

export default WorkPeoplePage;
