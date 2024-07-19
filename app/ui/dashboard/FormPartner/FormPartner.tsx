'use client'
import React, {  useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { MultiSelect } from "react-multi-select-component";
import  Axios  from 'axios';
import TextInput from '../../inputs/TextInput/TextInput';
// import Axios from "axios";

const drivePermis = [
  { label: "В", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "Код 95", value: "Код 95" },
];

export default function FormPartner({ professions, manager }) {
  let [countries, setCountries] = useState([]);
  let [singleCountry, setSingleCountry] = useState("");
  let [Cities, setCities] = useState([]);
  let [singleCity, setSingleCity] = useState("");
  let [combinedLocation, setCombinedLocation] = useState("");
  const [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
  const [selectedDrive, setSelectedDrive] = useState([]);
  const [contract, setContract] = useState({ typeC: "", sum: ""});
  const [fileContract, setFileContract] = useState(null);

  const handleLangueChange = (field, value) => {
    setLangue(prevLangue => ({ ...prevLangue, [field]: value }));
  };
  const fetchCountries = async () => {
    let country = await Axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    setCountries(country.data.data);
  };

  const fetchCities = (country) => {
    const Cities = countries.find((c) => c.country === country);
    setCities(Cities.cities);
    setSingleCountry(country); 
    setSingleCity(""); 
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
  const handleContractChange = (field, value) => {
    setContract(prevContract => ({ ...prevContract, [field]: value }));
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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const body = {
  //     name: formData.get('name') || '',
  //     phone: formData.get('phone') || '',
  //     professions: professionEntries.filter(profession => profession.name.trim() !== '' || profession.experience.trim() !== ''),
  //     email: formData.get('email') || '',
  //     site: formData.get('site') || '',
  //     rentPrice: formData.get('rentPrice') || '',
  //     avans: formData.get('avans') || '',
  //     workwear: formData.get('workwear') || '',
  //     workHours: formData.get('workHours') || '',
  //     companyName: formData.get('companyName') || '',
  //     location: combinedLocation,
  //     numberDE: formData.get('numberDE') || 0,     
  //     manager: formData.get('manager') || null,
  //     contract: {
  //       typeC: formData.get('typeC') || '',
  //       sum: formData.get('sum') || '',
  //       salaryWorker: formData.get('salaryWorker') || '',

  //     },
  //     status: formData.get('status') || '',
  //     drivePermis: selectedDrive.map(d => d.value).join(', '),
  //     leaving: formData.get('leaving') || '',
  //     langue: {
  //       name: formData.get('langue') || '',
  //       level: formData.get('level') || ''
  //     },
  //     comment: formData.get('comment') || ''
  //   };

  //   try {
  //     const response = await fetch('/api/addPartners', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(body)
  //     });
  //     const result = await response.json();
  //     if (response.ok) {
  //       router.refresh();
  //       router.push("/dashboard/partners");
  //     } else {
  //       console.error('Failed to create partners:', result);
  //     }
  //   } catch (error) {
  //     console.error('Network error:', error);
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Загрузка файла контракта
      let fileFormData = new FormData();
      fileFormData.append('file', fileContract);
      const fileResponse = await Axios.post('/api/uploadDocument', fileFormData); // Замените на ваш реальный API endpoint

      if (!fileResponse.data.success) {
        console.error('Failed to upload document:', fileResponse.data.error);
        return;
      }

      const fileId = fileResponse.data.document._id; // Получаем ID сохраненного документа

      const formData = new FormData(event.target);
      const body = {
        name: formData.get('name') || '',
        phone: formData.get('phone') || '',
        professions: professionEntries.filter(profession => profession.name.trim() !== '' || profession.experience.trim() !== ''),
        email: formData.get('email') || '',
        site: formData.get('site') || '',
        rentPrice: formData.get('rentPrice') || '',
        avans: formData.get('avans') || '',
        workwear: formData.get('workwear') || '',
        workHours: formData.get('workHours') || '',
        companyName: formData.get('companyName') || '',
        location: combinedLocation,
        numberDE: formData.get('numberDE') || 0,
        manager: formData.get('manager') || null,
        contract: {
          typeC: formData.get('typeC') || '',
          sum: formData.get('sum') || '',
          salaryWorker: formData.get('salaryWorker') || '',
        },
        status: formData.get('status') || '',
        drivePermis: selectedDrive.map(d => d.value).join(', '),
        leaving: formData.get('leaving') || '',
        langue: {
          name: formData.get('langue') || '',
          level: formData.get('level') || ''
        },
        comment: formData.get('comment') || '',
        documents: [fileId] // Передаем только ID нового добавленного файла
      };

      const response = await Axios.post('/api/addPartners', body);
      if (response.status === 201) {
        router.refresh();
        router.push("/dashboard/partners");
      } else {
        console.error('Failed to create partners:', response.data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  const router = useRouter();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">
<div>Загрузите файл контракта</div>
        <input
            className="file-input file-input-bordered  w-full max-w-xs"
                    type='file'
                    name='fileContract'
                    onChange={(e) => setFileContract(e.target.files?.[0])}
                />
        </label>
       
        <div className='grid grid-cols-2 font-light text-sm'>
          <div className='grid justify-start items-stretch content-space-evenly '>
          <label htmlFor="manager">
              <div>Менеджер</div>
              <select className="select select-xs w-full select-success max-w-xs" id="manager" name="manager">
                <option disabled selected value={null}>Выберите менеджера</option>
                {manager.map(m => (
                  <option key={m._id} value={m._id}>{m.name}</option>
                ))}
              </select>
            </label>
            <TextInput id='name' title='Имя' placeholder='Сергей'/>
            <TextInput id='phone' title='Телефон' placeholder='373696855446'/>
            <TextInput id='companyName' title='Название фирмы' placeholder='Название фирмы'/>
            <TextInput id='numberDE' title='Номер DE' placeholder='154544641'/>

            <label htmlFor="locations">
  <div>Местоположение - {combinedLocation}</div>
         <div>
          <div className='flex gap-1'>
          {countries && (
        <select className="select select-xs select-success w-full max-w-xs" onChange={(e) => fetchCities(e.target.value)} >
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
        <select className="select select-xs select-success w-full max-w-xs" onChange={handleCityChange} value={singleCity}>
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
        <TextInput id='email' title='Почта' placeholder='example@mail.ru'/>
        <TextInput id='rentPrice' title='Цена проживания' placeholder='300 евро в месяц'/>
        <TextInput id='avans' title='Когда может дать аванс' placeholder='100 евро после первой недели'/>
        <TextInput id='workwear' title='Спецодежда' placeholder='Выдаёт после первой недели'/>
        <TextInput id='site' title='Сайт' placeholder='www.partner.com'/>
            <label htmlFor="contract" className='my-3'>
              <div>Контракт</div>
              <div>
                <div>Тип контракта</div>
                <select className="select select-xs select-success w-full max-w-xs" id="typeC" name="typeC" value={contract.typeC} onChange={(e) => handleContractChange('typeC', e.target.value)}>
  <option disabled selected value={null}>Выберите тип контракта</option>
  <option>Не можем договорится</option>
  <option>Почасовый</option>
  <option>От объёма</option>
  <option>Налог</option>
</select>

              </div>
              <div>
              <TextInput id='sum' title='Стоимость контарка' placeholder='20 euro'/>
              <TextInput id='salaryWorker' title='Зарплата работника' placeholder='12 евро в час'/>

              </div>

            </label>
            <label htmlFor="status">
              <div>Статус</div>
              <select className="select select-xs select-success w-full max-w-xs" id="status" name="status">
                <option disabled selected value={null}>Выберите Статус</option>
                <option value={'neo'}>Не смогли поговорить</option>
                <option value={'dum'}>Думает над предложением</option>
                <option value={'poz'}>Начнёт работу позже</option>
                <option value={'pod'}>Контракт на подписи</option>
                <option value={'jde'}>Ждёт людей</option>
                <option value={'nao'}>Люди на объекте</option>
                <option value={'chs'}>В ЧС</option>
              </select>
            </label>
            <label htmlFor="drivePermis">
              <div>
                <h3>Требуется В/У кат.</h3>
                <MultiSelect
                className=' w-full max-w-xs'
                  options={drivePermis}
                  value={selectedDrive}
                  onChange={setSelectedDrive}
                  labelledBy="drivePermis"
                />
              </div>
            </label>
            <TextInput id='leaving' type="date" title='Готов принимать людей с:'/>
            <TextInput id='workHours' title='Даёт часы отработки' placeholder='200 часов в месяц'/>
 
            <label className='flex gap-1 items-end' htmlFor="langue">
              <div className='flex flex-col justify-between h-full'>
                <div>Знание языка</div>
                <select className="select select-xs select-success w-full max-w-xs" id="langue" name="langue">
                  <option disabled selected value={null}>Знание языка</option>
                  <option>Не знает языков</option>
                  <option>Английский</option>
                  <option>Немецкий</option>
                  <option>Польский</option>
                </select>
              </div>
              <div className='flex flex-col justify-between  h-full'>
                <div>Уровень</div>
                <select className="select select-xs select-success w-full max-w-xs" id="level" name="level" value={langue.level || ''} onChange={(e) => handleLangueChange('level', e.target.value || '')}>
                  <option disabled selected value={null}>Уровень знание языка</option>
                  <option>Уровень А1</option>
                  <option>Уровень А2</option>
                  <option>Уровень B1</option>
                  <option>Уровень B2</option>
                </select>
              </div>
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
      <select className="select select-xs select-success w-full max-w-xs" value={prof.name || ''} onChange={e => handleProfessionChange(index, 'name', e.target.value || '')}>
      <option value={null} disabled selected>Выберите профессию</option>
      <option>Нет профессии</option>
        {professions.map(profession => (
          <option key={profession._id} value={profession.name}>{profession.name}</option>
        ))}
      </select>
    </label>
    <label htmlFor="experience">
      <div>Опыт работы</div>
      <select className="select select-xs select-success w-full max-w-xs" value={prof.experience || ''} onChange={e => handleProfessionChange(index, 'experience', e.target.value || '')}>
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
