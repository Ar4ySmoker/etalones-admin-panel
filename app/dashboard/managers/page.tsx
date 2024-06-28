// import { fetchManager } from '@/app/lib/myData';
// import FormVacancy from '@/app/ui/dashboard/FormVacancy/FormVacancy'
import ManagerCard from '@/app/ui/dashboard/ManagerCard/ManagerCard';
import Link from 'next/link';

export default async function VacanciesPage(){

    return(
        <>
        
        <Link className='btn btn-success ' href={"/dashboard/managers/add"}>Добавить Менеджера</Link>
        <ManagerCard/>

        </>
    )
}