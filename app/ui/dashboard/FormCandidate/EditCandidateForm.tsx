"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import { MultiSelect } from "react-multi-select-component";

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
  { label: "Уволен", value: "Уволен"},
]

export default function EditCandidateForm({ id, candidate, managers, professions }) {
  let [countries, setCountries] = useState([]);
  let [singleCountry, setSingleCountry] = useState("");
  let [Cities, setCities] = useState([]);
  let [singleCity, setSingleCity] = useState("");
  let [combinedLocation, setCombinedLocation] = useState(""); 
  let [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
  let [statusFromPartner, setStatusFromPartner] = useState({ status: "Не трудоустроен", who: "" });
  const [selectedDrive, setSelectedDrive] = useState([]);
  const [selectedStatusP, setSelectedStatusP] = useState([]);

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
  
  const renderProfessions = (professions) => {
    if (!professions || professions.length === 0) {
      return "нет профессий";
    }
    return professions.map((prof, index) => (
      <p key={index} className='flex flex-col'>
        <p>{prof.name}</p>
        <small>{prof.experience}</small>
      </p>
    ));
  };
 
    const router = useRouter();
    const [professionEntries, setProfessionEntries] = useState(candidate.professions || []);
    
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

        const body = {
          name: formData.get('name') || candidate.name, // Добавляем проверку на пустое значение
          age: formData.get('age') || candidate.age,
          ageNum: formData.get('ageNum') || candidate.ageNum,
          phone: formData.get('phone') || candidate.phone,
          professions: professionEntries.length ? professionEntries.filter(profession => profession.name.trim() !== '' || profession.experience.trim() !== '') : candidate.professions,
          locations: combinedLocation || candidate.locatons,
          documents: documentEntries.length ? documentEntries.filter(document => document.docType.trim() !== '' || document.dateExp.trim() !== '' || document.dateOfIssue.trim() !== '' || document.numberDoc.trim() !== '') : candidate.documents,
          drivePermis: selectedDrive.map(d => d.value).join(', ') || candidate.drivePermis,
          leaving: formData.get('leaving') || candidate.leaving,
          dateArrival: formData.get('dateArrival') || candidate.dateArrival,
          cardNumber: formData.get('cardNumber') || candidate.cardNumber,
          // workHours: formData.get('workHours') || candidate.workHours,
          langue: {
            name: formData.get('langue') || candidate.langue.name,
            level: formData.get('langueLvl') || candidate.langue.Lvl },
          status: formData.get('status') || candidate.status,
          citizenship: formData.get('citizenship') || candidate.citizenship,
          statusFromPartner:{
            status: selectedStatusP.map(s => s.value).join(', ')  || candidate.statusFromPartner.status,
            who: formData.get('who') || candidate.statusFromPartner.who
          },
          manager: formData.get('manager') || candidate.manager,
          comment: formData.get('comment') || candidate.comment };
        try {
            // const res = await fetch(`http://localhost:3000/api/candidates/${id}`, {
              const res = await fetch(`https://www.candidat.store/api/candidates/${id}`, {

            method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body),
            });
 
            if (!res.ok) {
                throw new Error("Failed to update Candidate");
            }
 
            router.refresh();
            router.push("/dashboard/candidates");
        } catch (error) {
            console.log(error);
        }
    };
 
    return (
        <>
        <div className="">
            <h1 className="font-bold py-10 text-2xl">Update Candidate</h1>
        </div>
        <form onSubmit={handleSubmit} >
        <div className='grid grid-cols-3'>
          <div className='grid justify-start items-stretch content-space-evenly '>
          <label htmlFor="name">
          <div>Имя</div>
        <input className="input input-bordered input-accent w-full max-w-xs"
 id="name" name="name" type="text" placeholder={candidate.name} defaultValue={candidate.name}
 required />
          </label>
          <label htmlFor="age">
             
              <div className='flex gap-1'>
                <label htmlFor="age">
                  <div>Дата рождения</div>
                  <input className="input input-bordered input-accent w-full max-w-xs" 
                  id="age" name="age" type="date"
                  placeholder={candidate.age} defaultValue={candidate.age}   />
                </label>
                <label htmlFor="ageNum">
                  <div>Возраст</div>
                  <input className="input input-bordered input-accent w-full max-w-xs" 
                  id="ageNum" name="ageNum" type="text" 
                  placeholder={candidate.ageNum} defaultValue={candidate.ageNum} />
                </label>
              </div>
              <div >
              {candidate.age ? new Date(candidate.age).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
              </div>
            </label>
          <label htmlFor="phone">
            <div className="label">
    <span className="label-text">Номер телефона</span>
            </div>
            <input  id="phone" name="phone"
            defaultValue={candidate.phone}
             placeholder={candidate.phone}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
            </label>
          <label htmlFor="locations">
  <div>Местоположение - {candidate.locations}</div>
         <div>
          <div className='flex gap-1'>
          {countries && (
        <select className="select w-full max-w-xs" defaultValue={candidate.location}  onChange={(e) => fetchCities(e.target.value)} >
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
    <input type="hidden" name="locations" id='locations' value={combinedLocation} defaultValue={candidate.combinedLocation}/>

        </label>
        <label className='flex gap-1 items-end' htmlFor="langue">
          <div className='flex flex-col justify-between h-full'>
          <div>Знание языка</div>
          <select className="select w-full max-w-xs" id="langue" name="langue" defaultValue={candidate.langue}>
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
        </select>
          </div>
        </label>
        <label htmlFor="status">
            <div>Статус</div>
          <select className="select w-full max-w-xs" id="status" name="status"  defaultValue={candidate.status}>
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
        <label className='flex gap-1 items-end' htmlFor="statusFromPartner">
          <div className='flex flex-col justify-between h-full'>
          <div>Статус трудоустройства</div>
          <MultiSelect
          className='w-[250px]'
        options={statuses}
        value={selectedStatusP}
        onChange={setSelectedStatusP}
        labelledBy="statusFromPartner"
      />
          {/* <select className="select w-full max-w-xs" id="statusFromPartner" name="statusFromPartner" 
          defaultValue={candidate.statusFromPartner.status}
          onChange={(e) => handleStatusFromPartnerChange('status', e.target.value || '')}
          >
          <option disabled selected value={null}>Статус Трудоустройства</option>
        <option>Не трудоустроен</option>
        <option >Трудоустроен</option>
        <option >В отпуске</option>
        <option >Уволен</option>
        </select> */}
          </div>
          <div className='flex flex-col justify-between  h-full'>
          <div>Заказчик</div>
          <select className="select w-full max-w-xs" id="who" name="who" 
          defaultValue={candidate.statusFromPartner.who}  value={statusFromPartner.who || ''} 
          onChange={(e) => handleStatusFromPartnerChange('who', e.target.value || '')}>
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
        <div>
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
        <div>Готов выехать<br />{candidate.leaving ? candidate.leaving.slice(0, 10) : ''}</div>
            <input className="input input-bordered input-accent w-full max-w-xs" 
            type="date"  id='leaving' name='leaving' />
            </label>
            <label htmlFor="dateArrival">
              <div>Приехал на объект<br />{candidate.dateArrival ? candidate.dateArrival.slice(0, 10) : ''}</div>
            <input className="input input-bordered input-accent w-full max-w-xs" 
            type="date"  id='dateArrival' name='dateArrival' />
            </label>
        </div>
        <label htmlFor="manager">
          <div>Менеджер</div>
        <select className="select w-full max-w-xs"  
          defaultValue={candidate.manager}
          name="manager" id="manager">
         <option disabled selected value={null}>Выберите менеджера</option>
          {managers.map(m => (
            <option key={m._id} value={m._id}>{m.name}</option>
          ))}
        </select>
        </label>
        <label htmlFor="cardNumber" className=" w-full max-w-xs">
          <div>Номер счёта</div>
        <input className="input input-bordered input-accent w-full max-w-xs"
         id="cardNumber" name="cardNumber" type="text" placeholder="Номер счёта" defaultValue={candidate.cardNumber} />
        </label>
          </div>
          <div className='grid justify-start items-stretch content-space-evenly '>
        <label htmlFor="professions">
        <div>
        <h3>Профессии</h3>
      <button className="btn btn-outline btn-success mt-3 btn-xs w-full" type="button" onClick={addProfessionEntry}>Добавить профессию</button>

      </div>
     <div>{renderProfessions(candidate.professions)}</div>
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
        <option disabled selected value={null}>Опыт работы</option>
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
          <div className='grid justify-start items-stretch content-space-evenly '>
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
            type="date" 
            value={doc.dateOfIssue} onChange={e => handleDocumentChange(index, 'dateOfIssue', e.target.value)} />
            </label>
            <label htmlFor="documDate">
              <div>До какого числа</div>
            <input className="input input-bordered input-accent w-full max-w-xs" 
            type="date" 
            value={doc.dateExp} onChange={e => handleDocumentChange(index, 'dateExp', e.target.value)} />
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
         id="comment" name="comment" placeholder="Комментарий" 
         defaultValue={candidate.comment}/>
        </label>
            <button className="btn btn-primary w-full max-w-xs">
                Update Candidate
            </button>
        </form>
        </>
    );
}
