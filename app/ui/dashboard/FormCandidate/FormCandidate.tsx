'use client'
import React, { useState } from 'react';
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

export default function Form({ professions, locations, langue, status, manager }) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting with documents:', documentEntries);
    const formData = new FormData(event.target);
    const body = {
      name: formData.get('name'),
      age: formData.get('age'),
      phone: formData.get('phone'),
      profession: formData.get('profession'),
      locations: formData.get('locations'),
      documents: documentEntries,
      experience: formData.get('experience'),
      drivePermis: formData.get('drivePermis'),
      leaving: formData.get('leaving'),
      cardNumber: formData.get('cardNumber'),
      workHours: formData.get('workHours'),
      langue: formData.get('langue'),
      status: formData.get('status'),
      manager: formData.get('manager'),
      comment: formData.get('comment')
    };

    try {
      const response = await fetch('/api/addCandidate', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (response.ok) {
        console.log('User created:', result);
      } else {
        console.error('Failed to create user:', result);
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
        <label htmlFor="profession" className='flex flex-col '>
  Профессия
<select className="select w-full max-w-xs " id="profession" name="profession">
          {professions.map(profession => (
            <option  key={profession._id} value={profession._id}>{profession.name}</option>
          ))}
        </select>
        </label>        
        <label htmlFor="locations">
  <div>Город</div>
        <select id="locations" name="locations" className="select w-full max-w-xs">
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
            <button className="btn btn-outline btn-error" type="button" onClick={() => removeDocumentEntry(index)}>Удалить документ</button>
          </div>
        ))}
        <button className="btn btn-outline btn-success mt-3" type="button" onClick={addDocumentEntry}>Добавить документ</button>
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
