'use client'
import { title } from "process";
import TextInput from "../../inputs/TextInput/TextInput";
import { FormUpload } from "../FormUpload/FormUpload";


export default function FormVacancy(){
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const body = {
          title: formData.get('title') || '',
          town: formData.get('town') || '',
          workHours: formData.get('workHours') || '',
          workPrice: formData.get('workPrice') || ''
        };
    
        try {
          const response = await fetch('/api/vacancy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });
          const result = await response.json();
          if (response.ok) {
            console.log('partner created:', result);
            
          } else {
            console.error('Failed to create partners:', result);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      };

    return(
        <>
         <form onSubmit={handleSubmit} className='flex flex-col w-[700px] gap-1'>

         <TextInput id="title" title="Заголовок"  placeholder="Название профессии" />
         <TextInput id="town" title="Город"  placeholder="Адрес объекта" />
         <TextInput id="workPrice" title="Зарплата" placeholder="Сколько получает работник"/>
         {/* <TextInput id="homePrice" title="Проживание" placeholder="Стоимость проживания" /> */}
         {/* <TextInput id="vehiclePrice" title="Транспорт" placeholder="Бесплатно/нужен свой авто"/> */}
         <TextInput id="workHours" title="Кольчество часов" placeholder="Часы отработки" />
         {/* <TextInput id="document" title="Документы"  placeholder="Паспорт ЕС, Польская виза" /> */}
         {/* <TextInput id="dateStart"  placeholder="с июня/ с 10.10.2002" title='Начало работ'/> */}


        {/* <FormUpload/> */}
        <button className="btn btn-success w-full" type="submit">Сохранить кандидата</button>

        </form>
        </>
    )
}