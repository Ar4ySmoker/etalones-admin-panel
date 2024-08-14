'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Добавляем роутер для редиректа
import ModalPartnerInterview from "@/app/ui/modals/tasksModals/ModalPartnerInterview";
import ModalSentDocuments from "@/app/ui/modals/tasksModals/ModalSentDocuments";
import ModalHaLeft from "@/app/ui/modals/tasksModals/ModalHaLeft";

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
    console.error('Error fetching partners:', error);
    throw error;
  }
}

export default function Page() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState({
    firstInterview: false,
    partnerInterview: false,
    sentDocuments: false,
    haLeft: false,
    onObject: false,
    fired: false
  });
  const router = useRouter();

  useEffect(() => {
      async function loadData() {
        try {
          const fetchedPartners = await fetchPartnersAndCandidates();
          setPartners(fetchedPartners);
          // Обновляем состояния чекбоксов для каждого кандидата
          const updatedCheckboxStates = {};
          fetchedPartners.forEach(partner => {
            partner.candidates.forEach(candidate => {
              const lastTask = candidate.tasks && candidate.tasks.length > 0 ? candidate.tasks[candidate.tasks.length - 1] : null;
              if (lastTask) {
                updatedCheckboxStates[candidate._id] = {
                  firstInterview: lastTask.firstInterview || false,
                  partnerInterview: lastTask.partnerInterview || false,
                  sentDocuments: lastTask.sentDocuments || false,
                  haLeft: lastTask.haLeft || false,
                  onObject: lastTask.onObject || false,
                  fired: lastTask.fired || false
                };
              }
            });
          });
          setCheckboxStates(updatedCheckboxStates);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    
      loadData();
    }, []);
    const handleCheckboxStateChange = (candidateId, event) => {
      const { name, checked } = event.target;
      setCheckboxStates(prevStates => ({
        ...prevStates,
        [candidateId]: {
          ...prevStates[candidateId],
          [name]: checked
        }
      }));
    };
    
    const handleCheckboxChange = (candidate, event) => {
      handleCheckboxStateChange(candidate._id, event);
    
      if (event.target.checked) {
        setSelectedCandidate(candidate);
        document.getElementById('my_modal_2').showModal();
      } else {
        document.getElementById('my_modal_2').close(); // Закрываем модальное окно, если чекбокс снят
      }
    };
    const handleCheckboxChangeDocuments = (candidate, event) => {
      handleCheckboxStateChange(candidate._id, event);
    
      if (event.target.checked) {
        setSelectedCandidate(candidate);
        document.getElementById('my_modal_documents').showModal();
      } else {
        document.getElementById('my_modal_documents').close();
      }
    };
    const handleCheckboxChangeHaLeft = (candidate, event) => {
      handleCheckboxStateChange(candidate._id, event);
    
      if (event.target.checked) {
        setSelectedCandidate(candidate);
        document.getElementById('my_modal_haLeft').showModal();
      } else {
        document.getElementById('my_modal_haLeft').close();
      }
    };
  
  const closeModal = () => {
    document.getElementById('my_modal_2').close();
    document.getElementById('my_modal_documents').close();
    document.getElementById('my_modal_haLeft').close();

  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  const handleSubmitStage2 = async (event) => {
    event.preventDefault();
  
    // Получаем данные формы
    const formData = new FormData(event.target);
    const candidateId = selectedCandidate._id;
    const partnerId = formData.get('partners');
    const comment = formData.get('comment');
  
    const body = {
      candidateId,
      partnerId,
      comment,
      stage: 'partnerInterview',
      checkboxes: checkboxStates[candidateId] // Включаем состояния чекбоксов только для выбранного кандидата
    };
  
    try {
      const response = await fetch(`/api/tasks/${candidateId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Task added to candidate:', result);
        closeModal();
        router.refresh(); // Обновляем страницу
        router.push("/dashboard/tasks"); // Перенаправляем на другую страницу
      } else {
        console.error('Error:', result.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  const handleSubmitStageDocuments = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const candidateId = selectedCandidate._id;
    const comment = formData.get('comment');
    
    // Добавляем candidateId и comment в FormData
    formData.append('candidateId', candidateId);
    formData.append('comment', comment);
  
    try {
      const response = await fetch('/api/imgDoc', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Task added to candidate:', result);
        closeModal();
        router.refresh();
        router.push("/dashboard/tasks");
      } else {
        console.error('Error:', result.message);
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
              <div className="flex gap-1">
                {partner.professions.map(profession => (
                  <p className="badge badge-info" key={profession._id}>{profession.name}</p>
                ))}
              </div>
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
                      <td className="w-max">
                        <div className="collapse bg-base-200">
                          <input type="checkbox" />
                          <div className="collapse-title text-xs font-medium">Посмотреть комментарии</div>
                          <div className="collapse-content">
                            <ul>
                              {candidate?.comment?.map((c, index) => (
                                <li key={index}>
                                  {c.text} - 
                                  <span className="badge badge-neutral">
                                    {new Date(c.date).toLocaleString()}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
                      <td>
                        {candidate.professions.map(profession => (
                          <p key={profession._id}>{profession.name}</p>
                        ))}
                      </td>
                      <td>{candidate.manager?.name || ''}</td>
                      <td>{candidate.status}</td>
                      <td>{candidate.updatedAt ? new Date(candidate.updatedAt).toLocaleDateString() : 'Invalid Date'}</td>
                      {/* <td>{candidate.name}</td> */}
                      <td>
            {candidate.imgDoc && candidate.imgDoc.length > 0 ? (
              candidate.imgDoc.map((imgId) => (
                <img
                  key={imgId}
                  src={`/api/imgDoc/${imgId}`} // URL для получения изображения
                  alt="Document"
                  style={{ width: '100px', height: 'auto' }} // Размеры можно настроить
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </td>
                    </tr>
                    <tr key={`${candidate._id}-timeline`}>
                      <td className="col-span-6">
                        <ul className="timeline">
                          <li>
                            <div className="timeline-middle">
                            <input
  type="checkbox"
  name="firstInterview"
  className="checkbox checkbox-sm"
  checked={checkboxStates[candidate._id]?.firstInterview || false}
  onChange={(e) => handleCheckboxStateChange(candidate._id, e)}
/>
                            </div>
                            <div className="timeline-end timeline-box">Первое собеседование</div>
                            <hr />
                          </li>
                          <li>
                            <hr />
                            <div className="timeline-middle tooltip" >
                              <input
                                type="checkbox"
                                name="partnerInterview"
                                className="checkbox checkbox-sm"
                                checked={checkboxStates[candidate._id]?.partnerInterview }
                                onChange={(e) => handleCheckboxChange(candidate, e)}
                              />
                            </div>
                            <div className="timeline-end timeline-box">Собеседование с заказчиком</div>
                            <hr />
                          </li>
                          <li>
                            <hr />
                            <div className="timeline-middle">
                              <input
                               type="checkbox"
                               name="sentDocuments"
                               className="checkbox checkbox-sm"
                               checked={checkboxStates[candidate._id]?.sentDocuments || false}
                               onChange={(e) => handleCheckboxChangeDocuments(candidate, e)}
                               />
                            </div>
                            <div className="timeline-end timeline-box">Отправил документы</div>
                            <hr />
                          </li>
                          <li>
                            <hr />
                            <div className="timeline-middle">
                              <input
                               type="checkbox"
                               name="haLeft"
                               className="checkbox checkbox-sm"
                               checked={checkboxStates[candidate._id]?.haLeft || false}
                               onChange={(e) => handleCheckboxChangeHaLeft(candidate._id, e)}
                              />
                            </div>
                            <div className="timeline-end timeline-box">Прошел собеседование/Выезжает</div>
                            <hr />
                          </li>
                          <li>
                            <hr />
                            <div className="timeline-middle">
                              <input
                              type="checkbox"
                              name="onObject"
                              className="checkbox checkbox-sm"
                              checked={checkboxStates[candidate._id]?.onObject || false}
                              onChange={(e) => handleCheckboxStateChange(candidate._id, e)}
                              />
                            </div>
                            <div className="timeline-end timeline-box">На объекте</div>
                            <hr />
                          </li>
                          <li>
                            <hr />
                            <div className="timeline-middle">
                              <input
                               type="checkbox"
                               name="fired"
                               className="checkbox checkbox-sm"
                               checked={checkboxStates[candidate._id]?.fired || false}
                               onChange={(e) => handleCheckboxStateChange(candidate._id, e)}
                              />
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
      <ModalPartnerInterview
        selectedCandidate={selectedCandidate}
        partners={partners}
        closeModal={closeModal}
        handleSubmitStage2={handleSubmitStage2}
      />
      <ModalSentDocuments
        selectedCandidate={selectedCandidate}
        closeModal={closeModal}
        handleSubmitStageDocuments={handleSubmitStageDocuments}
      />
      <ModalHaLeft
       selectedCandidate={selectedCandidate}
       closeModal={closeModal}
      />
    </>
  );
}
