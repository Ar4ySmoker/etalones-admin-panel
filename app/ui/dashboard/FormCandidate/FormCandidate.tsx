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

export default function Form({ professions,  manager }) {
  let [countries, setCountries] = useState([]);
  let [singleCountry, setSingleCountry] = useState("");
  let [Cities, setCities] = useState([]);
  let [singleCity, setSingleCity] = useState("");
  let [combinedLocation, setCombinedLocation] = useState("");
  let [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
  let [statusFromPartner, setStatusFromPartner] = useState({ status: "Не трудоустроен", who: "" });

  const [selectedDrive, setSelectedDrive] = useState([]);
  const [selectedLangue, setSelectedLangue] = useState("");
  let [statusFromPartner, setStatusFromPartner] = useState({ status: "Не трудоустроен", who: "" });

  const handleStatusFromPartnerChange = (field, value) => {
    setStatusFromPartner(prevStatusFromPartner => ({ ...prevStatusFromPartner, [field]: value }));
  };

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
    if (singleCountry && singleCity) {
      setCombinedLocation(`${singleCountry}, ${singleCity}`);
    }
  }, [singleCountry, singleCity]);
  
  const router = useRouter();

  const [documentEntries, setDocumentEntries] = useState([]);

  const addDocumentEntry = () => {
    setDocumentEntries([...documentEntries, { docType: 'Нет документов', dateExp: '', numberDoc: '' }]);
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
    console.log('Submitting with documents:', documentEntries);
    console.log('Submitting with PROFESSIONS:', professionEntries);

    const formData = new FormData(event.target);
    const body = {
      name: formData.get('name') || '', 
      age: formData.get('age') || '',
      phone: formData.get('phone') || '',
      professions: professionEntries.filter(profession => profession.name.trim() !== '' || profession.experience.trim() !== ''),
      locations: combinedLocation,
      documents: documentEntries.filter(document => document.docType.trim() !== '' || document.dateExp.trim() !== '' || document.numberDoc.trim() !== ''),
      drivePermis: selectedDrive.map(d => d.value).join(', '),
      leaving: formData.get('leaving') || '',
      cardNumber: formData.get('cardNumber') || '',
      workHours: formData.get('workHours') || '',
      langue: {
        name: formData.get('langue') || '',
        level: formData.get('langueLvl') || ''
      },
      status: formData.get('status') || null,
      statusFromPartner:{
        status: formData.get('statusFromPartner'),
        who: formData.get('who')
      },
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
        console.error('Failed to create candidate:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
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
<input className="input input-bordered input-accent w-full max-w-xs"
         id="age" name="age" type="text" placeholder="32 года" />
        </label>
        <label htmlFor="phone">
  <div>Телефон</div>
<input className="input input-bordered input-accent w-full max-w-xs"
         id="phone" name="phone" type="text" placeholder="+373696855446" required />
        </label>
        <label htmlFor="locations">
  <div>Местоположение - {combinedLocation}</div>
        {/* <select id="locations" name="locations" className="select w-full max-w-xs">
         <option value="Город" disabled selected>Выберите Город</option>
          {locations.map(location => (
            <option key={location._id} value={location._id}>{location.name}</option>
          ))}
        </select> */}
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
          <select className="select w-full max-w-xs" id="status" name="status" >
          <option disabled selected value={null}>Выберите Статус</option>
          <option>Не обработан</option>
          <option>Документы не готовы</option>
          <option>Ждёт работу</option>
          <option>На собеседовании</option>
          <option>На объекте</option>
          <option>В ЧС</option>
        </select>
        </label>
        <label className='flex gap-1 items-end' htmlFor="statusFromPartner">
          <div className='flex flex-col justify-between h-full'>
          <div>Статус трудоустройства</div>
          <select className="select w-full max-w-xs" id="statusFromPartner" name="statusFromPartner" >
          <option disabled selected value={null}>Статус Трудоустройства</option>
        <option>Не трудоустроен</option>
        <option >Трудоустроен</option>
        <option >В отпуске</option>
        </select>
          </div>
          <div className='flex flex-col justify-between  h-full'>
          <div>Заказчик</div>
          <select className="select w-full max-w-xs" id="who" name="who" value={statusFromPartner.who || ''} onChange={(e) => handleStatusFromPartnerChange('who', e.target.value || '')}>
          <option disabled selected value={null}>Выберите заказчика</option>
          <option >Нет заказчика</option>
          <option >WERTBAU NORD GmbH </option>
        <option >TEREBRO </option>
        <option >Konstantin Sain </option>
        <option >A&K Trockenbau </option>
        <option >ВИКТОР ГАЛЛИАРД</option>
        <option>David Batiridis</option>
        <option>Gennadios Panagkasidis</option>
        <option> INDEPENDA солнечные панели</option>
        <option >GARDTBaU</option>
        <option >Baugerüste Sky GbR-Илья</option>
        <option >Seidel & Zinenko GbR - Владимир  </option>
        <option >Zolarix GmbH  </option>
        <option >Vitalii Savchuk  </option>
        <option >ПЛИТКА Дрезден - Лилия </option>
        <option >ANTON FREI  </option>
        <option >SIGA BAU </option>
        <option >ВИТАЛИЙ АЛАВАСКИ </option>
        <option > RAIMONDA  </option>
        <option >K und K Bau GbR </option>
        <option >PALLETE HPZ  </option>
        <option >Monolith GmbH  </option>
        </select>
          </div>
        </label>
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
        <label htmlFor="leaving">
              <div>Готов выехать</div>
            <input className="accent w-full max-w-xs" type="date"  id='leaving' name='leaving' />
            </label>
            <label htmlFor="workHours">
              <div>Желаемые часы отработки</div>
            <input className="accent w-full max-w-xs" type="number"  id='workHours' name='workHours' />
            </label>    
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
          <h3>Документы</h3>
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
              <option value="Карта побыту">Карта побыту</option>
            </select>
            </label>
            
            <label htmlFor="documDate">
              <div>До какаого числа</div>
            <input className="accent w-full max-w-xs" type="date" value={doc.dateExp} onChange={e => handleDocumentChange(index, 'dateExp', e.target.value)} />
            </label>
            <label htmlFor="nunberDoc">
              <div>Номер документа</div>
            <input className="input input-bordered input-accent w-full max-w-xs" type="text" value={doc.numberDoc} onChange={e => handleDocumentChange(index, 'numberDoc', e.target.value)} />
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
        <button className="btn btn-success w-full" type="submit">Сохранить кандидата</button>
        
      </form>
    </div>
  );
}
