"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import TextInput from "../../inputs/TextInput/TextInput";
import { IoIosMan } from "react-icons/io";
import {  MdConnectWithoutContact } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import NotificationContext from "@/app/context/NotificationContext";
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
  { label: "Уволен", value: "Уволен"},
]

export default function EditCandidateForm({ id, candidate, managers, professions, partners }) {
  let [countries, setCountries] = useState([]);
  let [singleCountry, setSingleCountry] = useState("");
  let [Cities, setCities] = useState([]);
  let [singleCity, setSingleCity] = useState("");
  let [combinedLocation, setCombinedLocation] = useState(""); 
  let [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
  const [selectedDrive, setSelectedDrive] = useState([]);
    const [showDismissalDate, setShowDismissalDate] = useState(false);
    const [showAdditionalPhone, setAdditionalPhone] = useState(true);
    const [additionalPhones, setAdditionalPhones] = useState(candidate.additionalPhones || [""]);
    const [age, setAge] = useState('');
    const [activeSection, setActiveSection] = useState('personal'); // 'all', 'personal', 'professions', 'partner', 'documents'
    const handleMenuClick = (section) => {
      setActiveSection(section);
    };
    useEffect(() => {
      if (candidate?.age) {
        const birthDate = new Date(candidate.age);
        const formattedDate = birthDate.toISOString().split('T')[0];
        setAge(formattedDate);
      }
    }, [candidate]);

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
  
  // const renderProfessions = (professions) => {
  //   if (!professions || professions.length === 0) {
  //     return "нет профессий";
  //   }
  //   return professions.map((prof, index) => (
  //     <p key={index} className='flex flex-col'>
  //       <p>{prof.name}</p>
  //       <small>{prof.experience}</small>
  //     </p>
  //   ));
  // };
 
    const router = useRouter();
    const [professionEntries, setProfessionEntries] = useState(candidate?.professions || []);
    
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

    const [documentEntries, setDocumentEntries] = useState(candidate.documents || []);

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

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newCommentText = formData.get('comment');
    
      const newComment = newCommentText ? {
        text: newCommentText,
        date: new Date()
      } : null;
    
      const body = {
        source: "",
        name: formData.get('name') || candidate?.name,
        age: formData.get('age') || candidate?.age,
        ageNum: formData.get('ageNum') || candidate?.ageNum,
        phone: formData.get('phone') || candidate?.phone,
        additionalPhones: additionalPhones.length ? additionalPhones.filter(phone => phone.trim() !== '') : candidate.additionalPhones,
        professions: professionEntries.length ? professionEntries.filter(profession => profession.name.trim() !== '' || profession.experience.trim() !== '') : candidate.professions,
        locations: combinedLocation || candidate?.locations,
        documents: documentEntries.length ? documentEntries.filter(document => document.docType.trim() !== '' || document.dateExp.trim() !== '' || document.dateOfIssue.trim() !== '' || document.numberDoc.trim() !== '') : candidate.documents,
        drivePermis: selectedDrive.map(d => d.value).join(', ') || candidate.drivePermis,
        leaving: formData.get('leaving') || candidate?.leaving,
        dateArrival: formData.get('dateArrival') || candidate?.dateArrival,
        cardNumber: formData.get('cardNumber') || candidate?.cardNumber,
        langue: {
          name: formData.get('langue') || candidate?.langue?.name,
          level: formData.get('langueLvl') || candidate?.langue?.Lvl
        },
        status: formData.get('status') || candidate?.status,
        citizenship: formData.get('citizenship') || candidate?.citizenship,
        statusFromPartner: {
          status: formData.get('statusFromPartner') || candidate?.statusFromPartner?.status,
          from: formData.get('from') || candidate?.statusFromPartner?.from,
          to: formData.get('to') || candidate?.statusFromPartner?.to,
          dismissalDate: formData.get('dismissalDate') || candidate?.statusFromPartner?.dismissalDate
        },
        partners: formData.get('partners') || candidate?.partners,
        manager: formData.get('manager') || candidate?.manager,
        comment: newComment ? [...candidate.comment, newComment] : candidate.comment
      };
    
      try {
        const res = await fetch(`https://www.candidat.store/api/candidates/${id}`, {
                // const res = await fetch(`http://localhost:3000/api/candidates/${id}`, {

          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
    
        if (!res.ok) {
          throw new Error("Failed to update Candidate");
        }
        if (res.ok) {
          addNotification({
            title: "Обновлено",
            content: "Кандидат успешно обновлен",
            type: "success",
            id: ""
          });
          router.refresh();
          // router.push("/dashboard/candidates");
        }
        // router.refresh();
        // router.push("/dashboard/candidates");
      } catch (error) {
        addNotification({
          title: "Ошибка",
          content: "Кандидат не обновлен, чтото пошло не так",
          type: "error",
          id: ""
        });
        console.log(error);
      }
    };
    
    const handleDismissalClick = () => {
      setShowDismissalDate(true);
    };
    // const handleAdditionalPhone = () => {
    //   setAdditionalPhone(true);
    // };
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
        <div className="">
          <h1 className="font-bold py-10 text-2xl">Обновить кандидата {candidate.name}</h1>
        </div>
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
    <li>
      <a onClick={() => handleMenuClick('personal')}>
      <IoIosMan />
        Личные данные
      </a>
    </li>
    <li>
      <a onClick={() => handleMenuClick('professions')}>
      <FaTools />
      Профессии
      </a>
    </li>
    <li>
      <a onClick={() => handleMenuClick('parnter')}>
      <MdConnectWithoutContact />
        Партнер
      </a>
    </li>
    <li>
      <a onClick={() => handleMenuClick('document')}>
      <IoDocuments />
      Документы
      </a>
    </li>
    <li>
      <a onClick={() => handleMenuClick('other')}>
      <IoDocuments />
      Другое
      </a>
    </li>
  </ul>
        <form onSubmit={handleSubmit} >
          <div 
          // className='grid grid-cols-3'
          > 
  
  
            {activeSection === 'personal' && (
              <>
              <div className='w-full flex gap-4'> 
              <div>
              <TextInput id="name" title="Имя" type="text" placeholder={candidate?.name} defaultValue={candidate?.name} />
              <div>
                <TextInput id="phone" title="Телефон" type="text" placeholder="+373696855446" defaultValue={candidate?.phone} />
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
              <TextInput id="age" title="Дата рождения" type="date" placeholder={candidate?.age} defaultValue={candidate?.age ? candidate.age.split('T')[0] : ''}/>
              <TextInput id="ageNum" title="Возраст" type="text" placeholder={candidate?.ageNum} defaultValue={candidate?.ageNum} />
              </div>
             <div>
              <label htmlFor="status">
                <div>Статус</div>
                <select className="select w-full max-w-xs select-success select-xs" id="status" name="status"
                  defaultValue={candidate?.status}>
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
              <TextInput id='cardNumber' title='Номер счёта' type="text" defaultValue={candidate?.cardNumber} />
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
                    defaultValue={candidate?.partners?._id}
                    id="partners" name="partners" >
                    <option disabled value={null}>Выберите заказчика</option>
                    {partners.map(p => (
                      <option key={p._id} value={p._id}>{p.name} - {p.companyName}</option>
                    ))}
                  </select>
                </label>
                <select className="select w-full max-w-xs select-success select-xs" id="statusFromPartner" name="statusFromPartner"
                  defaultValue={candidate?.statusFromPartner?.status}>
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
                <div className='flex gap-1 items-center  w-full'>
                  <TextInput id='from' title='С' type="date" defaultValue={candidate?.statusFromPartner?.from} />
  
                  <TextInput id='to' title='До' type="date" defaultValue={candidate?.statusFromPartner?.to} />
                </div>
              </label>
              <div>
                {candidate?.statusFromPartner?.dismissalDate ? <p>Дата увольнения: {candidate.statusFromPartner.dismissalDate.slice(0, 10)}</p> : ''}
              </div>
              <button type="button" className="btn btn-xs btn-accent" onClick={handleDismissalClick}>Добавить дату Уволенения
              </button>
  
              {showDismissalDate && (
                <div>
                  <TextInput id='dismissalDate' title='Дата увольнения' type="date" defaultValue={candidate?.dismissalDate} />
  
                </div>
              )}
                            <TextInput id='leaving' title='Готов выехать' type="date" defaultValue={candidate?.leaving ? candidate.leaving.split('T')[0] : ''} />
                            <TextInput id='dateArrival' title='Приехал на объект' type="date" defaultValue={candidate?.dateArrival ? candidate.dateArrival.split('T')[0] : ''} />
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
                      defaultValue={candidate?.citizenship} >
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
            defaultValue={candidate?.manager?._id}
            name="manager" id="manager">
            <option disabled selected value={null}>Выберите менеджера</option>
            {managers.map(m => (
              <option key={m._id} value={m._id}>{m?.name}</option>
            ))}
          </select>
        </label>
              <label htmlFor="locations">
                <div>Местоположение кандидата- {candidate?.locations}</div>
                <div>
                  <div className='flex gap-1'>
                    {countries && (
                      <select className="select w-full max-w-xs select-success select-xs" defaultValue={candidate?.location} onChange={(e) => fetchCities(e.target.value)} >
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
                <input type="hidden" name="locations" id='locations' value={combinedLocation} defaultValue={candidate?.combinedLocation} />
              </label>
              <label className='flex gap-1 items-end' htmlFor="langue">
                <div className='flex flex-col justify-between h-full'>
                  <div>Знание языка</div>
                  <select className="select w-full max-w-xs select-success select-xs" id="langue" name="langue" defaultValue={candidate?.langue?.name}>
                    <option disabled selected value={null}>Знание языка</option>
                    <option>Не знает языков</option>
                    <option >Английский</option>
                    <option >Немецкий</option>
                    <option >Польский</option>
                  </select>
                </div>
                <div className='flex flex-col justify-between  h-full'>
                  <div>Уровень</div>
                  <select className="select w-full max-w-xs select-success select-xs" id="langueLvl" name="langueLvl" defaultValue={candidate?.langue?.level} onChange={(e) => handleLangueChange('level', e.target.value || '')}>
                    <option disabled selected value={null}>Уровень знание языка</option>
                    <option >Уровень А1</option>
                    <option >Уровень А2</option>
                  </select>
                </div>
              </label>
              <div>
                <label htmlFor="drivePermis">
                  <div>
                    <h3>Категории В/У {candidate?.drivePermis}</h3>
                    <MultiSelect
                      className="w-[300px]"
                      options={drivePermis}
                      value={selectedDrive}
                      onChange={setSelectedDrive}
                      labelledBy="drivePermis"
                    />
                  </div>
                </label>
  
              </div>
              <label htmlFor="comment">
            <div>Комментарий</div>
            <div>
            <ul>
                                {candidate?.comment?.map((c, index) => (
                                  <li key={index}>
                                   
                                    <div className="flex justify-between w-full pt-5">
                                        <p>
                                          {new Date(c.date).toLocaleString().slice(0, 5)}
                                        </p>
                                        <span>
                                          {new Date(c.date).toLocaleString().slice(12, 17)}
                                        </span>
                                      </div>
                                      {c.text} 
                                  </li>
                                ))}
                              </ul>
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
        </form>
      </>
    );
//     return (
//         <>
//         <div className="">
//             <h1 className="font-bold py-10 text-2xl">Обновить кандидата</h1>
//         </div>
//         <form onSubmit={handleSubmit} >
//         <div className='grid grid-cols-3'>
//           <div className='grid justify-start items-stretch content-space-evenly '>
//           <label htmlFor="name">
//           <div>Имя</div>
//         <input className="input input-bordered input-accent w-full max-w-xs"
//  id="name" name="name" type="text" placeholder={candidate?.name} defaultValue={candidate?.name}
//  required />
//           </label>
//           <label htmlFor="age">
             
//               <div className='flex gap-1'>
//                 <label htmlFor="age">
//                   <div>Дата рождения</div>
//                   <input className="input input-bordered input-accent w-full max-w-xs" 
//                   id="age" name="age" type="date"
//                   placeholder={candidate?.age} defaultValue={candidate?.age}  />
//                 </label>
//                 <label htmlFor="ageNum">
//                   <div>Возраст</div>
//                   <input className="input input-bordered input-accent w-full max-w-xs" 
//                   id="ageNum" name="ageNum" type="text" 
//                   placeholder={candidate?.ageNum} defaultValue={candidate?.ageNum} />
//                 </label>
//               </div>
              
//             </label>
//             <label htmlFor="phone">
//   <div>Телефон</div>
// <input className="input input-bordered input-accent w-full max-w-xs"
//          id="phone" name="phone" type="text" placeholder="+373696855446" defaultValue={candidate?.phone} />
//                 <button type="button" className="btn btn-accent" onClick={addAdditionalPhone}><strong>+</strong></button>
//         </label>
//         {showAdditionalPhone && (
//               <>
//                 {additionalPhones.map((phone, index) => (
//                   <div key={index}>
//                     <label htmlFor={`additionalPhone${index}`}>
//                       <div>Доп. Телефон {index + 1}</div>
//                       <input
//                         className="input input-bordered input-accent w-full max-w-xs"
//                         id={`additionalPhone${index}`}
//                         name={`additionalPhone${index}`}
//                         type="phone"
//                         placeholder={phone}
//                         value={phone}
//                         onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
//                         required
//                       />
//                     </label>
//                     <button type="button" onClick={() => removeAdditionalPhone(index)}>Удалить</button>
//                   </div>
//                 ))}
//                 <button type="button" onClick={addAdditionalPhone}>Добавить ещё один доп. телефон</button>
//               </>
//             )}


//           <label htmlFor="locations">
//   <div>Местоположение - {candidate?.locations}</div>
//          <div>
//           <div className='flex gap-1'>
//           {countries && (
//         <select className="select w-full max-w-xs" defaultValue={candidate?.location}  onChange={(e) => fetchCities(e.target.value)} >
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
//         <select className="select w-full max-w-xs" onChange={handleCityChange} value={singleCity}>
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
//     <input type="hidden" name="locations" id='locations' value={combinedLocation} defaultValue={candidate?.combinedLocation}/>

//         </label>
//         <label className='flex gap-1 items-end' htmlFor="langue">
//           <div className='flex flex-col justify-between h-full'>
//           <div>Знание языка</div>
//           <select className="select w-full max-w-xs" id="langue" name="langue" defaultValue={candidate?.langue?.name}>
//           <option disabled selected value={null}>Знание языка</option>
//         <option>Не знает языков</option>
//         <option >Английский</option>
//         <option >Немецкий</option>
//         <option >Польский</option>
//         </select>
//           </div>
//           <div className='flex flex-col justify-between  h-full'>
//           <div>Уровень</div>
//           <select className="select w-full max-w-xs" id="langueLvl" name="langueLvl" defaultValue={candidate?.langue?.level} onChange={(e) => handleLangueChange('level', e.target.value || '')}>
//           <option disabled selected value={null}>Уровень знание языка</option>
//         <option >Уровень А1</option>
//         <option >Уровень А2</option>
//         </select>
//           </div>
//         </label>
//         <label htmlFor="status">
//             <div>Статус</div>
//           <select className="select w-full max-w-xs" id="status" name="status"
//             defaultValue={candidate?.status}>
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
//               <select className="select w-full max-w-xs"
//               defaultValue={candidate?.partners?._id}  
//           id="partners" name="partners" >
//          <option disabled  value={null}>Выберите заказчика</option>
//           {partners.map(p => (
//             <option key={p._id} value={p._id}>{p.name} - {p.companyName}</option>
//           ))}
//               </select>
//               </label>
              
//               <select className="select w-full" id="statusFromPartner" name="statusFromPartner" 
//               defaultValue={candidate?.statusFromPartner?.status}>
//                 {statuses.map(status => (
//                   <option key={status.value} value={status.value}>{status.label}</option>
//                 ))}
//               </select>
//               <div className='flex gap-1 items-center justify-between'>
//                 <p>С</p>
//               <input className="input input-bordered input-accent w-full max-w-xs" 
//            type="date" id="from" name="from" 
//            defaultValue={candidate?.statusFromPartner?.from}/>
//                 </div>
//                 <div className='flex gap-1 items-center justify-between'>
//                 <p>До</p>
//               <input className="input input-bordered input-accent w-full max-w-xs" 
//             type="date"  id='to' name='to' 
//             defaultValue={candidate?.statusFromPartner?.to}/>
//                 </div>
//             </label>
//            <div>
             
//               </div>
//               <button type="button" className="btn btn-accent" onClick={handleDismissalClick}>Добавить дату Уволенения
//         </button>
        
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
//               />
//             </label>
//           </div>
//         )}
//         <div>
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
//         <label htmlFor="leaving">
//         <div>Готов выехать<br />{candidate?.leaving ? candidate?.leaving.slice(0, 10) : ''}</div>
//             <input className="input input-bordered input-accent w-full max-w-xs" 
//             type="date"  id='leaving' name='leaving' />
//             </label>
//             <label htmlFor="dateArrival">
//               <div>Приехал на объект<br />{candidate?.dateArrival ? candidate?.dateArrival.slice(0, 10) : ''}</div>
//             <input className="input input-bordered input-accent w-full max-w-xs" 
//             type="date"  id='dateArrival' name='dateArrival' />
//             </label>
//         </div>
//         <label htmlFor="manager">
//           <div>Менеджер</div>
//         <select className="select w-full max-w-xs"  
//           defaultValue={candidate?.manager?._id}
//           name="manager" id="manager">
//          <option disabled selected value={null}>Выберите менеджера</option>
//           {managers.map(m => (
//             <option key={m._id} value={m._id}>{m?.name}</option>
//           ))}
//         </select>
//         </label>
//         <label htmlFor="cardNumber" className=" w-full max-w-xs">
//           <div>Номер счёта</div>
//         <input className="input input-bordered input-accent w-full max-w-xs"
//          id="cardNumber" name="cardNumber" type="text" placeholder="Номер счёта" defaultValue={candidate?.cardNumber} />
//         </label>
//           </div>
//           <div className='grid justify-start items-stretch content-space-evenly '>
//         <label htmlFor="professions">
//         <div>
//         <h3>Профессии</h3>
//       <button className="btn btn-outline btn-success mt-3 btn-xs w-full" type="button" onClick={addProfessionEntry}>Добавить профессию</button>

//       </div>
//      {/* <div>{renderProfessions(candidate?.professions)}</div> */}
//         {professionEntries.map((prof, index) => (
//   <div key={index} className='flex flex-col w-full max-w-xs gap-1'>
//     <label htmlFor="profession">
//       <select className="select w-full max-w-xs" value={prof.name || ''} onChange={e => handleProfessionChange(index, 'name', e.target.value || '')}>
//       <option value={null} disabled selected>Выберите профессию</option>
//       <option>Нет профессии</option>
//         {professions.map(profession => (
//           <option key={profession._id} value={profession.name}>{profession.name}</option>
//         ))}
//       </select>
//     </label>
//     <label htmlFor="experience">
//       <div>Опыт работы</div>
//       <select className="select select-accent w-full max-w-xs" value={prof.experience || ''} onChange={e => handleProfessionChange(index, 'experience', e.target.value || '')}>
//         <option disabled selected value={null}>Опыт работы</option>
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
        
//           </div>
//           <div className='grid justify-start items-stretch content-space-evenly '>
//           <label htmlFor="documents" className='flex flex-col '>
//         <div>
//         <label htmlFor="citizenship">
//             <div>Гражданство</div>
//           <select className="select w-full max-w-xs"
//            id="citizenship" name="citizenship"
//            defaultValue={candidate?.citizenship} >
//           <option disabled selected value={null}>Укажите гражданство</option>
//           <option>Не известно</option>
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
//           <h3>Документы</h3>
//         <button className="btn btn-outline btn-success mt-3 btn-xs" type="button" onClick={addDocumentEntry}>Добавить документ</button>

//         </div>
//         {documentEntries.map((doc, index) => (
//           <div key={index} className='flex flex-col w-full max-w-xs gap-1'>
//             <label htmlFor="nameDocument">
//               <div>Название документа</div>
//             <select  className="select w-full max-w-xs" value={doc.docType || ''} onChange={e => handleDocumentChange(index, 'docType', e.target.value || '')}>
//              <option  value={null}>Выберите документ</option>
//              <option value="Виза">Виза</option>
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
//             type="date" 
//             value={doc.dateOfIssue} onChange={e => handleDocumentChange(index, 'dateOfIssue', e.target.value)} />
//             </label>
//             <label htmlFor="documDate">
//               <div>До какого числа</div>
//             <input className="input input-bordered input-accent w-full max-w-xs" 
//             type="date" 
//             value={doc.dateExp} onChange={e => handleDocumentChange(index, 'dateExp', e.target.value)} />
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
//           </div>
//         </div>
//         <div>
//   <h3>Существующие комментарии</h3>
//   <ul >
//     {candidate?.comment?.map((c, index) => (
//       <li key={index}>{c.text} - {new Date(c.date).toLocaleString()}</li>
//     ))}
//   </ul>
// </div>
// <label htmlFor="comment">
//   <div>Комментарий</div>
//   <textarea className="textarea textarea-accent w-full"
//     id="comment" name="comment" placeholder="Комментарий" />
// </label>
//         {/* <label htmlFor="comment">
//           <div>Комментарий</div>
//         <textarea className="textarea textarea-accent w-full "
//          id="comment" name="comment" placeholder="Комментарий" 
//          defaultValue={candidate?.comment}/>
//         </label> */}
//             <button className="btn btn-primary w-full max-w-xs">
//                Обновить кандидата
//             </button>
//         </form>
//         </>
//     );
}
