"use client";
 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import TextInput from "../../inputs/TextInput/TextInput";

const drivePermis = [
    { label: "В", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "Код 95", value: "Код 95" },
  ];

export default function EditPartnerForm({ id, professions, partner, managers}) {
  let [countries, setCountries] = useState([]);
  let [singleCountry, setSingleCountry] = useState("");
  let [Cities, setCities] = useState([]);
  let [singleCity, setSingleCity] = useState("");
  let [combinedLocation, setCombinedLocation] = useState("");  
  let [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
  const [selectedDrive, setSelectedDrive] = useState([]);
  // const [contract, setContract] = useState({ typeC: "", sum: ""});
  const [fileContract, setFileContract] = useState(null);
  // const [fileFirma, setFileFirma] = useState(null);


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
  // const handleContractChange = (field, value) => {
  //   setContract(prevContract => ({ ...prevContract, [field]: value }));
  // };
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
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const [professionEntries, setProfessionEntries] = useState(partner?.professions || []);

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
  

    const handleSubmit = async (e) => {
        e.preventDefault();
            const formData = new FormData(e.target);
            if (fileContract) {
              formData.append("fileContract", fileContract);
          }
          // if (fileFirma) {
          //     formData.append("fileFirma", fileFirma);
          // }
            const body = {
                name: formData.get('name') || partner.name,
                phone: formData.get('phone') || partner.phone,
                professions: professionEntries.length ? professionEntries.filter(profession => profession.name.trim() !== '' || profession.experience.trim() !== '') : partner.professions,
                email: formData.get('email') || partner.email,
                site: formData.get('site') || partner.site,
                rentPrice: formData.get('rentPrice') || partner.rentPrice,
                avans: formData.get('avans') || partner.avans,
                workwear: formData.get('workwear') || partner.workwear,
                workHours: formData.get('workHours') || partner.workHours,
                companyName: formData.get('companyName') || partner.companyName,
                location: combinedLocation || partner.locatons,
                numberDE: formData.get('numberDE') || partner.numberDE,
                manager: formData.get('manager') || partner.manager,
                contract: {
                  typeC: formData.get('typeC') || partner.contract?.typeC,
                  sum: formData.get('sum') || partner.contract?.sum,
                  salaryWorker: formData.get('salaryWorker') || partner.contract?.salaryWorker,

                },
                status: formData.get('status') || partner.status,
                drivePermis: selectedDrive.map(d => d.value).join(', ') || partner.drivePermis,
                leaving: formData.get('leaving') || partner.leaving,
                langue: {
                  name: formData.get('langue') || partner.langue?.name,
                  level: formData.get('level') || partner.langue?.level
                },
                comment: formData.get('comment') || partner.comment
              };
        try {
            const res = await fetch(`https://www.candidat.store/api/partners/${id}`, {
              // const res = await fetch(`http://localhost:3000/api/partners/${id}`, {
  
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
          <label htmlFor="file">
<div>Загрузите файл контракта</div>
        <input
            className="file-input file-input-bordered  w-full max-w-xs"
                    type='file'
                    name='fileContract'
                    onChange={(e) => setFileContract(e.target.files?.[0])}
                />
        </label>

            <div className='grid grid-cols-2'>
              <div className='grid justify-start items-stretch content-space-evenly '>
              <label htmlFor="manager">
                  <div>Менеджер</div>
                  <select className="select w-full max-w-xs" id="manager" name="manager" defaultValue={partner?.manager?._id}>
                    <option disabled selected value={null}>Выберите менеджера</option>
                    {managers.map(m => (
                      <option key={m._id} value={m._id}>{m.name}</option>
                    ))}
                  </select>
                </label>
                <TextInput id='name' title='Имя' placeholder={partner?.name} defaultValue={partner?.name}/>
                <TextInput id='phone' title='Телефон' defaultValue={partner?.phone}/>
                <TextInput id='companyName' title='Название фирмы' defaultValue={partner?.companyName}/>
                <TextInput id='numberDE' title='Номер DE' defaultValue={partner?.numberDE}/>

                
                <label htmlFor="locations">
  <div>Местоположение - {partner?.location}</div>
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
        <TextInput id='email' title='Почта' defaultValue={partner?.email}/>
        <TextInput id='rentPrice' title='Цена проживания' defaultValue={partner?.rentPrice}/>
        <TextInput id='avans' title='Когда может дать аванс' defaultValue={partner?.avans}/>
        <TextInput id='workwear' title='Спецодежда' defaultValue={partner?.workwear}/>
        <TextInput id='site' title='Сайт' defaultValue={partner?.site}/>

                
                <label htmlFor="contract" className=' my-3'>
              <div>Контракт</div>
              <div >
                <div>Тип контракта</div>
                <select className="select w-full max-w-xs" id="typeC" name="typeC" 
                defaultValue={partner?.contract?.typeC}  
                // onChange={(e) => handleContractChange('typeC', e.target.value)}
                >
  <option disabled selected value={null}>Выберите тип контракта</option>
  <option>Не можем договорится</option>
  <option>Одноразка</option>
  <option>Не работает с Польскими фирмами</option>
  <option>Есть своя Польская фирма</option>
  <option>Почасовый</option>
  <option>От объёма</option>
  <option>Налог</option>
</select>
              </div>
<TextInput id='sum' title='Стоимость контарка' defaultValue={partner?.contract?.sum}/>
<TextInput id='salaryWorker' title='Зарплата работника' defaultValue={partner?.contract?.salaryWorker}/>
              <div>
             </div>

            </label>
                <label htmlFor="status">
                  <div>Статус</div>
                  <select className="select w-full max-w-xs" id="status" name="status" 
                  defaultValue={partner?.status}>
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
                    <h3>Требуется В/У кат. - было выбранно {partner?.drivePermis}</h3>
                    <MultiSelect
                      options={drivePermis}
                      value={selectedDrive}
                      onChange={setSelectedDrive}
                      labelledBy="drivePermis"
                    />
                  </div>
                </label>
                <TextInput id='leaving' type="date" title='Готов принимать людей с:' defaultValue={formatDate(partner?.leaving)}/>
                <TextInput id='workHours' title='Даёт часы отработки' placeholder='200 часов в месяц' defaultValue={partner?.workHours}/>

              
               
                <label className='flex gap-1 items-end' htmlFor="langue">
              <div className='flex flex-col justify-between h-full'>
                <div>Знание языка</div>
                <select className="select w-full max-w-xs" id="langue" name="langue"
                defaultValue={partner?.langue?.name}>
                  <option disabled selected value={null}>Знание языка</option>
                  <option>Не знает языков</option>
                  <option>Английский</option>
                  <option>Немецкий</option>
                  <option>Польский</option>
                </select>
              </div>
              <div className='flex flex-col justify-between  h-full'>
                <div>Уровень</div>
                <select className="select w-full max-w-xs" id="level" name="level" 
                value={langue.level || ''} onChange={(e) => handleLangueChange('level', e.target.value || '')}
                defaultValue={partner?.langue?.level}>
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
            </div>
            <label htmlFor="comment">
              <div>Комментарий</div>
              <textarea className="textarea textarea-accent w-full "
                id="comment" name="comment" defaultValue={partner?.comment} />
            </label>
            <button className="btn btn-success w-full" type="submit">Обновить партнёра</button>
          </form>
        </div>
      );
}
