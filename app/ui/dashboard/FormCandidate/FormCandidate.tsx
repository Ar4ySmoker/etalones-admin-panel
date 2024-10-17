'use client'
import React, {useContext, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { MultiSelect } from "react-multi-select-component";
import Axios from "axios";
import TextInput from '../../inputs/TextInput/TextInput';
import { IoIosMan } from 'react-icons/io';
import { FaTools } from 'react-icons/fa';
import { IoDocuments } from 'react-icons/io5';
import { MdConnectWithoutContact } from 'react-icons/md';
import CMultiSelect from '../../Multiselect/Multiselect';
import NotificationContext from "@/app/context/NotificationContext";
import { CirclePlus, X, CircleX } from 'lucide-react';


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

export default function Form({ professions, candidate,  manager, partners }) {
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
  const [showAdditionalPhone, setAdditionalPhone] = useState(true);
  const [additionalPhones, setAdditionalPhones] = useState([""]);
  const [ageNum, setAgeNum] = useState('');
  const [activeSection, setActiveSection] = useState('personal'); // 'all', 'personal', 'professions', 'partner', 'documents'

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };
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
    if (phoneError) {
      console.error('Ошибка: ' + phoneError);
      return;
    }

    const formData = new FormData(event.target);
    const body = {
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
      // comment: formData.get('comment') || ''
      comment: formData.get('comment') ? [{
        text: formData.get('comment'),
        date: new Date()
      }] : []
    };
 


    try {
      const response = await fetch('/api/addCandidate', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (response.ok) {
        addNotification({
          title: "Обновлено",
          content: "Кандидат успешно обновлен",
          type: "success",
          id: ""
        });
        console.log('Candidate created:', result);
        router.refresh();
        router.push("/dashboard/candidates");
      } else {
        // setErrorMessage(result.message); // Устанавливаем сообщение об ошибке
      }
    } catch (error) {
      addNotification({
        title: "Ошибка",
        content: "Кандидат не обновлен, чтото пошло не так",
        type: "error",
        id: ""
      });
      console.error('Network error:', error);
    }
  };
  const handleDismissalClick = () => {
    setShowDismissalDate(true);
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
  const addNotification = useContext(NotificationContext);

  return (
    <>
    <div className="flex w-full justify-center">
      <h1 className="font-bold py-10 text-2xl">Создать кандидата</h1>
    </div>

<form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
          <div> 
              <>
              <div className='flex-col flex justify-center items-start mx-auto w-max gap-4 mt-3'>    
              <TextInput id="name" title="ФИО" type="text" placeholder="Иван Иванов"  defaultValue={candidate?.name} />
                <div className="flex gap-2 items-center">
                <TextInput id="phone" title="Телефон" type="text" placeholder="+373696855446"  />
                <button type="button" className="btn-xs text-green-500 hover:text-green-700 transition duration-300 ease-in-out" onClick={addAdditionalPhone}><CirclePlus /></button>
                </div>
                {showAdditionalPhone && (
                  <>
                    {additionalPhones.map((phone, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <TextInput 
                        title={`${index + 1} телефон`}
                        id={`additionalPhone${index}`}
                        name={`additionalPhone${index}`}
                        type="phone"
                        placeholder={phone}
                        value={phone}
                        onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
                        />
                        <button type="button" className="btn-xs text-red-500 hover:text-red-700 transition duration-300 ease-in-out" onClick={() => removeAdditionalPhone(index)}><X /></button>
                      </div>
                    ))}
                    <button type="button" onClick={addAdditionalPhone}></button>
                  </>
                )}
              <TextInput  id="age" title="Дата рождения" type="date" placeholder="33"/>
              <TextInput id="ageNum" title="Возраст" type="text" placeholder="33"  />
              <label htmlFor="status" className="flex justify-between w-[400px]">
                <div>Статус</div>
                <select className="select input input-bordered input-success input-xs w-[200px] select-success select-xs" id="status" name="status"
                  >
                  <option disabled selected value={null}>Выберите Статус</option>
                  <option>Не обработан</option>
                  <option>Нет месседжеров</option>
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
              <TextInput id='cardNumber' title='Номер счёта' type="text"  />
              </div>              
              </>
            
              <>
                <div className='flex-col flex justify-center items-start mx-auto w-full gap-4 mt-3'>
              <label htmlFor="professions">
                <div className="flex justify-between items-start m-2">
                  <h3 className="font-bold text-xl">Профессии</h3>
                  <button
  className="btn-xs text-green-500 hover:text-green-700 transition duration-300 ease-in-out"
  type="button"
  onClick={addProfessionEntry}
>
  <CirclePlus />
</button>
                </div>
                {professionEntries.map((prof, index) => (
                  <div key={index} className='flex w-full  gap-1 m-2'>
                    <label htmlFor="profession">
                      <select className="select w-full select-success select-xs" value={prof.name || ''} onChange={e => handleProfessionChange(index, 'name', e.target.value || '')}>
                        <option value={null} disabled selected>Выберите профессию</option>
                        <option>Нет профессии</option>
                        {professions.map(profession => (
                          <option key={profession._id} value={profession.name}>{profession.name}</option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor="experience">
                      <select className="select w-full  select-success select-xs" value={prof.experience || ''} onChange={e => handleProfessionChange(index, 'experience', e.target.value || '')}>
                        <option disabled selected value={null}>Опыт работы</option>
                        <option >Без опыта</option>
                        <option >Меньше года</option>
                        <option >Более года</option>
                        <option >От 2-х лет</option>
                        <option >Более 10-ти лет</option>
                      </select>
                    </label>
                    <button 
                    className="btn-xs text-red-500 hover:text-red-700 transition duration-300 ease-in-out" 
                    type="button" onClick={() => removeProfessionEntry(index)}><CircleX /></button>
                  </div>
                ))}
              </label>
            </div>
              </>
            
              <div className="flex flex-col items-start gap-2">
              <label htmlFor="statusFromPartner" className="flex flex-col gap-2">
                <div>Статус от партнера</div>
                <label htmlFor="partners">
                  <p>Заказчик</p>
                  <select className="select w-full max-w-xs select-success select-xs"
                    id="partners" name="partners" >
                    <option disabled value={null}>Выберите заказчика</option>
                    {partners.map(p => (
                      <option key={p._id} value={p._id}>{p.name} - {p.companyName}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="" className="flex flex-col">
<p>Статус трудоустройства</p>
                <select className="select w-full max-w-xs select-success select-xs" id="statusFromPartner" name="statusFromPartner"
                  >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
                </label>
                <div className='flex items-center w-[300px]'>
                  <TextInput id='from' className="w-[150px] input input-bordered input-success input-xs"  type="date"  />
  <span>-</span>
                  <TextInput id='to' className="w-[150px] input input-bordered input-success input-xs" type="date"  />
                </div>
              </label>
              
              <button type="button" className="btn btn-xs btn-accent" onClick={handleDismissalClick}>Добавить дату Уволенения
              </button>
  
              {showDismissalDate && (
                <div>
                  <TextInput id='dismissalDate' title='Дата увольнения' type="date"  />
  
                </div>
              )}
                            <TextInput id='leaving' title='Готов выехать' type="date"  />
                            <TextInput id='dateArrival' title='Приехал на объект' type="date"  />
              </div>
              <>
              <div className='flex-col flex justify-center items-center  mt-3 '>
              <label htmlFor="documents" className='flex flex-col'>
              <label htmlFor="citizenship" className='flex items-center justify-between w-[400px]'>
                    <div className='text-md font-bold'>Гражданство</div>
                    <select className="select w-[200px] m-2 max-w-xs select-success select-xs"
                      id="citizenship" name="citizenship"
                       >
                      <option disabled selected value={null}>Укажите гражданство</option>
                      <option>Не известно</option>
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
                <div className='flex justify-center items-center'>
                  <h3 className="my-3 text-md font-bold">Документы</h3>
                  <button className="btn-xs text-green-500 hover:text-green-700 transition duration-300 ease-in-out" type="button" onClick={addDocumentEntry}>
                    <CirclePlus />
                  </button>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                {documentEntries.map((doc, index) => (
                  <div key={index} className=" flex">
                    <p className="w-5">{`${index + 1}.`}</p>&nbsp;
                    <label htmlFor="nameDocument" className="flex items-center gap-2 w-[1000px]">
                      <select className="select  w-[400px] select-success select-xs" value={doc.docType || ''} onChange={e => handleDocumentChange(index, 'docType', e.target.value || '')}>
                        <option value={null}>Выберите документ</option>
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
                    <TextInput id='nunberDoc' title='#:' type="text" defaultValue={doc.numberDoc} onChange={e => handleDocumentChange(index, 'numberDoc', e.target.value)} />
                      <TextInput id='dateOfIssue' title='Выдан' type="date" defaultValue={doc.dateOfIssue} onChange={e => handleDocumentChange(index, 'dateOfIssue', e.target.value)} />
                      <TextInput id='documDate' title='До' type="date" defaultValue={doc.dateExp} onChange={e => handleDocumentChange(index, 'dateExp', e.target.value)} />
                    <button className="btn-xs text-red-500 hover:text-red-700 transition duration-300 ease-in-out self-end flex"
                     type="button" onClick={() => removeDocumentEntry(index)}><CircleX /></button>
                    </label>
                  </div>
                ))}
                </div>
              </label>
            </div>
              </>
              <>
          <label htmlFor="manager">
          <div>Менеджер</div>
          <select className="select w-full max-w-xs select-success select-xs"
            name="manager" id="manager">
            <option disabled selected value={null}>Выберите менеджера</option>
            {manager.map(m => (
              <option key={m._id} value={m._id}>{m?.name}</option>
            ))}
          </select>
        </label>
              <label htmlFor="locations">
                <div>Местоположение кандидата-</div>
                <div>
                  <div className='flex gap-1'>
                    {countries && (
                      <select className="select w-full max-w-xs select-success select-xs"  onChange={(e) => fetchCities(e.target.value)} >
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
                <input type="hidden" name="locations" id='locations' value={combinedLocation}  />
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
                  <select className="select w-full max-w-xs select-success select-xs" id="langueLvl" name="langueLvl"  onChange={(e) => handleLangueChange('level', e.target.value || '')}>
                    <option disabled selected value={null}>Уровень знание языка</option>
                    <option >Уровень А1</option>
                    <option >Уровень А2</option>
                  </select>
                </div>
              </label>
              <div>
                <label htmlFor="drivePermis">
                  <div>
                    <h3>Категории В/У </h3>
                    <CMultiSelect options={drivePermis} placeholder="Категории В/У" className="w-full my-1 text-sm"     onChange={(selected: string[]) => setSelectedDrive(selected.map(value => ({ label: value, value })))}/>
                   
                  </div>
                </label>
  
              </div>
              <label htmlFor="comment">
            <div>Комментарий</div>
            <div>
          
            </div>
            <textarea className="textarea textarea-accent w-[300px] "
              id="comment" name="comment" placeholder="Оставьте свой омментарий"
               />
          </label>
              </>
            <div className='grid justify-start items-stretch content-space-evenly '>
             
            </div>
          
       
          </div>
         
          <button  className="btn btn-primary w-full max-w-xs">
            Создать кандидата
          </button>
        </form>
    {/* <form onSubmit={handleSubmit} >
      <div > 


        {activeSection === 'personal' && (
          <>
          <div className='w-full flex gap-4'> 
          <div>
          <TextInput id="name" title="Имя" type="text"  placeholder='Имя'  />
          <div>
            <TextInput id="phone" title="Телефон" type="text" placeholder="+373696855446"  />
            <button type="button" className="btn btn-accent btn-xs" onClick={addAdditionalPhone}><strong>+</strong></button>
            {showAdditionalPhone && (
              <>
                {additionalPhones.map((phone, index) => (
                  <div key={index}>
                    <label htmlFor={`additionalPhone${index}`}>
                      <div>Доп. Телефон {index + 1}</div>
                      <input
                        className="input input-bordered input-success input-xs w-full max-w-xs"
                        id={`additionalPhone${index}`}
                        name={`additionalPhone${index}`}
                        type="phone"
                        placeholder={phone}
                        value={phone}
                        onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
                        required
                      />
                    </label>
                    <button type="button" className="btn btn-error btn-xs" onClick={() => removeAdditionalPhone(index)}>Удалить</button>
                  </div>
                ))}
                <button type="button" onClick={addAdditionalPhone}>Добавить ещё один доп. телефон</button>
              </>
            )}
          </div>
          </div>
          
          <div>
          <TextInput id="age" title="Дата рождения" type="date" placeholder="30 лет" />
          <TextInput id="ageNum" title="Возраст" type="text"  />
          </div>
         <div>
          <label htmlFor="status">
            <div>Статус</div>
            <select className="select w-full max-w-xs select-success select-xs" id="status" name="status"
             >
              <option disabled selected value={null}>Выберите Статус</option>
              <option>Не обработан</option>
              <option>Нет месседжеров</option>
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
          <TextInput id='cardNumber' title='Номер счёта' type="text"  />
          </div>
          </div>
          </>
        )}
        {activeSection === 'professions' && (
          <>
            <div className='grid justify-start items-stretch content-space-evenly '>
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
                    <option disabled selected value={null}>Опыт работы</option>
                    <option >Без опыта</option>
                    <option >Меньше года</option>
                    <option >Более года</option>
                    <option >От 2-х лет</option>
                    <option >Более 10-ти лет</option>
                  </select>
                </label>
                <button className="btn btn-outline btn-error btn-xs" type="button" onClick={() => removeProfessionEntry(index)}>Удалить профессию</button>
              </div>
            ))}
          </label>
        </div>
          </>
        )}
        {activeSection === 'parnter' && (
          <>
          <label htmlFor="statusFromPartner">
            <div>Статус от партнера</div>
            <label htmlFor="partners">
              <select className="select w-full max-w-xs select-success select-xs"
                
                id="partners" name="partners" >
                <option disabled value={null}>Выберите заказчика</option>
                {partners.map(p => (
                  <option key={p._id} value={p._id}>{p.name} - {p.companyName}</option>
                ))}
              </select>
            </label>
            <select className="select w-full max-w-xs select-success select-xs" id="statusFromPartner" name="statusFromPartner"
             >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
            <div className='flex gap-1 items-center  w-full'>
              <TextInput id='from' title='С' type="date"  />

              <TextInput id='to' title='До' type="date"  />
            </div>
          </label>
          <button type="button" className="btn btn-xs btn-accent" onClick={handleDismissalClick}>Добавить дату Уволенения
          </button>

          {showDismissalDate && (
            <div>
              <TextInput id='dismissalDate' title='Дата увольнения' type="date"  />

            </div>
          )}
                        <TextInput id='leaving' title='Готов выехать' type="date"  />
                        <TextInput id='dateArrival' title='Приехал на объект' type="date"  />
          </>
        )}
        {activeSection === 'document' && (
          <>
          <div className='grid justify-start items-stretch content-space-evenly '>
          <label htmlFor="documents" className='flex flex-col '>
            <div>
              <label htmlFor="citizenship">
                <div>Гражданство</div>
                <select className="select w-full max-w-xs select-success select-xs"
                  id="citizenship" name="citizenship"
                   >
                  <option disabled selected value={null}>Укажите гражданство</option>
                  <option>Не известно</option>
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
              <h3>Документы</h3>
              <button className="btn btn-outline btn-success mt-3 btn-xs" type="button" onClick={addDocumentEntry}>Добавить документ</button>
            </div>
            {documentEntries.map((doc, index) => (
              <div key={index} className='flex flex-col w-full max-w-xs gap-1'>
                <label htmlFor="nameDocument">
                  <div>Название документа</div>
                  <select className="select w-full max-w-xs select-success select-xs" value={doc.docType || ''} onChange={e => handleDocumentChange(index, 'docType', e.target.value || '')}>
                    <option value={null}>Выберите документ</option>
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
                  <TextInput id='dateOfIssue' title='Дата выдачи' type="date" defaultValue={doc.dateOfIssue} onChange={e => handleDocumentChange(index, 'dateOfIssue', e.target.value)} />
                  <TextInput id='documDate' title='До какого числа' type="date" defaultValue={doc.dateExp} onChange={e => handleDocumentChange(index, 'dateExp', e.target.value)} />
                </div>
                <TextInput id='nunberDoc' title='Номер документа' type="text" defaultValue={doc.numberDoc} onChange={e => handleDocumentChange(index, 'numberDoc', e.target.value)} />
                <button className="btn btn-outline btn-error btn-xs" type="button" onClick={() => removeDocumentEntry(index)}>Удалить документ</button>
              </div>
            ))}
          </label>
        </div>
          </>
        )}
        {activeSection === 'other' && (
          <>
      <label htmlFor="manager">
      <div>Менеджер</div>
      <select className="select w-full max-w-xs select-success select-xs"
        
        name="manager" id="manager">
        <option disabled selected value={null}>Выберите менеджера</option>
        {manager .map(m => (
          <option key={m._id} value={m._id}>{m?.name}</option>
        ))}
      </select>
    </label>
          <label htmlFor="locations">
            <div>Местоположение кандидата</div>
            <div>
              <div className='flex gap-1'>
                {countries && (
                  <select className="select w-full max-w-xs select-success select-xs"  >
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
            <input type="hidden" name="locations" id='locations' value={combinedLocation}  />
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
              <select className="select w-full max-w-xs select-success select-xs" id="langueLvl" name="langueLvl" >
                <option disabled selected value={null}>Уровень знание языка</option>
                <option >Уровень А1</option>
                <option >Уровень А2</option>
              </select>
            </div>
          </label>
          <div>
            <label htmlFor="drivePermis">
              <div>
                <h3>Категории В/У </h3>
                <CMultiSelect options={drivePermis} placeholder="Категории В/У" className="w-full my-1 text-sm"     onChange={(selected: string[]) => setSelectedDrive(selected.map(value => ({ label: value, value })))}/>
               
              </div>
            </label>

          </div>
          <label htmlFor="comment">
        <div>Комментарий</div>
        <div>
       
        </div>
        <textarea className="textarea textarea-accent w-[300px] "
          id="comment" name="comment" placeholder="Оставьте свой омментарий"
           />
      </label>
          </>
        )}
        <div className='grid justify-start items-stretch content-space-evenly '>
         
        </div>
      
   
      </div>
     
      <button  className="btn btn-primary w-full max-w-xs">
        Обновить кандидата
      </button>
    </form> */}
  </>
//     <div>
//       <form onSubmit={handleSubmit}  >
//         <div className='grid grid-cols-3'>
//         <div className='grid justify-start items-stretch content-space-evenly '>
//         <TextInput id='name' title='Имя'/>
//         <label htmlFor="age">
//         <div>Возраст</div>
//         <div className="flex gap-1">
//           <label htmlFor="age">
//             <div>Дата рождения</div>
//             <input
//               className="input input-bordered input-success input-xs w-full max-w-xs"
//               id="age"
//               name="age"
//               type="date"
//               onChange={handleBirthDateChange}
//             />
//           </label>
//           <label htmlFor="ageNum">
//             <div>Возраст</div>
//             <input
//               className="input input-bordered input-success input-xs w-full max-w-xs"
//               id="ageNum"
//               name="ageNum"
//               type="text"
//               value={ageNum}
//               readOnly
//             />
//           </label>
//         </div>
//       </label>
//         {/* <label htmlFor="age">
//               <div>Возраст</div>
//               <div className='flex gap-1'>
//                 <label htmlFor="age">
//                   <div>Дата рождения</div>
//                   <input className="input input-bordered input-accent w-full max-w-xs" 
//                   id="age" name="age" type="date"   />
//                 </label>
//                 <label htmlFor="ageNum">
//                   <div>Возраст</div>
//                   <input className="input input-bordered input-accent w-full max-w-xs" id="ageNum" name="ageNum" type="text"   />
//                 </label>
//               </div>
//             </label> */}
//         <label htmlFor="phone">
//   <div>Телефон</div>
// <input className="input input-bordered input-xs input-success w-full max-w-xs"
//          id="phone" name="phone" type="text"  onChange={(e) => setPhone(e.target.value)} 
//          onBlur={handlePhoneBlur} 
//          placeholder="Phone" required />
//                 <button type="button" className="btn btn-accent" onClick={handleAdditionalPhone}><strong>+</strong></button>
//          {phoneError && <div role="alert" className="alert alert-error">
//   {/* <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     className="h-6 w-6 shrink-0 stroke-current">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//   </svg> */}
//   <span>{phoneError}</span>
// </div>}
//         </label>
//         {showAdditionalPhone && (
//                   <div>
//         <button className='btn btn-accent' type="button" onClick={addAdditionalPhone}><strong>+</strong></button>

//         {additionalPhones.map((phone, index) => (
//           <div key={index}>
//             <TextInput
//              id='additionalPhone'
//              name='additionalPhone'
//              title='Дополнительный номер'
//               type="text"
//               onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
//               placeholder="Дополнительный телефон"
//             />
//             <button type="button" onClick={() => removeAdditionalPhone(index)}>Удалить</button>
//           </div>
//         ))}
//       </div>    
//         )}

//         <label htmlFor="locations">
//   <div>Местоположение - {combinedLocation}</div>
//          <div>
//           <div className='flex gap-1'>
//           {countries && (
//         <select className="select w-full max-w-xs select-success select-xs" onChange={(e) => fetchCities(e.target.value)} >
//           <option selected hidden disabled>
//             Выберите страну
//           </option>
//           {countries.map((country) => (
//             <option key={country.country} value={country.country}>
//               {country.country}
//             </option>
//           ))}
//         </select>
//       )}

//       {Cities.length > 0 && (
//         <select className="select w-full max-w-xs select-success select-xs" onChange={handleCityChange} value={singleCity}>
//           <option selected hidden disabled>
//             Выберите город
//           </option>
//           {Cities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       )}
//           </div>
//     </div>
//     <input type="hidden" name="locations" id='locations' value={combinedLocation} />

//         </label>
//         <label className='flex gap-1 items-end' htmlFor="langue">
//           <div className='flex flex-col justify-between h-full'>
//           <div>Знание языка</div>
          
//           <select className="select w-full max-w-xs select-success select-xs" id="langue" name="langue" >
//           <option disabled selected value={null}>Знание языка</option>
//         <option>Не знает языков</option>
//         <option >Английский</option>
//         <option >Немецкий</option>
//         <option >Польский</option>

//         </select>
//           </div>
//           <div className='flex flex-col justify-between  h-full'>
//           <div>Уровень</div>
//           <select className="select w-full max-w-xs select-success select-xs" id="langueLvl" name="langueLvl" value={langue.level || ''} onChange={(e) => handleLangueChange('level', e.target.value || '')}>
//           <option disabled selected value={null}>Уровень знание языка</option>
//         <option >Уровень А1</option>
//         <option >Уровень А2</option>
//         <option >Уровень B1</option>
//         <option >Уровень B2</option>
//         </select>
//           </div>
//         </label>
//         <label htmlFor="status">
//             <div>Статус работника на момент диалога</div>
//           <select className="select w-full select-success select-xs" id="status" name="status" >
//           <option disabled selected value={null}>Выберите Статус</option>
//           <option>Не обработан</option>
//           <option>Не подходят документы</option>
//           <option>Документы не готовы</option>
//           <option>Не подошла вакансия</option>
//           <option>Нашел другую работу</option>
//           <option>Ждёт работу</option>
//           <option>На собеседовании</option>
//           <option>На объекте</option>
//           <option>В ЧС</option>
//         </select>
//         </label>
//         <label htmlFor="statusFromPartner">
//               <div>Статус от партнера</div>
//               <label htmlFor="partners">
//               <select className="select w-full max-w-xs select-success select-xs"  
//           id="partners" name="partners" >
//          <option disabled selected value={null}>Выберите заказчика</option>
//           {partners.map(p => (
//             <option key={p._id} value={p._id}>{p.name} - {p.companyName}</option>
//           ))}
//               </select>
//               </label>
              
//               <select className="select w-full select-success select-xs" id="statusFromPartner" name="statusFromPartner" >
//                 {statuses.map(status => (
//                   <option key={status.value} value={status.value}>{status.label}</option>
//                 ))}
//               </select>
//               <div className='flex gap-1 items-center justify-between'>
               
//                 <TextInput id='from' title='С' type="date"/>
//                 <TextInput id='to' title='До' type="date"/>
//                 </div>
                
//             </label>
//            <div>
             
//               </div>
//               <button type="button" className="btn btn-accent" onClick={handleDismissalClick}>Добавить дату увольнения</button>
        
//         {/* Показывать поле для даты увольнения, если showDismissalDate === true */}
//         {showDismissalDate && (
//           <div>
//             <label htmlFor="dismissalDate">
//               <div>Дата увольнения</div>
//               <input
//                 className="input input-bordered input-accent w-full max-w-xs"
//                 id="dismissalDate"
//                 name="dismissalDate"
//                 type="date"
//                 // onChange={(e) => handleStatusFromPartnerChange('dismissalDate', e.target.value)}
//               />
//             </label>
//           </div>
//         )}
//         <label htmlFor="drivePermis">
//         <div>
//       <h3>Категории В/У</h3>
//       <MultiSelect
//         options={drivePermis}
//         value={selectedDrive}
//         onChange={setSelectedDrive}
//         labelledBy="drivePermis"
//       />
//     </div>
//         </label>
     
//           <TextInput id='leaving' title='Готов выехать' type="date"/>
//           <TextInput id='dateArrival' title='Приехал на объект' type="date"/>
       
       
//             {/* <label htmlFor="workHours">
//               <div>Желаемые часы отработки</div>
//             <input className="accent w-full max-w-xs" type="number"  id='workHours' name='workHours' />
//             </label>     */}
//         <label htmlFor="manager">
//           <div>Менеджер</div>
//         <select className="select w-full select-success select-xs max-w-xs" id="manager" name="manager">
//          <option disabled selected value={null}>Выберите менеджера</option>
//           {manager.map(m => (
//             <option key={m._id} value={m._id}>{m.name}</option>
//           ))}
//         </select>
//         </label>
//         <TextInput id='cardNumber' title='Номер счёта'/>
        
//         </div>
//         <div className='grid justify-center items-stretch content-space-evenly '>
//         <label htmlFor="professions">
//         <div>
//         <h3>Профессии</h3>
//       <button className="btn btn-outline btn-success mt-3 btn-xs w-full" type="button" onClick={addProfessionEntry}>Добавить профессию</button>

//       </div>
//         {professionEntries.map((prof, index) => (
//   <div key={index} className='flex flex-col w-full max-w-xs gap-1'>
//     <label htmlFor="profession">
//       <select className="select w-full max-w-xs select-success select-xs" value={prof.name || ''} onChange={e => handleProfessionChange(index, 'name', e.target.value || '')}>
//       <option value={null} disabled selected>Выберите профессию</option>
//       <option>Нет профессии</option>
//         {professions.map(profession => (
//           <option key={profession._id} value={profession.name}>{profession.name}</option>
//         ))}
//       </select>
//     </label>
//     <label htmlFor="experience">
//       <div>Опыт работы</div>
//       <select className="select w-full max-w-xs select-success select-xs" value={prof.experience || ''} onChange={e => handleProfessionChange(index, 'experience', e.target.value || '')}>
//         <option value={null} disabled selected >Опыт работы</option>
//         <option >Без опыта</option>
//         <option >Меньше года</option>
//         <option >От 2-х лет</option>
//         <option >Более 10-ти лет</option>
//       </select>
//     </label>
//     <button className="btn btn-outline btn-error btn-xs" type="button" onClick={() => removeProfessionEntry(index)}>Удалить профессию</button>
//   </div>
// ))}
//         </label>
//         </div>
//         <div className='grid justify-center items-stretch content-space-evenly '>
//         <label htmlFor="documents" className='flex flex-col '>
//         <div>
//           <label htmlFor="citizenship">
//             <div>Гражданство</div>
//           <select className="select w-full max-w-xs select-success select-xs" id="citizenship" name="citizenship" >
//           <option disabled selected value={null}>Укажите гражданство</option>
//           <option>Евросоюза</option>
//           <option>Молдовы</option>
//           <option>Украины</option>
//           <option>Беларусь</option>
//           <option>Узбекистана</option>
//           <option>Таджикистана</option>
//           <option>Киргизии</option>
//           <option>Армении</option>
//           <option>Грузии</option>
//           <option>Казахстан</option>
//           <option>Другое</option>
//         </select>
//         </label>
//         <div>Документы</div>
//         <button className="btn btn-outline btn-success mt-3 btn-xs" type="button" onClick={addDocumentEntry}>Добавить документ</button>

//         </div>
//         {documentEntries.map((doc, index) => (
//           <div key={index} className='flex flex-col w-full max-w-xs gap-1'>
//             <label htmlFor="nameDocument">
//               <div>Название документа</div>
//             <select  className="select w-full max-w-xs select-success select-xs" value={doc.docType || ''} onChange={e => handleDocumentChange(index, 'docType', e.target.value || '')}>
//              <option  value={null}>Выберите документ</option>
//               <option value="Виза">Виза</option>
//               <option value="Песель">Песель</option>
//               <option value="Паспорт">Паспорт</option>
//               <option value="Паспорт ЕС">Паспорт ЕС</option>
//               <option value="Паспорт Биометрия Украины">Паспорт Биометрия Украины</option>
//               <option value="Параграф 24">Параграф 24</option>
//               <option value="Карта побыту">Карта побыту</option>
//               <option value="Геверба">Геверба</option>
//               <option value="Карта сталого побыта">Карта сталого побыта</option>
//               <option value="Приглашение">Приглашение</option>
//             </select>
//             </label>
          
          
//             <div className='flex gap-1'>
//             <label htmlFor="dateOfIssue">
//               <div>Дата выдачи</div>
//             <input className="input input-bordered input-accent w-full max-w-xs" 
//             type="date" value={doc.dateOfIssue} onChange={e => handleDocumentChange(index, 'dateOfIssue', e.target.value)} />
//             </label>
//             <label htmlFor="documDate">
//               <div>До какого числа</div>
//             <input className="input input-bordered input-accent w-full max-w-xs" 
//             type="date" value={doc.dateExp} onChange={e => handleDocumentChange(index, 'dateExp', e.target.value)} />
//             </label>
//             </div>
            
            
//             <label htmlFor="nunberDoc">
//               <div>Номер документа</div>
//             <input className="input input-bordered input-accent w-full max-w-xs" type="text" 
//             value={doc.numberDoc} onChange={e => handleDocumentChange(index, 'numberDoc', e.target.value)} />
//             </label>
//             <button className="btn btn-outline btn-error btn-xs" type="button" onClick={() => removeDocumentEntry(index)}>Удалить документ</button>
//           </div>
//         ))}
//         </label>
//         </div>
        
//         </div>
//         <label htmlFor="comment">
//           <div>Комментарий</div>
//         <textarea className="textarea textarea-accent w-full "
//          id="comment" name="comment" placeholder="Комментарий" />
//         </label>
        
//         {/* {errorMessage && <div className="alert alert-error mt-2">{errorMessage}</div>}
//         {statusFromPartner.status === "В ЧС" && <div className="alert alert-blacklist mt-2">Кандидат находится в чёрном списке</div>} */}

// <button className="btn btn-accent w-full mt-4" type="submit">Создать кандидата</button>
        
//       </form>
//     </div>
    
  );
}
