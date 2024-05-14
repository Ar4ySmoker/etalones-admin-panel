'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Form({ professions, locations, langue, status, manager }) {
  const router = useRouter();

  const [documentEntries, setDocumentEntries] = useState([]);

  const addDocumentEntry = () => {
    setDocumentEntries([...documentEntries, { docType: '', dateExp: '', numberDoc: '' }]);
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
    setProfessionEntries([...professionEntries, { name: '', experience: '' }]);
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
    console.log('Submitting with documents:', documentEntries);
    console.log('Submitting with PROFESSIONS:', professionEntries);

    const formData = new FormData(event.target);
    
    const body = {
      name: formData.get('name'),
      age: formData.get('age'),
      phone: formData.get('phone'),
      professions: professionEntries,
      locations: formData.get('locations'),
      documents: documentEntries,
      drivePermis: formData.get('drivePermis'),
      leaving: formData.get('leaving'),
      cardNumber: formData.get('cardNumber'),
      workHours: formData.get('workHours'),
      langue: formData.get('langue'),
      status: formData.get('status'),
      manager: formData.get('manager'),
      comment: formData.get('comment')
    };
    console.log('Submitting with professions:', professionEntries); // Проверка отправляемых данных

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
        console.error('Failed to create candidate:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}  >
        <div className='grid grid-cols-3'>
        <div className='grid justify-start items-stretch content-space-evenly '>
        <label htmlFor="name">
          <div>Имя</div>
        <input className="input input-bordered input-accent w-full max-w-xs"
 id="name" name="name" type="text" placeholder="Сергей" required />
        </label>
        <label htmlFor="age">
  <div>Возраст</div>
<input className="input input-bordered input-accent w-full max-w-xs"
         id="age" name="age" type="text" placeholder="32 года" />
        </label>
        <label htmlFor="phone">
  <div>Телефон</div>
<input className="input input-bordered input-accent w-full max-w-xs"
         id="phone" name="phone" type="text" placeholder="+373696855446" required />
        </label>
        
        
      
        <label htmlFor="locations">
  <div>Город</div>
        <select id="locations" name="locations" className="select w-full max-w-xs">
         <option value="Город" disabled selected>Выберите Город</option>
          {locations.map(location => (
            <option key={location._id} value={location._id}>{location.name}</option>
          ))}
        </select>
        </label>
        <label htmlFor="langue">
          <div>Знание языка</div>
          <select className="select w-full max-w-xs" id="langue" name="langue">
          {langue.map(l => (
            <option key={l._id} value={l._id}>{l.name}</option>
          ))}
        </select>
        </label>
        <label htmlFor="status">
            <div>Статус</div>
          <select className="select w-full max-w-xs" id="status" name="status">
          {status.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
        </label>
        <label htmlFor="manager">
          <div>Менеджер</div>
        <select className="select w-full max-w-xs" id="manager" name="manager">
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
        <div className='grid justify-center items-stretch content-space-evenly '>
        <label htmlFor="professions">
        {professionEntries.map((prof, index) => (
  <div key={index} className='flex flex-col w-full max-w-xs gap-1'>
    <label htmlFor="profession">
      <div>Профессии</div>
      <select className="select w-full max-w-xs" value={prof.name} onChange={e => handleProfessionChange(index, 'name', e.target.value)}>
      <option value="Профессия" disabled selected>Выберите профессию</option>
        {professions.map(profession => (
          <option key={profession._id} value={profession.name}>{profession.name}</option>
        ))}
      </select>
    </label>
    <label htmlFor="experience">
      <div>Опыт работы</div>
      <select className="select select-accent w-full max-w-xs" value={prof.experience} onChange={e => handleProfessionChange(index, 'experience', e.target.value)}>
        <option disabled selected value={"Опыт работы"}>Опыт работы</option>
        <option >Меньше года</option>
        <option >От 2-х лет</option>
        <option >Более 10-ти лет</option>
      </select>
    </label>
    <button className="btn btn-outline btn-error btn-xs" type="button" onClick={() => removeProfessionEntry(index)}>Удалить профессию</button>
  </div>
))}
<button className="btn btn-outline btn-success mt-3 btn-xs w-full" type="button" onClick={addProfessionEntry}>Добавить профессию</button>
        </label>
        </div>
        <div className='grid justify-center items-stretch content-space-evenly '>
        <label htmlFor="documents" className='flex flex-col '>
        <div>Документы</div>
        {documentEntries.map((doc, index) => (
          <div key={index} className='flex flex-col w-full max-w-xs gap-1'>
            <label htmlFor="nameDocument">
              <div>Название документа</div>
            <select className="select w-full max-w-xs" value={doc.docType} onChange={e => handleDocumentChange(index, 'docType', e.target.value)}>
              <option value="Виза">Виза</option>
              <option value="Песель">Песель</option>
              <option value="Паспорт">Паспорт</option>
              <option value="Карта побыту">Карта побыту</option>
            </select>
            </label>
            
            <label htmlFor="documDate">
              <div>До какаого числа</div>
            <input className="accent w-full max-w-xs" type="date" value={doc.dateExp} onChange={e => handleDocumentChange(index, 'dateExp', e.target.value)} />
            </label>
            <label htmlFor="nunberDoc">
              <div>Номер документа</div>
            <input className="input input-bordered input-accent w-full max-w-xs" type="text" value={doc.numberDoc} onChange={e => handleDocumentChange(index, 'numberDoc', e.target.value)} />
            </label>
            <button className="btn btn-outline btn-error btn-xs" type="button" onClick={() => removeDocumentEntry(index)}>Удалить документ</button>
          </div>
        ))}
        <button className="btn btn-outline btn-success mt-3 btn-xs" type="button" onClick={addDocumentEntry}>Добавить документ</button>
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
