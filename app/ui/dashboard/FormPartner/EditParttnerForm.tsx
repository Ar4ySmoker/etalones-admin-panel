"use client";
 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import { MultiSelect } from "react-multi-select-component";

const drivePermis = [
    { label: "В", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "Код 95", value: "Код 95" },
  ];

export default function EditPartnerForm({ id, partner, managers}) {
  let [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState([""]); // Массив для хранения страны каждой локации
  const [cities, setCities] = useState([[]]); // Массив массивов для городов
  const [singleCity, setSingleCity] = useState([""]); // Массив для хранения города каждой локации
  const [combinedLocation, setCombinedLocation] = useState([""]);
  let [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
  const [selectedDrive, setSelectedDrive] = useState([]);
  const [locationEntries, setLocationEntries] = useState([{ name: '', profession: '', numberPeople: 0, price: '' }]);

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

  // const fetchCities = (country, index) => {
  //   const countryData = countries.find(c => c.country === country);
  //   const newCities = [...cities];
  //   newCities[index] = countryData ? countryData.cities : [];
  //   setCities(newCities);

  //   const newSingleCountry = [...singleCountry];
  //   newSingleCountry[index] = country;
  //   setSingleCountry(newSingleCountry);

  //   const newSingleCity = [...singleCity];
  //   newSingleCity[index] = ""; // Сброс города при изменении страны
  //   setSingleCity(newSingleCity);
  // };
  // const handleCityChange = (index, city) => {
  //   const newSingleCity = [...singleCity];
  //   newSingleCity[index] = city;
  //   setSingleCity(newSingleCity);
  // };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const newCombinedLocation = singleCountry.map((country, index) => `${country}, ${singleCity[index]}`);
    console.log('singleCountry:', singleCountry); // Логируем значения singleCountry
    console.log('singleCity:', singleCity);
    setCombinedLocation(newCombinedLocation);
  }, [singleCountry, singleCity]);
  

  // const addLocationEntry = () => {
  //   setLocationEntries([...locationEntries, { name: '', profession: '', numberPeople: 0, price:'' }]);
  //   setCombinedLocation([...combinedLocation, ""]);
  //   setSingleCountry([...singleCountry, ""]);
  //   setSingleCity([...singleCity, ""]);
  //   setCities([...cities, []]);
  // };
  // const handleLocationChange = (index, field, value) => {
  //   const newEntries = [...locationEntries];
  //   newEntries[index] = { ...newEntries[index], [field]: value };
  //   setLocationEntries(newEntries);
  // };

  // const removeLocationEntry = (index) => {
  //   const newEntries = locationEntries.filter((_, i) => i !== index);
  //   setLocationEntries(newEntries);

  //   const newCombinedLocation = combinedLocation.filter((_, i) => i !== index);
  //   setCombinedLocation(newCombinedLocation);

  //   const newSingleCountry = singleCountry.filter((_, i) => i !== index);
  //   setSingleCountry(newSingleCountry);

  //   const newSingleCity = singleCity.filter((_, i) => i !== index);
  //   setSingleCity(newSingleCity);

  //   const newCities = cities.filter((_, i) => i !== index);
  //   setCities(newCities);
  // };

    const router = useRouter();
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
            const formData = new FormData(e.target);

            const body = {
                name: formData.get('name') || partner.name,
                phone: formData.get('phone') || partner.phone,
                email: formData.get('email') || partner.email,
                site: formData.get('site') || partner.site,
                companyName: formData.get('companyName') || partner.companyName,
                numberDE: formData.get('numberDE') || partner.numberDE,
                vacancies: locationEntries.map((entry, index) => ({
                  name: combinedLocation[index], // Используем combinedLocation в качестве name
                  profession: entry.profession,
                  numberPeople: entry.numberPeople,
                  price: entry.price,
                  country: singleCountry[index],
                  city: singleCity[index]
                })),
                manager: formData.get('manager') || partner.manager,
                contract: JSON.stringify({
                  sum: formData.get('contractSum'),
                  type: formData.get('contractType'),
                  subscribe: formData.get('contractSubscribe'),
                }),
                status: formData.get('status') || partner.status,
                drivePermis: selectedDrive.map(d => d.value).join(', '),
                leaving: formData.get('leaving') || partner.leaving,
                langue: {
                  name: formData.get('langue') || partner.langue.name,
                  level: formData.get('langueLvl') || partner.langue.level
                },
                comment: formData.get('comment') || partner.comment
              };
        try {
            const res = await fetch(`https://www.candidat.store/api/partners/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body),
            });
 
            if (!res.ok) {
                throw new Error("Failed to update Partner");
            }
 
            router.refresh();
            router.push("/dashboard/partners");
        } catch (error) {
            console.log(error);
        }
    };
 
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2'>
              <div className='grid justify-start items-stretch content-space-evenly '>
              <label htmlFor="manager">
                  <div>Менеджер</div>
                  <select className="select w-full max-w-xs" id="manager" name="manager" defaultValue={partner?.manager._id}>
                    <option disabled selected value={null}>Выберите менеджера</option>
                    {managers.map(m => (
                      <option key={m._id} value={m._id}>{m.name}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="name">
                  <div>Имя</div>
                  <input className="input input-bordered input-accent w-full max-w-xs"
                    id="name" name="name" type="text" placeholder={partner?.name} defaultValue={partner?.name} />
                </label>
                <label htmlFor="phone">
                  <div>Телефон</div>
                  <input className="input input-bordered input-accent w-full max-w-xs"
                    id="phone" name="phone" type="text" defaultValue={partner.phone} required />
                </label>
                <label htmlFor="companyName">
                  <div>Название фирмы</div>
                  <input className="input input-bordered input-accent w-full max-w-xs"
                    id="companyName" name="companyName" type="text" defaultValue={partner.companyName} placeholder="Название фирмы" />
                </label>
                <label htmlFor="numberDE">
                  <div>Номер DE</div>
                  <input className="input input-bordered input-accent w-full max-w-xs"
                    id="numberDE" name="numberDE" type="text" defaultValue={partner.numberDE} placeholder="154544641" />
                </label>
                <label htmlFor="email">
                  <div>Почта</div>
                  <input className="input input-bordered input-accent w-full max-w-xs"
                    id="email" name="email" type="text" defaultValue={partner.email} placeholder="example@mail.ru" />
                </label>
                <label htmlFor="site">
                  <div>Сайт</div>
                  <input className="input input-bordered input-accent w-full max-w-xs"
                    id="site" name="site" type="text" defaultValue={partner.site} placeholder="www.partner.com" />
                </label>
                <label htmlFor="contract" className='bg-slate-200 my-3'>
                  <div>Контракт</div>
                  <div >
                    <div>Тип контракта</div>
                    <select className="select w-full max-w-xs" id="contractType" name="contractType" defaultValue={partner.contract.type}>
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
                    id="contractSum" name="contractSum" type="text" defaultValue={partner.contract.sum} placeholder={partner.contract} /> </div>
                    
                </label>
                <label htmlFor="status">
                  <div>Статус</div>
                  <select className="select w-full max-w-xs" id="status" name="status" defaultValue={partner.status}>
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
                    <h3>Требуется В/У кат. - было выбранно {partner.drivePermis}</h3>
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
                  <input className="accent w-full max-w-xs" type="date" id='leaving' name='leaving' defaultValue={formatDate(partner.leaving)} />
                </label>
                <label htmlFor="workHours">
                  <div>Даёт часы отработки</div>
                  <input className="accent w-full max-w-xs" type="number" id='workHours' name='workHours'  defaultValue={partner.workHours} />
                </label>
                <label className='flex gap-1 items-end' htmlFor="langue">
                  <div className='flex flex-col justify-between h-full'>
                    <div>Знание языка</div>
                    <select className="select w-full max-w-xs" id="langue" name="langue" defaultValue={partner.langue.name}>
                      <option disabled selected value={null}>Знание языка</option>
                      <option>Не знает языков</option>
                      <option>Английский</option>
                      <option>Немецкий</option>
                      <option>Польский</option>
                    </select>
                  </div>
                  <div className='flex flex-col justify-between  h-full'>
                    <div>Уровень</div>
                    <select className="select w-full max-w-xs" id="langueLvl" name="langueLvl" defaultValue={partner.langue.level} value={langue.level || ''} onChange={(e) => handleLangueChange('level', e.target.value || '')}>
                      <option disabled selected value={null}>Уровень знание языка</option>
                      <option>Уровень А1</option>
                      <option>Уровень А2</option>
                      <option>Уровень B1</option>
                      <option>Уровень B2</option>
                    </select>
                  </div>
                </label>
              </div>
              {/* <div className='grid justify-center items-stretch content-space-evenly'>
                <label htmlFor="locations">
                  <div>
                    <h3>Нужны люди</h3>
                    <button className="btn btn-outline btn-success mt-3 btn-xs w-full" type="button" onClick={addLocationEntry}>Добавить вакансию</button>
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
                      <label htmlFor="price">
                        <div>Цена контракта</div>
                        <input className="input input-bordered input-accent w-full max-w-xs" type="text" value={loc.price} onChange={e => handleLocationChange(index, 'price', e.target.value)} />
                      </label>
                      <button className="btn btn-outline btn-error mt-3 btn-xs w-full" type="button" onClick={() => removeLocationEntry(index)}>Удалить локацию</button>
                    </div>
                  ))}
                </label>
              </div> */}
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
