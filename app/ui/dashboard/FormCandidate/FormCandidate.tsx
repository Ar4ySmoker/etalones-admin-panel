'use client'
import React, {useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { MultiSelect } from "react-multi-select-component";
import Axios from "axios";
import TextInput from '../../inputs/TextInput/TextInput';

const drivePermis = [
  { label: "В", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D"},
  { label: "E", value: "E"},
  { label: "Код 95", value: "Код 95"},
  { label: "Есть своё авто", value: "Есть своё авто"},
];
const statuses = [
  { label: "Не трудоустроен", value: "Не трудоустроен" },
  { label: "Трудоустроен", value: "Трудоустроен" },
  { label: "В отпуске", value: "В отпуске"},

]

export default function Form({ professions,  manager, partners }) {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  let [countries, setCountries] = useState([]);
  let [singleCountry, setSingleCountry] = useState("");
  let [Cities, setCities] = useState([]);
  let [singleCity, setSingleCity] = useState("");
  let [combinedLocation, setCombinedLocation] = useState("");
  let [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
  // let [statusFromPartner, setStatusFromPartner] = useState({ status: "Не трудоустроен", who: "" });
  // const [errorMessage, setErrorMessage] = useState("");
  const [selectedDrive, setSelectedDrive] = useState([]);
  const [showDismissalDate, setShowDismissalDate] = useState(false);
  const [showAdditionalPhone, setAdditionalPhone] = useState(false);
  const [additionalPhones, setAdditionalPhones] = useState([""]);
  const [ageNum, setAgeNum] = useState('');

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  };

  const handleBirthDateChange = (event) => {
    const birthDate = event.target.value;
    if (birthDate) {
      const calculatedAge = calculateAge(birthDate);
      setAgeNum(calculatedAge.toString());
    } else {
      setAgeNum('');
    }
  };


  // const handleStatusFromPartnerChange = (field, value) => {
  //   setStatusFromPartner(prevStatusFromPartner => ({ ...prevStatusFromPartner, [field]: value }));
  // };

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

  const handlePhoneBlur = async () => {
    if (!phone) {
      setPhoneError('Введите номер телефона');
      return;
    }
  
    try {
      const response = await fetch('/api/checkPhone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setPhoneError(''); // Номер доступен
      } else if (response.status === 400) {
        setPhoneError(result.message); // Номер занят
      }
    } catch (error) {
      console.error('Network error:', error);
      setPhoneError('Произошла ошибка при проверке номера телефона');
    }
  };
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setErrorMessage("");
    console.log('Submitting with documents:', documentEntries);
    console.log('Submitting with PROFESSIONS:', professionEntries);

    const formData = new FormData(event.target);
    const body = {
      bank: formData.get('bank') || '',
      swift: formData.get('swift') || '',
      bet: formData.get('bet') || '',
      hours: formData.get('hours') || '',
      homePrice: formData.get('homePrice') || '',
      
      name: formData.get('name') || '', 
      age: formData.get('age') || '',
      ageNum: formData.get('ageNum') || '',
      phone: formData.get('phone') || '',
      additionalPhones: additionalPhones.filter(phone => phone.trim() !== ''),
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
      partners:formData.get('partners') || null,
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
        // setErrorMessage(result.message); // Устанавливаем сообщение об ошибке
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  const handleDismissalClick = () => {
    setShowDismissalDate(true);
  };
  const handleAdditionalPhone = () => {
    setAdditionalPhone(true);
  };
  const addAdditionalPhone = () => {
    setAdditionalPhones([...additionalPhones, ""]);
  };

  const handleAdditionalPhoneChange = (index, value) => {
    const phones = [...additionalPhones];
    phones[index] = value;
    setAdditionalPhones(phones);
  };

  const removeAdditionalPhone = (index) => {
    const phones = additionalPhones.filter((_, i) => i !== index);
    setAdditionalPhones(phones);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}  >
        <div className='grid grid-cols-3'>
        <div className='grid justify-start items-stretch content-space-evenly '>
        <TextInput id='name' title='Имя'/>
        <label htmlFor="age">
        <div>Возраст</div>
        <div className="flex gap-1">
          <label htmlFor="age">
            <div>Дата рождения</div>
            <input
              className="input input-bordered input-success input-xs w-full max-w-xs"
              id="age"
              name="age"
              type="date"
              onChange={handleBirthDateChange}
            />
          </label>
          <label htmlFor="ageNum">
            <div>Возраст</div>
            <input
              className="input input-bordered input-success input-xs w-full max-w-xs"
              id="ageNum"
              name="ageNum"
              type="text"
              value={ageNum}
              readOnly
            />
          </label>
        </div>
      </label>
        {/* <label htmlFor="age">
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
            </label> */}
        <label htmlFor="phone">
  <div>Телефон</div>
<input className="input input-bordered input-xs input-success w-full max-w-xs"
         id="phone" name="phone" type="text"  onChange={(e) => setPhone(e.target.value)} 
         onBlur={handlePhoneBlur} 
         placeholder="Phone" required />
                <button type="button" className="btn btn-accent" onClick={handleAdditionalPhone}><strong>+</strong></button>
         {phoneError && <div role="alert" className="alert alert-error">
  {/* <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="h-6 w-6 shrink-0 stroke-current">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg> */}
  <span>{phoneError}</span>
</div>}
        </label>
        {showAdditionalPhone && (
                  <div>
        <button className='btn btn-accent' type="button" onClick={addAdditionalPhone}><strong>+</strong></button>

        {additionalPhones.map((phone, index) => (
          <div key={index}>
            <TextInput
             id='additionalPhone'
             name='additionalPhone'
             title='Дополнительный номер'
              type="text"
              onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
              placeholder="Дополнительный телефон"
            />
            <button type="button" onClick={() => removeAdditionalPhone(index)}>Удалить</button>
          </div>
        ))}
      </div>    
        )}

        <label htmlFor="locations">
  <div>Местоположение - {combinedLocation}</div>
         <div>
          <div className='flex gap-1'>
          {countries && (
        <select className="select w-full max-w-xs select-success select-xs" onChange={(e) => fetchCities(e.target.value)} >
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
        <select className="select w-full max-w-xs select-success select-xs" onChange={handleCityChange} value={singleCity}>
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
          
          <select className="select w-full max-w-xs select-success select-xs" id="langue" name="langue" >
          <option disabled selected value={null}>Знание языка</option>
        <option>Не знает языков</option>
        <option >Английский</option>
        <option >Немецкий</option>
        <option >Польский</option>

        </select>
          </div>
          <div className='flex flex-col justify-between  h-full'>
          <div>Уровень</div>
          <select className="select w-full max-w-xs select-success select-xs" id="langueLvl" name="langueLvl" value={langue.level || ''} onChange={(e) => handleLangueChange('level', e.target.value || '')}>
          <option disabled selected value={null}>Уровень знание языка</option>
        <option >Уровень А1</option>
        <option >Уровень А2</option>
        <option >Уровень B1</option>
        <option >Уровень B2</option>
        </select>
          </div>
        </label>
        <label htmlFor="status">
            <div>Статус работника на момент диалога</div>
          <select className="select w-full select-success select-xs" id="status" name="status" >
          <option disabled selected value={null}>Выберите Статус</option>
          <option>Не обработан</option>
          <option>Не подходят документы</option>
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
              <label htmlFor="partners">
              <select className="select w-full max-w-xs select-success select-xs"  
          id="partners" name="partners" >
         <option disabled selected value={null}>Выберите заказчика</option>
          {partners.map(p => (
            <option key={p._id} value={p._id}>{p.name} - {p.companyName}</option>
          ))}
              </select>
              </label>
              
              <select className="select w-full select-success select-xs" id="statusFromPartner" name="statusFromPartner" >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
              <div className='flex gap-1 items-center justify-between'>
               
                <TextInput id='from' title='С' type="date"/>
                <TextInput id='to' title='До' type="date"/>
                </div>
                
            </label>
           <div>
             
              </div>
              <button type="button" className="btn btn-accent" onClick={handleDismissalClick}>Добавить дату увольнения</button>
        
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
     
          <TextInput id='leaving' title='Готов выехать' type="date"/>
          <TextInput id='dateArrival' title='Приехал на объект' type="date"/>
       
       
            {/* <label htmlFor="workHours">
              <div>Желаемые часы отработки</div>
            <input className="accent w-full max-w-xs" type="number"  id='workHours' name='workHours' />
            </label>     */}
        <label htmlFor="manager">
          <div>Менеджер</div>
        <select className="select w-full select-success select-xs max-w-xs" id="manager" name="manager">
         <option disabled selected value={null}>Выберите менеджера</option>
          {manager.map(m => (
            <option key={m._id} value={m._id}>{m.name}</option>
          ))}
        </select>
        </label>
        <TextInput id='cardNumber' title='Номер счёта'/>
        <TextInput id='banck' title='Банк'/>
        <TextInput id='swift' title='Swift'/>
        <TextInput id='bet' title='Ставка'/>
        <TextInput id='hours' title='Часы отработки'/>
        <TextInput id='homePrice' title='Стоимость проживания'/>
        
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
      <select className="select w-full max-w-xs select-success select-xs" value={prof.name || ''} onChange={e => handleProfessionChange(index, 'name', e.target.value || '')}>
      <option value={null} disabled selected>Выберите профессию</option>
      <option>Нет профессии</option>
        {professions.map(profession => (
          <option key={profession._id} value={profession.name}>{profession.name}</option>
        ))}
      </select>
    </label>
    <label htmlFor="experience">
      <div>Опыт работы</div>
      <select className="select w-full max-w-xs select-success select-xs" value={prof.experience || ''} onChange={e => handleProfessionChange(index, 'experience', e.target.value || '')}>
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
          <select className="select w-full max-w-xs select-success select-xs" id="citizenship" name="citizenship" >
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
          <option>Казахстан</option>
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
            <select  className="select w-full max-w-xs select-success select-xs" value={doc.docType || ''} onChange={e => handleDocumentChange(index, 'docType', e.target.value || '')}>
             <option  value={null}>Выберите документ</option>
              <option value="Виза">Виза</option>
              <option value="Песель">Песель</option>
              <option value="Паспорт">Паспорт</option>
              <option value="Паспорт ЕС">Паспорт ЕС</option>
              <option value="Паспорт Биометрия Украины">Паспорт Биометрия Украины</option>
              <option value="Параграф 24">Параграф 24</option>
              <option value="Карта побыту">Карта побыту</option>
              <option value="Геверба">Геверба</option>
              <option value="Карта сталого побыта">Карта сталого побыта</option>
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
        
        {/* {errorMessage && <div className="alert alert-error mt-2">{errorMessage}</div>}
        {statusFromPartner.status === "В ЧС" && <div className="alert alert-blacklist mt-2">Кандидат находится в чёрном списке</div>} */}

<button className="btn btn-accent w-full mt-4" type="submit">Создать кандидата</button>
        
      </form>
    </div>
    
  );
}
