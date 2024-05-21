'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { MultiSelect } from "react-multi-select-component";
import Axios from "axios";

const drivePermis = [
  { label: "В", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "Код 95", value: "Код 95" },
];

export default function FormPartner({ professions, manager }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([[]]); // Массив массивов для городов
  const [singleCountry, setSingleCountry] = useState([""]); // Массив для хранения страны каждой локации
  const [singleCity, setSingleCity] = useState([""]); // Массив для хранения города каждой локации
  const [combinedLocation, setCombinedLocation] = useState([""]);
  const [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
  const [selectedDrive, setSelectedDrive] = useState([]);
  const [locationEntries, setLocationEntries] = useState([{ name: '', profession: '', numberPeople: 0 }]);

  const handleLangueChange = (field, value) => {
    setLangue(prevLangue => ({ ...prevLangue, [field]: value }));
  };

  const fetchCountries = async () => {
    let country = await Axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    setCountries(country.data.data);
  };

  const fetchCities = (country, index) => {
    const countryData = countries.find(c => c.country === country);
    const newCities = [...cities];
    newCities[index] = countryData ? countryData.cities : [];
    setCities(newCities);

    const newSingleCountry = [...singleCountry];
    newSingleCountry[index] = country;
    setSingleCountry(newSingleCountry);

    const newSingleCity = [...singleCity];
    newSingleCity[index] = ""; // Сброс города при изменении страны
    setSingleCity(newSingleCity);
  };

  const handleCityChange = (index, city) => {
    const newSingleCity = [...singleCity];
    newSingleCity[index] = city;
    setSingleCity(newSingleCity);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const newCombinedLocation = singleCountry.map((country, index) => `${country}, ${singleCity[index]}`);
    console.log('singleCountry:', singleCountry); // Логируем значения singleCountry
    console.log('singleCity:', singleCity);
    setCombinedLocation(newCombinedLocation);
  }, [singleCountry, singleCity]);

  const addLocationEntry = () => {
    setLocationEntries([...locationEntries, { name: '', profession: '', numberPeople: 0 }]);
    setCombinedLocation([...combinedLocation, ""]);
    setSingleCountry([...singleCountry, ""]);
    setSingleCity([...singleCity, ""]);
    setCities([...cities, []]);
  };

  const handleLocationChange = (index, field, value) => {
    const newEntries = [...locationEntries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setLocationEntries(newEntries);
  };

  const removeLocationEntry = (index) => {
    const newEntries = locationEntries.filter((_, i) => i !== index);
    setLocationEntries(newEntries);

    const newCombinedLocation = combinedLocation.filter((_, i) => i !== index);
    setCombinedLocation(newCombinedLocation);

    const newSingleCountry = singleCountry.filter((_, i) => i !== index);
    setSingleCountry(newSingleCountry);

    const newSingleCity = singleCity.filter((_, i) => i !== index);
    setSingleCity(newSingleCity);

    const newCities = cities.filter((_, i) => i !== index);
    setCities(newCities);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting with PROFESSIONS:', locationEntries);

    const formData = new FormData(event.target);
    const body = {
      name: formData.get('name') || '',
      phone: formData.get('phone') || '',
      email: formData.get('email') || '',
      site: formData.get('site') || '',
      companyName: formData.get('companyName') || '',
      numberDE: formData.get('numberDE') || 0,
      location: locationEntries.map((entry, index) => ({
        name: combinedLocation[index], // Используем combinedLocation в качестве name
        profession: entry.profession,
        numberPeople: entry.numberPeople
      })),
      manager: formData.get('manager') || null,
      contract: {
        sum: formData.get('contractSum') || 0,
        type: formData.get('contractType') || '',
        subscribe: formData.get('contractSubscribe') === 'on',
      },
      status: formData.get('status') || '',
      drivePermis: selectedDrive.map(d => d.value).join(', '),
      leaving: formData.get('leaving') || '',
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
                id="numberDE" name="numberDE" type="text" placeholder="154544641313" />
            </label>
            <label htmlFor="email">
              <div>Почта</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="email" name="email" type="text" placeholder="example@mail.ru" />
            </label>
            <label htmlFor="site">
              <div>Сайт</div>
              <input className="input input-bordered input-accent w-full max-w-xs"
                id="site" name="site" type="text" placeholder="www.partner.com" />
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
                <select className="select w-full max-w-xs" id="langueLvl" name="langueLvl" value={langue.level || ''} onChange={(e) => handleLangueChange('level', e.target.value || '')}>
                  <option disabled selected value={null}>Уровень знание языка</option>
                  <option>Уровень А1</option>
                  <option>Уровень А2</option>
                  <option>Уровень B1</option>
                  <option>Уровень B2</option>
                </select>
              </div>
            </label>
            <label htmlFor="status">
              <div>Статус</div>
              <select className="select w-full max-w-xs" id="status" name="status">
                <option disabled selected value={null}>Выберите Статус</option>
                <option>Не обработан</option>
                <option>Документы не готовы</option>
                <option>Ждёт работу</option>
                <option>На собеседовании</option>
                <option>На объекте</option>
                <option>В ЧС</option>
              </select>
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
              <input className="accent w-full max-w-xs" type="date" id='leaving' name='leaving' />
            </label>
            <label htmlFor="workHours">
              <div>Желаемые часы отработки</div>
              <input className="accent w-full max-w-xs" type="number" id='workHours' name='workHours' />
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
          <div className='grid justify-center items-stretch content-space-evenly'>
            <label htmlFor="locations">
              <div>
                <h3>Нужны люди</h3>
                <button className="btn btn-outline btn-success mt-3 btn-xs w-full" type="button" onClick={addLocationEntry}>Добавить локацию</button>
              </div>
              {locationEntries.map((loc, index) => (
                <div key={index} className='flex flex-col w-full max-w-xs gap-1'>
                  <div>
                    <div>Местоположение - {combinedLocation[index]}</div>
                    <div className='flex gap-1'>
                      {countries && (
                        <select className="select w-full max-w-xs" onChange={(e) => fetchCities(e.target.value, index)} value={singleCountry[index]}>
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
                      {cities[index]?.length > 0 && (
                        <select className="select w-full max-w-xs" onChange={(e) => handleCityChange(index, e.target.value)} value={singleCity[index]}>
                          <option selected hidden disabled>
                            Выберите город
                          </option>
                          {cities[index].map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  <input type="hidden" value={combinedLocation[index]} />
                  <label htmlFor="profession">
                    <div>Профессия</div>
                    <select className="select w-full max-w-xs" value={loc.profession || ''} onChange={e => handleLocationChange(index, 'profession', e.target.value)}>
                      <option value={null} disabled selected>Выберите профессию</option>
                      <option>Нет профессии</option>
                      {professions.map(profession => (
                        <option key={profession._id} value={profession.name}>{profession.name}</option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="numberPeople">
                    <div>Количество человек</div>
                    <input className="input input-bordered input-accent w-full max-w-xs" type="number" value={loc.numberPeople} onChange={e => handleLocationChange(index, 'numberPeople', e.target.value)} />
                  </label>
                  <button className="btn btn-outline btn-error mt-3 btn-xs w-full" type="button" onClick={() => removeLocationEntry(index)}>Удалить локацию</button>
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
