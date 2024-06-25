import { fetchManager } from '@/app/lib/myData';
import FormVacancy from '@/app/ui/dashboard/FormVacancy/FormVacancy'

export default async function VacanciesPage(){
    const manager = await fetchManager();

    return(
        <>
        <FormVacancy manager={manager}/>   
        </>
    )
}