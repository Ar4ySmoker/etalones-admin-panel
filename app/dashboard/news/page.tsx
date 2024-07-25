// import { fetchManager } from '@/app/lib/myData';
// import FormVacancy from '@/app/ui/dashboard/FormVacancy/FormVacancy'
import NewsCard from '@/app/ui/dashboard/newsCard/NewsCard';
import Link from 'next/link';

export default async function NewsPage(){

    return(
        <>
        
        <Link className='btn btn-success ' href={"/dashboard/news/add"}>Добавить Новость</Link>
        <NewsCard/>

        </>
    )
}