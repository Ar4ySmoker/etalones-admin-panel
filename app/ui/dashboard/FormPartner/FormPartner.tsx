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

export default function FormPartner({ manager }) {
 
  const [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
  const [selectedDrive, setSelectedDrive] = useState([]);
  const [contract, setContract] = useState({ type: "", sum: ""});

  const handleLangueChange = (field, value) => {
    setLangue(prevLangue => ({ ...prevLangue, [field]: value }));
  };
  const handleContractChange = (field, value) => {
    setContract(prevContract => ({ ...prevContract, [field]: value }));
  };
  

  // const fetchCountries = async () => {
  //   let country = await Axios.get(
  //     "https://countriesnow.space/api/v0.1/countries"
  //   );
  // };



  // useEffect(() => {
  //   fetchCountries();
  // }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const body = {
      name: formData.get('name') || '',
      phone: formData.get('phone') || '',
      email: formData.get('email') || '',
      site: formData.get('site') || '',
      companyName: formData.get('companyName') || '',
      numberDE: formData.get('numberDE') || 0,
     
      manager: formData.get('manager') || null,
      contract: {
        type: formData.get('contractType') || '',
        sum: formData.get('contractSum') || '',
      },
      status: formData.get('status') || '',
      drivePermis: selectedDrive.map(d => d.value).join(', '),
      leaving: formData.get('leaving') || '',
      langue: {
        name: formData.get('langue') || '',
        level: formData.get('langueLvl') || ''
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
            <label htmlFor="contract" className='bg-slate-200 my-3'>
              <div>Контракт</div>
              <div >
                <div>Тип контракта</div>
                <select className="select w-full max-w-xs" id="contractType" name="contractType" value={contract.type} onChange={(e) => handleContractChange('type', e.target.value)}>
  <option disabled selected value={""}>Выберите тип контракта</option>
  <option>Не можем договорится</option>
  <option>Почасовый</option>
  <option>От объёма</option>
  <option>Налог</option>
</select>

              </div>
              <div>
                <div>Стоимость контарка</div>
                <input className="input input-bordered input-accent w-full max-w-xs"
                id="contractSum" name="contractSum" type="text" placeholder="20 euro" /> </div>

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
              <input className="accent w-full max-w-xs" type="number" id='workHours' name='workHours' />
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
