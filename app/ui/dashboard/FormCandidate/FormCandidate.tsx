'use client'
import React, {useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { MultiSelect } from "react-multi-select-component";
import Axios from "axios";

const drivePermis = [
  { label: "В", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D"},
  { label: "E", value: "E"},
  { label: "Код 95", value: "Код 95"},
];
const statuses = [
  { label: "Не трудоустроен", value: "Не трудоустроен" },
  { label: "Трудоустроен", value: "Трудоустроен" },
  { label: "В отпуске", value: "В отпуске"},

]

export default function Form({ professions,  manager, partners }) {
  let [countries, setCountries] = useState([]);
  let [singleCountry, setSingleCountry] = useState("");
  let [Cities, setCities] = useState([]);
  let [singleCity, setSingleCity] = useState("");
  let [combinedLocation, setCombinedLocation] = useState("");
  let [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
  let [statusFromPartner, setStatusFromPartner] = useState({ status: "Не трудоустроен", who: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDrive, setSelectedDrive] = useState([]);
  const [showDismissalDate, setShowDismissalDate] = useState(false);

  const handleStatusFromPartnerChange = (field, value) => {
    setStatusFromPartner(prevStatusFromPartner => ({ ...prevStatusFromPartner, [field]: value }));
  };

  const handleLangueChange = (field, value) => {
    setLangue(prevLangue => ({ ...prevLangue, [field]: value }));
  };

  const fetchCountries = async () => {
    let country = await Axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    console.log(country);
    setCountries(country.data.data);
  };

  const fetchCities = (country) => {
    const Cities = countries.find((c) => c.country === country);
    setCities(Cities.cities);
    setSingleCountry(country); 
    setSingleCity(""); // Сбрасываем выбранный город при изменении страны
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSingleCity(city);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (singleCountry) {
      if (singleCity) {
        setCombinedLocation(`${singleCountry}, ${singleCity}`);
      } else {
        setCombinedLocation(singleCountry);
      }
    }
  }, [singleCountry, singleCity]);
  
  
  const router = useRouter();

  const [documentEntries, setDocumentEntries] = useState([]);

  const addDocumentEntry = () => {
    setDocumentEntries([...documentEntries, { docType: 'Нет документов', dateExp: '', dateOfIssue: '', numberDoc: '' }]);
  };

  const handleDocumentChange = (index, field, value) => {
    const newEntries = [...documentEntries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setDocumentEntries(newEntries);
  };

  const removeDocumentEntry = (index) => {
    const newEntries = documentEntries.filter((_, i) => i !== index);
    setDocumentEntries(newEntries);
  };

  const [professionEntries, setProfessionEntries] = useState([{ name: '', experience: '' }]);

  const addProfessionEntry = () => {
    setProfessionEntries([...professionEntries, { name: 'Нет профессии', experience: '' }]);
  };

  const handleProfessionChange = (index, field, value) => {
    const newEntries = [...professionEntries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setProfessionEntries(newEntries);
  };

  const removeProfessionEntry = (index) => {
    const newEntries = professionEntries.filter((_, i) => i !== index);
    setProfessionEntries(newEntries);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    console.log('Submitting with documents:', documentEntries);
    console.log('Submitting with PROFESSIONS:', professionEntries);

    const formData = new FormData(event.target);
    const body = {
      name: formData.get('name') || '', 
      age: formData.get('age') || '',
      ageNum: formData.get('ageNum') || '',
      phone: formData.get('phone') || '',
      professions: professionEntries.filter(profession => profession.name.trim() !== '' || profession.experience.trim() !== ''),
      locations: combinedLocation,
      documents: documentEntries.filter(document => document.docType.trim() !== '' || document.dateExp.trim() !== '' || document.dateOfIssue.trim() !== '' || document.numberDoc.trim() !== ''),
      drivePermis: selectedDrive.map(d => d.value).join(', '),
      leaving: formData.get('leaving') || '',
      dateArrival: formData.get('dateArrival') || '',
      cardNumber: formData.get('cardNumber') || '',
      // workHours: formData.get('workHours') || '',
      langue: {
        name: formData.get('langue') || '',
        level: formData.get('langueLvl') || ''
      },
      status: formData.get('status') || null,
      citizenship: formData.get('citizenship') || null,
      statusFromPartner:{
        status: formData.get('statusFromPartner'),
        from: formData.get('from'),
        to:formData.get('to'),
        dismissalDate: formData.get('dismissalDate') || ''
      },
      partner:formData.get('who'),
      manager: formData.get('manager') || null,
      comment: formData.get('comment') || ''
    };
    


    try {
      const response = await fetch('/api/addCandidate', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Candidate created:', result);
        router.refresh();
        router.push("/dashboard/candidates");
      } else {
        setErrorMessage(result.message); // Устанавливаем сообщение об ошибке
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  const handleDismissalClick = () => {
    setShowDismissalDate(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}  >
        <div className='grid grid-cols-3'>
        <div className='grid justify-start items-stretch content-space-evenly '>
        <label htmlFor="name">
          <div>Имя</div>
        <input className="input input-bordered input-accent w-full max-w-xs"
 id="name" name="name" type="text" placeholder="Сергей" required />
        </label>
        <label htmlFor="age">
              <div>Возраст</div>
              <div className='flex gap-1'>
                <label htmlFor="age">
                  <div>Дата рождения</div>
                  <input className="input input-bordered input-accent w-full max-w-xs" 
                  id="age" name="age" type="date"   />
                </label>
                <label htmlFor="ageNum">
                  <div>Возраст</div>
                  <input className="input input-bordered input-accent w-full max-w-xs" id="ageNum" name="ageNum" type="text"   />
                </label>
              </div>
            </label>
        <label htmlFor="phone">
  <div>Телефон</div>
<input className="input input-bordered input-accent w-full max-w-xs"
         id="phone" name="phone" type="text" placeholder="+373696855446" required />
        </label>
        <label htmlFor="locations">
  <div>Местоположение - {combinedLocation}</div>
         <div>
          <div className='flex gap-1'>
          {countries && (
        <select className="select w-full max-w-xs" onChange={(e) => fetchCities(e.target.value)} >
          <option selected hidden disabled>
            Выберите страну
          </option>
          {countries.map((country) => (
            <option key={country.country} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
      )}

      {Cities.length > 0 && (
        <select className="select w-full max-w-xs" onChange={handleCityChange} value={singleCity}>
          <option selected hidden disabled>
            Выберите город
          </option>
          {Cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}
          </div>
    </div>
    <input type="hidden" name="locations" id='locations' value={combinedLocation} />

        </label>
        <label className='flex gap-1 items-end' htmlFor="langue">
          <div className='flex flex-col justify-between h-full'>
          <div>Знание языка</div>
          
          <select className="select w-full max-w-xs" id="langue" name="langue" >
          <option disabled selected value={null}>Знание языка</option>
        <option>Не знает языков</option>
        <option >Английский</option>
        <option >Немецкий</option>
        <option >Польский</option>

        </select>
          </div>
          <div className='flex flex-col justify-between  h-full'>
          <div>Уровень</div>
          <select className="select w-full max-w-xs" id="langueLvl" name="langueLvl" value={langue.level || ''} onChange={(e) => handleLangueChange('level', e.target.value || '')}>
          <option disabled selected value={null}>Уровень знание языка</option>
        <option >Уровень А1</option>
        <option >Уровень А2</option>
        <option >Уровень B1</option>
        <option >Уровень B2</option>
        </select>
          </div>
        </label>
        <label htmlFor="status">
            <div>Статус</div>
          <select className="select w-full " id="status" name="status" >
          <option disabled selected value={null}>Выберите Статус</option>
          <option>Не обработан</option>
          <option>Документы не готовы</option>
          <option>Не подошла вакансия</option>
          <option>Нашел другую работу</option>
          <option>Ждёт работу</option>
          <option>На собеседовании</option>
          <option>На объекте</option>
          <option>В ЧС</option>
        </select>
        </label>
        <label htmlFor="statusFromPartner">
              <div>Статус от партнера</div>
              <select className="select w-full" id="statusFromPartner" name="statusFromPartner" >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
              <div className='flex gap-1 items-center justify-between'>
                <p>С</p>
              <input className="input input-bordered input-accent w-full max-w-xs" 
           type="date" id="from" name="from" />
                </div>
                <div className='flex gap-1 items-center justify-between'>
                <p>До</p>
              <input className="input input-bordered input-accent w-full max-w-xs" 
            type="date"  id='to' name='to' />
                </div>
            </label>
           <div>
             
              </div>
              <button type="button" className="btn btn-accent" onClick={handleDismissalClick}>
          Добавить статус "Уволен"
        </button>
        
        {/* Показывать поле для даты увольнения, если showDismissalDate === true */}
        {showDismissalDate && (
          <div>
            <label htmlFor="dismissalDate">
              <div>Дата увольнения</div>
              <input
                className="input input-bordered input-accent w-full max-w-xs"
                id="dismissalDate"
                name="dismissalDate"
                type="date"
                // onChange={(e) => handleStatusFromPartnerChange('dismissalDate', e.target.value)}
              />
            </label>
          </div>
        )}
        <label htmlFor="drivePermis">
        <div>
      <h3>Категории В/У</h3>
      <MultiSelect
        options={drivePermis}
        value={selectedDrive}
        onChange={setSelectedDrive}
        labelledBy="drivePermis"
      />
    </div>
        </label>
        <div>
        <label htmlFor="leaving">
              <div>Готов выехать</div>
            <input className="input input-bordered input-accent w-full max-w-xs" 
            type="date"  id='leaving' name='leaving' />
            </label>
            <label htmlFor="dateArrival">
              <div>Приехал на объект</div>
            <input className="input input-bordered input-accent w-full max-w-xs" 
            type="date"  id='dateArrival' name='dateArrival' />
            </label>
        </div>
       
            {/* <label htmlFor="workHours">
              <div>Желаемые часы отработки</div>
            <input className="accent w-full max-w-xs" type="number"  id='workHours' name='workHours' />
            </label>     */}
        <label htmlFor="manager">
          <div>Менеджер</div>
        <select className="select w-full max-w-xs" id="manager" name="manager">
         <option disabled selected value={null}>Выберите менеджера</option>
          {manager.map(m => (
            <option key={m._id} value={m._id}>{m.name}</option>
          ))}
        </select>
        </label>
        <label htmlFor="cardNumber" className=" w-full max-w-xs">
          <div>Номер счёта</div>
        <input className="input input-bordered input-accent w-full max-w-xs"
         id="cardNumber" name="cardNumber" type="text" placeholder="Номер счёта" />
        </label>
        </div>
        <div className='grid justify-center items-stretch content-space-evenly '>
        <label htmlFor="professions">
        <div>
        <h3>Профессии</h3>
      <button className="btn btn-outline btn-success mt-3 btn-xs w-full" type="button" onClick={addProfessionEntry}>Добавить профессию</button>

      </div>
        {professionEntries.map((prof, index) => (
  <div key={index} className='flex flex-col w-full max-w-xs gap-1'>
    <label htmlFor="profession">
      <select className="select w-full max-w-xs" value={prof.name || ''} onChange={e => handleProfessionChange(index, 'name', e.target.value || '')}>
      <option value={null} disabled selected>Выберите профессию</option>
      <option>Нет профессии</option>
        {professions.map(profession => (
          <option key={profession._id} value={profession.name}>{profession.name}</option>
        ))}
      </select>
    </label>
    <label htmlFor="experience">
      <div>Опыт работы</div>
      <select className="select select-accent w-full max-w-xs" value={prof.experience || ''} onChange={e => handleProfessionChange(index, 'experience', e.target.value || '')}>
        <option value={null} disabled selected >Опыт работы</option>
        <option >Без опыта</option>
        <option >Меньше года</option>
        <option >От 2-х лет</option>
        <option >Более 10-ти лет</option>
      </select>
    </label>
    <button className="btn btn-outline btn-error btn-xs" type="button" onClick={() => removeProfessionEntry(index)}>Удалить профессию</button>
  </div>
))}
        </label>
        </div>
        <div className='grid justify-center items-stretch content-space-evenly '>
        <label htmlFor="documents" className='flex flex-col '>
        <div>
          <label htmlFor="citizenship">
            <div>Гражданство</div>
          <select className="select w-full max-w-xs" id="citizenship" name="citizenship" >
          <option disabled selected value={null}>Укажите гражданство</option>
          <option>Евросоюза</option>
          <option>Молдовы</option>
          <option>Украины</option>
          <option>Беларусь</option>
          <option>Узбекистана</option>
          <option>Таджикистана</option>
          <option>Киргизии</option>
          <option>Армении</option>
          <option>Грузии</option>
          <option>Другое</option>
        </select>
        </label>
        <div>Документы</div>
        <button className="btn btn-outline btn-success mt-3 btn-xs" type="button" onClick={addDocumentEntry}>Добавить документ</button>

        </div>
        {documentEntries.map((doc, index) => (
          <div key={index} className='flex flex-col w-full max-w-xs gap-1'>
            <label htmlFor="nameDocument">
              <div>Название документа</div>
            <select  className="select w-full max-w-xs" value={doc.docType || ''} onChange={e => handleDocumentChange(index, 'docType', e.target.value || '')}>
             <option  value={null}>Выберите документ</option>
              <option value="Виза">Виза</option>
              <option value="Песель">Песель</option>
              <option value="Паспорт">Паспорт</option>
              <option value="Паспорт Биометрия Украины">Паспорт Биометрия Украины</option>
              <option value="Параграф 24">Параграф 24</option>
              <option value="Карта побыту">Карта побыту</option>
              <option value="Приглашение">Приглашение</option>
            </select>
            </label>
          
          
            <div className='flex gap-1'>
            <label htmlFor="dateOfIssue">
              <div>Дата выдачи</div>
            <input className="input input-bordered input-accent w-full max-w-xs" 
            type="date" value={doc.dateOfIssue} onChange={e => handleDocumentChange(index, 'dateOfIssue', e.target.value)} />
            </label>
            <label htmlFor="documDate">
              <div>До какого числа</div>
            <input className="input input-bordered input-accent w-full max-w-xs" 
            type="date" value={doc.dateExp} onChange={e => handleDocumentChange(index, 'dateExp', e.target.value)} />
            </label>
            </div>
            
            
            <label htmlFor="nunberDoc">
              <div>Номер документа</div>
            <input className="input input-bordered input-accent w-full max-w-xs" type="text" 
            value={doc.numberDoc} onChange={e => handleDocumentChange(index, 'numberDoc', e.target.value)} />
            </label>
            <button className="btn btn-outline btn-error btn-xs" type="button" onClick={() => removeDocumentEntry(index)}>Удалить документ</button>
          </div>
        ))}
        </label>
        </div>
        
        </div>
        <label htmlFor="comment">
          <div>Комментарий</div>
        <textarea className="textarea textarea-accent w-full "
         id="comment" name="comment" placeholder="Комментарий" />
        </label>
        
        {errorMessage && <div className="alert alert-error mt-2">{errorMessage}</div>}
        {statusFromPartner.status === "В ЧС" && <div className="alert alert-blacklist mt-2">Кандидат находится в чёрном списке</div>}

<button className="btn btn-accent w-full mt-4" type="submit">Создать кандидата</button>
        
      </form>
    </div>
    
  );
}
