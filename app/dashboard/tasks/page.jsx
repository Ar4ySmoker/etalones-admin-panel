'use client'
import { useState, useEffect } from "react";

async function fetchPartnersAndCandidates() {
  try {
    const response = await fetch('/api/candidateFromPartner');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.partners;
  } catch (error) {
    console.error('Error fetching partners and candidates:', error);
    throw error;
  }
}

async function fetchPartners() {
  try {
    const response = await fetch('/api/partners');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.partners;
  } catch (error) {
    console.error('Error fetching partners and candidates:', error);
    throw error;
  }
}

export default function Page() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPartners = await fetchPartnersAndCandidates();
        setPartners(fetchedPartners);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPartners = await fetchPartners();
        setPartners(fetchedPartners);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      document.getElementById('my_modal_1').showModal();
    }
  };
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const handleSubmit = async (event) => {
    event.preventDefault();
   

    const formData = new FormData(event.target);
    const body = {
      partner:formData.get('partners'),
      tasks: formData.get('comment') ? [{
        text: formData.get('comment'),
        date: new Date()
      }] : []
    };
    


    try {
      const response = await fetch('/api/tasks', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Candidate created:', result);
        router.refresh();
        router.push("/dashboard/tasks");
      } else {
        // setErrorMessage(result.message); // Устанавливаем сообщение об ошибке
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  return (
    <>
    <div className="overflow-x-auto">
      {partners.map(partner => (
        <div key={partner._id} className='mb-8'>
          <div className="flex gap-5 items-center">
          <h2 className='text-xl mb-4'>{partner.companyName}</h2>
          <div className="flex gap-1  ">{partner.professions.map(profession => (
                        <p className="badge badge-info" key={profession._id}>{profession.name}</p>
                      ))}</div>

          </div>
          <table className="table table-xs mb-4 bg-slate-100">
            <thead>
              <tr>
                <th>Комментарий</th>
                <th>Профессия</th>
                <th>Менеджер</th>
                <th>Статус</th>
                <th>Дата обновления</th>
                <th>Имя</th>
              </tr>
            </thead>
            <tbody>
              {partner.candidates.map(candidate => (
                <>
                  <tr className="bg-slate-200" key={candidate._id}>
                  <td><ul >
    {candidate?.comment?.map((c, index) => (
      <li key={index}>{c.text} - {new Date(c.date).toLocaleString()}</li>
    ))}
  </ul></td>
                  <td>
                      {candidate.professions.map(profession => (
                        <p key={profession._id}>{profession.name}</p>
                      ))}
                    </td>
                    <td>{candidate.manager?.name || ''}</td>
                    <td>{candidate.status}</td>
                    <td>{candidate.updatedAt ? new Date(candidate.updatedAt).toLocaleDateString() : 'Invalid Date'}</td>
                      <td>{candidate.name}</td>
                  </tr>
                  <tr key={`${candidate._id}-timeline`}>
                    <td  className="col-span-6">
                      <ul className="timeline">
                        <li>
                          <div className="timeline-middle">
                            <input
                              type="checkbox" className="checkbox checkbox-sm" />
                          </div>
                          <div className="timeline-end timeline-box">Первое собеседование</div>
                          <hr />
                        </li>
                        <li>
                          <hr />
                          <div className="timeline-middle">
                            <input type="checkbox" onChange={handleCheckboxChange} className="checkbox checkbox-sm" />
                          </div>
                          <div className="timeline-end timeline-box">Собеседование с заказчиком</div>
                          <hr />
                        </li>
                        <li>
                          <hr />
                          <div className="timeline-middle">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                          </div>
                          <div className="timeline-end timeline-box">Отправил документы</div>
                          <hr />
                        </li>
                        <li>
                          <hr />
                          <div className="timeline-middle">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                          </div>
                          <div className="timeline-end timeline-box">Прошел собеседование/Выезжает</div>
                          <hr />
                        </li>
                        <li>
                          <hr />
                          <div className="timeline-middle">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                          </div>
                          <div className="timeline-end timeline-box">На объекте</div>
                          <hr />
                        </li>
                        <li>
                          <hr />
                          <div className="timeline-middle">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                          </div>
                          <div className="timeline-end timeline-box">Уволен</div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>

<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Заполните поля</h3>
    <p className="py-4">Выберите к кому отправляете на собеседование кандидата</p>
    <div className="modal-action">
      <form method="dialog" onSubmit={handleSubmit}>
        <div>
        <label htmlFor="partners">
              <select className="select w-full max-w-xs select-success select-xs"  
          id="partners" name="partners" >
         <option disabled selected value={null}>Выберите заказчика</option>
          {partners.map(p => (
            <option key={p._id} value={p._id}>{p.name} - {p.companyName}</option>
          ))}
              </select>
              </label>
              <label htmlFor="comment">
          <div>Комментарий</div>
        <textarea className="textarea textarea-accent w-full "
         id="comment" name="comment" placeholder="Комментарий" />
        </label>
        </div>
     

              <div>
              <button className="btn">Закрыть</button>
              <button type="submit" className="btn">Отправить</button>
              </div>
       
      </form>
    </div>
  </div>
</dialog>
    </>
    

    
  );
}
