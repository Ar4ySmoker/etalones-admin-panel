// import { fetchManager } from '@/app/lib/myData';
// import FormVacancy from '@/app/ui/dashboard/FormVacancy/FormVacancy'
import VacancyCard from '@/app/ui/dashboard/VacancyCard/VacancyCard';
import Link from 'next/link';

export default async function VacanciesPage(){

    return(
        <>
        <Link className='btn btn-success ' href={"/dashboard/vacancy/add"}>Добавить вакансию</Link>
        <VacancyCard/>

        </>
    )
}