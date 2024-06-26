import { fetchManager } from '@/app/lib/myData';
// import FormVacancy from '@/app/ui/dashboard/FormVacancy/FormVacancy'
import VacancyCard from '@/app/ui/dashboard/VacancyCard/VacancyCard';
import Link from 'next/link';

export default async function VacanciesPage(){
    const manager = await fetchManager();

    return(
        <>
        <Link href={"/dashboard/vacancy/add"}>Добавить вакансию</Link>
        <VacancyCard/>

        {/* <FormVacancy  manager={manager}/>    */}
        </>
    )
}