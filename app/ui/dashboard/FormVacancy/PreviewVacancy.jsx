import Image from 'next/image';
import {Viber} from '@/app/ui/svg/viber'
import {Telegram} from '@/app/ui/svg/telegram'
import {WhatsApp} from '@/app/ui/svg/whatsapp'
const PreviewVacancy = ({ vacancy }) => {
  const {
    job_title,
    location,
    image,
    positions_available,
    salary,
    homePrice,
    home_descr,
    work_descr,
    grafik,
    documents,
    managerImg,
    contact,
    viber,
    telegram,
    whatsapp,
    category
  } = vacancy;

  const documentsArray = documents ? documents.split(';') : [];
  const homeDet = home_descr ? home_descr.split(';') : [];
  const workDet = work_descr ? work_descr.split(';') : [];

  return (
    <>
      <div className='md:w-full flex flex-col items-between gap-10 px-10'>
        <div className='flex justify-between gap-3 flex-wrap'>
          <div className='py-10 flex flex-col justify-between'>
            <h1 className='text-3xl text-red-700'>{job_title}</h1>
            {/* <Breadcrumbs title={job_title || 'Нет заголовка'} prev='/vacancy' prevText='Вакансии' /> */}
            <h3 className='text-xl text-red-800'>📍 Местоположение: <strong>{location}</strong></h3>
          </div>
          <div className='md:p-10'>
            <Image src={image || '/default-image.png'} width={300} height={300} alt={job_title || "noImage"} />
          </div>
        </div>
        <div className='flex flex-wrap gap-5'>
          <div className="flex flex-col items-center gap-2">
            <p className='rounded-lg bg-slate-300 p-3'>Свободно</p>
            <p>Мест: {positions_available}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='rounded-lg bg-slate-300 p-3'>Вознаграждение</p>
            <p>{salary}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='rounded-lg bg-slate-300 p-3'>Проживание</p>
            <p>{homePrice}</p>
          </div>
        </div>
        <div>
          <div className="row opisoferta no-margin m-b-20">
            <div className="col-md-12">
              <h2 className="mb-5">Информация про работу</h2>
              <ul>
                <li><p>Требуется <strong>{job_title}</strong></p></li>
              </ul>
              <ul>
                <strong>О работе:</strong>
                {workDet.map((doc, index) => (
                  <li key={index}>{doc.trim()}</li>
                ))}
              </ul>
              <ul>
                <strong>Быт:</strong>
              </ul>
                {homeDet.map((doc, index) => (
                  <li key={index}>{doc.trim()}</li>
                ))}
              <ul>
                <p><strong>График</strong></p>
                <li>{grafik}</li>
              </ul>

              <p><strong>Необходимые документы</strong></p>
             
                {documentsArray.map((doc, index) => (
                  <li key={index}>{doc.trim()}</li>
                ))}
              <p><strong>Вид договора:</strong></p>
              <ul>
                <li>гражданско-правовой – Umowa zlecenie.</li>
              </ul>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default PreviewVacancy;
