'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


interface ModalFormProps {
    candidate: any;
    closeModal: () => void;
}
const router = useRouter();

const generateInvoiceNumber = () => {
    return `INV-${new Date().getTime()}`;
};

const ModalForm: React.FC<ModalFormProps> = ({ candidate, closeModal }) => {
    const [totalAmount, setTotalAmount] = useState<number>(0);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const body = {
            invoiceNumber: generateInvoiceNumber(), 
            bet: formData.get('bet') || '',
            hours: formData.get('hours') || '',
          avans: formData.get('avans'),
          homePrice: formData.get('homePrice'),
          fines: {
            sum: formData.get('finesSum') || '',
            reason: formData.get('finesReason') || ''
          },
          awards: {
            sum: formData.get('awardsSum') || '',
            reason: formData.get('awardsReason') || ''
          },
          dateFrom: formData.get('dateFrom') || null,
          dateTo: formData.get('dateTo') || null, 
          status:false,
          partners: candidate.partners._id,
          manager: candidate.manager._id,
          candidate: candidate._id,
          totalAmount: formData.get('totalAmount') || ''
        };
        
    
    
        try {
          const response = await fetch('/api/saveInvoice', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });
          const result = await response.json();
          if (response.ok) {
            console.log('Candidate created:', result);
            router.refresh();
            router.push("/dashboard/workPeople");
          } else {
            // setErrorMessage(result.message); // Устанавливаем сообщение об ошибке
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      };
    return (
        <dialog open className="modal">
            <div className="modal-box">
                <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                <h3 className="font-bold text-lg">Запросить оплату</h3>
                <p className="py-2">Кандидат: {candidate.name}</p>
                <p className="py-2">Номер счёта: {candidate.cardNumber}</p>
                <div className='flex justify-between'>
                    <p className="py-2">Работает у: {candidate.partners.companyName} </p>
                    <p className="py-2">Менеджер: {candidate.manager.name}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <div>Отработал</div>
                        <div className="form-control">
                            <label className="label flex gap-1">
                                <div>С</div>
                                <input className='input input-sm input-bordered input-accent w-full max-w-xs' 
                                    type="date" name="dateFrom"  required />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label flex gap-5">
                                <div>По</div>
                                <input className='input input-sm input-bordered input-accent w-full max-w-xs' 
                                    type="date" name="dateTo"  required />
                            </label>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className="form-control">
                            <label className="label">Ставка</label>
                            <input className='input input-sm input-bordered input-accent w-full max-w-xs' 
                                type="number" name="bet"  required />
                        </div>
                        <div className="form-control">
                            <label className="label">Часы</label>
                            <input className='input input-sm input-bordered input-accent w-full max-w-xs' 
                                type="number" name="hours"  required />
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className="form-control w-max">
                            <label className="label">Цена Проживания</label>
                            <input className='input input-sm input-bordered input-accent w-full max-w-xs' 
                                type="number" name="homePrice"   />
                        </div>
                        <div className="form-control">
                            <label className="label">Аванс</label>
                            <input className='input input-sm input-bordered input-accent w-full max-w-xs' 
                                type="number" name="avans"   />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="form-control ">
                            <label className="label flex flex-col"><div>Штрафы</div>
                                <input className='input input-sm input-bordered input-accent w-full max-w-xs' 
                                    type="number" name="finesSum"   />
                            </label>
                            <label htmlFor="">
                                <div>Причина</div>
                                <input className='input input-sm input-bordered input-accent w-full max-w-xs' 
                                    type="text" name="finesReason"  />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label flex flex-col"><div>Премии</div>
                                <input className='input input-sm input-bordered input-accent w-full max-w-xs' 
                                    type="number" name="awardsSum"   />
                            </label>
                            <label htmlFor="" className='flex flex-col'>
                                <div>Причина</div>
                                <input className='input input-sm input-bordered input-accent w-full max-w-xs' 
                                    type="text" name="awardsReason" />
                            </label>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <button type="submit" className="btn btn-primary mt-4">Запросить</button>
                        <div>Сумма: {totalAmount}EUR</div>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default ModalForm;
