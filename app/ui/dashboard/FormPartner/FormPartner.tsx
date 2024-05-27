'use client'
import React, {  useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { MultiSelect } from "react-multi-select-component";
import  Axios  from 'axios';
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

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      },
      status: formData.get('status') || '',
      drivePermis: selectedDrive.map(d => d.value).join(', '),
      leaving: formData.get('leaving') || '',
      langue: {
        name: formData.get('langue') || '',
        level: formData.get('level') || ''
      },
      comment: formData.get('comment') || ''
    };

    try {
      const response = await fetch('/api/addPartners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (response.ok) {
        console.log('partner created:', result);
        router.refresh();
        router.push("/dashboard/partners");
      } else {
        console.error('Failed to create partners:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const router = useRouter();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2'>
          <div className='grid justify-start items-stretch content-space-evenly '>
          <label htmlFor="manager">
              <div>Менеджер</div>
              <select className="select w-full max-w-xs" id="manager" name="manager">
                <option disabled selected value={null}>Выберите менеджера</option>
                {manager.map(m => (
                  <option key={m._id} value={m._id}>{m.name}</option>
                ))}
              </select>
            </label>
            <label htmlFor="name">
              <div>Имя</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="name" name="name" type="text" placeholder="Сергей" required />
            </label>
            <label htmlFor="phone">
              <div>Телефон</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="phone" name="phone" type="text" placeholder="+373696855446" required />
            </label>
            <label htmlFor="companyName">
              <div>Название фирмы</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="companyName" name="companyName" type="text" placeholder="Название фирмы" />
            </label>
            <label htmlFor="numberDE">
              <div>Номер DE</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="numberDE" name="numberDE" type="text" placeholder="154544641" />
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
            <label htmlFor="email">
              <div>Почта</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="email" name="email" type="text" placeholder="example@mail.ru" />
            </label>
            <label htmlFor="rentPrice">
              <div>Цена проживания</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="rentPrice" name="rentPrice" type="text" placeholder="300 евро в месяц" />
            </label>
            <label htmlFor="avans">
              <div>Когда может дать аванс</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="avans" name="avans" type="text" placeholder="100 евро после первой недели" />
            </label>
            <label htmlFor="workwear">
              <div>Спецодежда</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="workwear" name="workwear" type="text" placeholder="Выдаёт после первой недели" />
            </label>
            <label htmlFor="site">
              <div>Сайт</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="site" name="site" type="text" placeholder="www.partner.com" />
            </label>
            <label htmlFor="contract" className='bg-slate-200 my-3'>
              <div>Контракт</div>
              <div >
                <div>Тип контракта</div>
                <select className="select w-full max-w-xs" id="typeC" name="typeC" value={contract.typeC} onChange={(e) => handleContractChange('typeC', e.target.value)}>
  <option disabled selected value={null}>Выберите тип контракта</option>
  <option>Не можем договорится</option>
  <option>Почасовый</option>
  <option>От объёма</option>
  <option>Налог</option>
</select>

              </div>
              <div>
                <div>Стоимость контарка</div>
                <input className="input input-bordered input-accent w-full max-w-xs"
                id="sum" name="sum" type="text" placeholder="20 euro" /> </div>

            </label>
            <label htmlFor="status">
              <div>Статус</div>
              <select className="select w-full max-w-xs" id="status" name="status">
                <option disabled selected value={null}>Выберите Статус</option>
                <option>Не смогли поговорить</option>
                <option>Думает над предложением</option>
                <option>Контракт на подписи</option>
                <option>Ждёт людей</option>
                <option>Люди на объекте</option>
                <option>В ЧС</option>
              </select>
            </label>
            <label htmlFor="drivePermis">
              <div>
                <h3>Требуется В/У кат.</h3>
                <MultiSelect
                  options={drivePermis}
                  value={selectedDrive}
                  onChange={setSelectedDrive}
                  labelledBy="drivePermis"
                />
              </div>
            </label>
            <label htmlFor="leaving">
              <div>Готов принимать людей с:</div>
              <input className="accent w-full max-w-xs" type="date" id='leaving' name='leaving' />
            </label>
            <label htmlFor="workHours">
              <div>Даёт часы отработки</div>
              <input className="accent w-full max-w-xs" type="text" id='workHours' name='workHours' />
            </label>
            <label className='flex gap-1 items-end' htmlFor="langue">
              <div className='flex flex-col justify-between h-full'>
                <div>Знание языка</div>
                <select className="select w-full max-w-xs" id="langue" name="langue">
                  <option disabled selected value={null}>Знание языка</option>
                  <option>Не знает языков</option>
                  <option>Английский</option>
                  <option>Немецкий</option>
                  <option>Польский</option>
                </select>
              </div>
              <div className='flex flex-col justify-between  h-full'>
                <div>Уровень</div>
                <select className="select w-full max-w-xs" id="level" name="level" value={langue.level || ''} onChange={(e) => handleLangueChange('level', e.target.value || '')}>
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
