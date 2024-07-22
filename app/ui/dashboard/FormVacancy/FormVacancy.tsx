import TextInput from "../../inputs/TextInput/TextInput";
import { FormUpload } from "../FormUpload/FormUpload";


export default function FormVacancy(){
    return(
        <>
         <form action="" className='flex flex-col w-[700px] gap-1'>

         <TextInput id="title" title="Заголовок"  placeholder="Название профессии" />
         <TextInput id="town" title="Город"  placeholder="Адрес объекта" />
         <TextInput id="workPrice" title="Зарплата" placeholder="Сколько получает работник"/>
         <TextInput id="homePrice" title="Проживание" placeholder="Стоимость проживания" />
         <TextInput id="vehiclePrice" title="Транспорт" placeholder="Бесплатно/нужен свой авто"/>
         <TextInput id="workHours" title="Кольчество часов" placeholder="Часы отработки" />
         <TextInput id="document" title="Документы"  placeholder="Паспорт ЕС, Польская виза" />
         <TextInput id="dateStart"  placeholder="с июня/ с 10.10.2002" title='Начало работ'/>


        <FormUpload/>
        </form>
        </>
    )
}