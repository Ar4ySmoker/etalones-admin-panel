import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { deleteCandidate } from "@/app/lib/myAction";
import { notFound } from "next/navigation";
import React from "react";



async function getData() {

  try {
    const candidatesRes = await fetch("http://localhost:3000/api/candidates");
    const locationsRes = await fetch("http://localhost:3000/api/locations");
    const professionsRes = await fetch("http://localhost:3000/api/profession")
    const managerRes = await fetch("http://localhost:3000/api/manager")
    const statusRes = await fetch("http://localhost:3000/api/status")

    if (!candidatesRes.ok || !locationsRes.ok || !professionsRes.ok) return notFound();

    const candidates = await candidatesRes.json();
    const locations = await locationsRes.json();
    const professions = await professionsRes.json()
    const manager = await managerRes.json()
    const status = await statusRes.json()
    // const langues = await langueRes.json()

    
    // Создаем объект для быстрого доступа к данным о локациях по их _id
    const locationsMap = {};
    locations.forEach(location => {
      locationsMap[location._id] = location.name;
    });

    const professionsMap = {};
    professions.forEach(profession =>{
      professionsMap[profession._id] = profession.name;
    })
    const managerMap = {};
    manager.forEach(manager =>{
      managerMap[manager._id] = manager.name;
    })
    const statusMap = {};
    status.forEach(status =>{
      statusMap[status._id] = status.name;
    })
    const langueMap = {};
    status.forEach(langues =>{
      statusMap[langues._id] = langues.name;
    })

    // Добавляем поле locationName к каждому кандидату
    candidates.forEach(candidate => {
      candidate.locationName = locationsMap[candidate.location] || "Не указано";
      candidate.professionName = professionsMap[candidate.profession] || "Без профессии"
      candidate.managerName = managerMap[candidate.manager] || "Без менеджера"
      candidate.statusName = statusMap[candidate.status] || "Не обработан"
      candidate.langueName = langueMap[candidate.langue] || "Не знает"
    });


    return candidates;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
const CandidatesPage = async () => {
  // const q = searchParams?.q || "";
  // const page = searchParams?.page || 1;
  // const { count, candidates } = await fetchCandidates(q, page);
  const data = await getData();
    return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* <Search placeholder="Search for a Candidates..." /> */}
        <Link href="/dashboard/candidates/add">
          <button className={styles.addButton}>Добавить кандидата</button>
        </Link>
      </div>
      <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Имя</td>
            <td>Телефон</td>
            <td>Город</td>
            <td>Профессия</td>
            <td>Добавлен</td>
            <td>Документы</td>
            <td>Действия</td>
          </tr>
        </thead>
        
        <tbody>
  {data.map((candidate:any) => (
      <React.Fragment key={candidate._id}>
      <tr >
      <td>{candidate.name}</td>
      <td>{candidate.phone}</td>
      <td>{candidate.locationName}</td>
      <td>{candidate.professionName}</td>
      <td>{candidate.createdAt?.toString().slice(0, 10)}</td>
      <td>{candidate.professionName}</td>
      <td>
        <div className={styles.buttons}>
          <Link href={`/dashboard/candidates/${candidate._id}`}>
            <button className={`${styles.button} ${styles.view}`}>
              Редактировать
            </button>
          </Link>
          <form action={deleteCandidate}>
            <input type="hidden" name="id" value={candidate._id} />
            <button className={`${styles.button} ${styles.delete}`}>
              Удалить
            </button>
          </form>
        </div>
      </td>
    </tr>
    <tr className={styles.wrapperDescr}>
        <td >  
          <details>
            <summary >Подробнее</summary>
            <div className={styles.acordeon}>
              <p>Менеджер: {candidate.managerName}</p>
              <p>Статус: {candidate.statusName}</p>
              <p>Опыт работы: {candidate.experience}</p>
              <p>Знание языков: {candidate.langueName}</p>
              <p>Наличие категорий В/У: {candidate.drivePermis}</p>
              <p>Готов выехать: {candidate.leaving?.toString().slice(0, 10)}</p>
              <p>Комментарий: {candidate.comment}</p>
            </div>
          </details>
        </td>
      </tr>
      </React.Fragment>
  ))}
</tbody>

      </table>
      </div>
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default CandidatesPage;
