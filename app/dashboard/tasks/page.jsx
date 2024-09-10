'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Добавляем роутер для редиректа
import ModalPartnerInterview from "@/app/ui/modals/tasksModals/ModalPartnerInterview";
import ModalSentDocuments from "@/app/ui/modals/tasksModals/ModalSentDocuments";
import ModalHaLeft from "@/app/ui/modals/tasksModals/ModalHaLeft";
import ModalNewTask from "@/app/ui/modals/tasksModals/ModalNewTask";
import Image from "next/image";

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

  const handleCheckboxChangeStage1 = (candidate, event) => {
    handleCheckboxStateChange(candidate._id, event);
    console.log('Selected Candidate:', candidate._id); // Проверьте, что здесь есть корректные данные

    if (event.target.checked) {
      setSelectedCandidate(candidate);
      document.getElementById('my_modal_1').showModal();
    } else {
      document.getElementById('my_modal_1').close(); // Закрываем модальное окно, если чекбокс снят
    }
  };

  const handleCheckboxChange = (candidate, event) => {
    handleCheckboxStateChange(candidate._id, event);
    console.log('Selected Candidate:', candidate._id); // Проверьте, что здесь есть корректные данные

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
    document.getElementById('my_modal_1').close();
    document.getElementById('my_modal_2').close();
    document.getElementById('my_modal_documents').close();
    document.getElementById('my_modal_haLeft').close();

  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  const handleSubmitStage1 = async (event) => {
    event.preventDefault();

    // Получаем данные формы
    const formData = new FormData(event.target);
    const candidateId = selectedCandidate._id; // Убедитесь, что selectedCandidate определен
    const title = formData.get('title');
    // const date = formData.get('date'); // Получаем дату из формы
    
const text = `Кандидат ${selectedCandidate.name} прошел слбеседование с менеджером`
    const body = {
      candidateId,
      text,
      title,
      // date, 
      checkboxes: checkboxStates[candidateId] // Включаем состояния чекбоксов только для выбранного кандидата
    };

    try {
      const response = await fetch(`/api/task`, { // Обратите внимание, что мы используем /api/task для создания задачи
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

  const handleSubmitStage2 = async (event) => {
    event.preventDefault();

    // Получаем данные формы
    const formData = new FormData(event.target);
    const candidateId = selectedCandidate._id;
    const partnerId = formData.get('partners');
    const title = formData.get('title');
    const dateOfCompletionStr = formData.get('dateOfCompletion');
    const dateOfCompletion = new Date(dateOfCompletionStr);
    const selectedPartner = partners.find(p => p._id === partnerId);
    const partnerName = selectedPartner ? selectedPartner.companyName : 'неизвестный партнёр';
    
    // Формирование текста с именем партнёра
    const text = `Кандидат ${selectedCandidate.name} отправлен на собеседование к партнёру ${partnerName}.`;
        const body = {
      candidateId,
      partnerId,
      dateOfCompletion,
      text,
      title,
      checkboxes: checkboxStates[candidateId] // Включаем состояния чекбоксов только для выбранного кандидата
    };

    try {
      const response = await fetch(`/api/task/`, {
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

  const handleSubmitStage4 = async (event) => {
    event.preventDefault();

    // Получаем данные формы
    const formData = new FormData(event.target);
    const candidateId = selectedCandidate._id; // Убедитесь, что selectedCandidate определен
    const dateLeave = formData.get('dateLeave'); // Получаем дату в формате YYYY-MM-DD
    const title = formData.get('title');
    const dateOfCompletion = formData.get('dateLeave');
    const formattedDateLeave = new Date(dateLeave).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    // const date = formData.get('date'); // Получаем дату из формы
const text = `Кандидата ${selectedCandidate.name} прошел слбеседование с ${selectedCandidate?.partners?.companyName} его ждут на объекте ${formattedDateLeave}` 
    const body = {
      candidateId,
      text,
      title,
      dateLeave,
      dateOfCompletion,
      // date, 
      checkboxes: checkboxStates[candidateId] // Включаем состояния чекбоксов только для выбранного кандидата
    };

    try {
      const response = await fetch(`/api/task`, { // Обратите внимание, что мы используем /api/task для создания задачи
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
  

  return (
    
    <>
      <div className="overflow-x-auto">
        {partners.map(partner => (
          <div key={partner._id} className='mb-8'>
            <div className="flex gap-5 items-center">
              <h2 className='text-xl mb-4'>{partner.name}  {partner.companyName}</h2>
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
                        <span className="p-1 font-bold text-xl">{candidate.name}</span>
                        <div className="flex gap-2 mt-2">
                          <div className="collapse bg-base-200 ">
                            <input type="checkbox" />
                            <div className="collapse-title font-medium text-center py-auto my-auto text-lg">Посмотреть комментарии</div>
                            <div className="collapse-content">
                              <div className="overflow-auto h-80">
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
                            </div>

                          </div>
                          <div className="collapse bg-base-200">
                            <input type="checkbox" />
                            <div className="collapse-title text-lg hover:underline hover:text-blue-600 font-medium"><p>Посмотреть Задачи</p></div>
                            <div className="collapse-content">
                              <div className="overflow-auto h-80"> {/* Контейнер с фиксированной высотой и прокруткой */}
                                <ul className="flex w-full  flex-col gap-2">
                                {candidate?.tasks?.slice().reverse().map((task, index) => {
                      const dateOfCompletion = new Date(task.createdAt).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                      return (
                        <li key={index} className="card bg-base-300 grid h-max place-items-center p-4">
                          <div className="flex flex-col w-full">
                            <p>{dateOfCompletion}</p>
                            <span className="text-sm font-bold">{task.text}</span>
                          </div>
                          <div className="divider"></div>
                        </li>
                      );
                    })}
                                </ul>
                              </div>
                            </div>

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
          <div key={imgId} style={{ margin: '10px 0' }}>
            <Image
              src={`/api/imgDoc/${imgId}`}
              alt="Document"
              width={100} // Ширина изображения
              height={100} // Высота изображения
              style={{ objectFit: 'contain' }} // Подгонка изображения
            />
          </div>
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
                                checked={checkboxStates[candidate._id]?.firstInterview }
                                // onChange={(e) => handleCheckboxChangeStage1(candidate._id, e)}
                                onChange={(e) => handleCheckboxChangeStage1(candidate, e)}

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
                                checked={checkboxStates[candidate._id]?.partnerInterview}
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
                                onChange={(e) => handleCheckboxChangeHaLeft(candidate, e)}
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
      <ModalNewTask
        selectedCandidate={selectedCandidate}
        closeModal={closeModal}
        handleSubmitStage1={handleSubmitStage1}
      />
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
        handleSubmitStage4={handleSubmitStage4}

      />
    </>
  );
}
