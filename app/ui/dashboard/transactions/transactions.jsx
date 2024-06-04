import styles from "./transactions.module.css";
import Link from "next/link";


const Transactions = ({ candidates }) => {
  const renderProfessions = (professions) => {
    if (!professions || professions.length === 0) {
      return "нет профессий";
    }
    return professions.map((prof, index) => (
      <p key={index} className="flex flex-col">
        <p>{prof.name}</p>
        <small className="badge badge-sm">{prof.experience}</small>
      </p>
    ));
  };
  const renderDocuments = (documents) => {
    if (!documents || documents.length === 0) {
      return "нет документов";
    }
    return documents.map((doc, index) => (
      <p key={index}>
        <p>{doc.docType}</p>
      </p>
    ));
  };
  return (
    <div className={styles.container}>
      <h2><strong>Кандидаты в ожидании работы</strong></h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Имя</td>
            <td>Профессия</td>
            <td>Обновлён</td>
            <td>Документы</td>
            <td>Подробнее</td>

          </tr>
        </thead>
        <tbody>
        {candidates.map((candidate) => (
          <tr key={candidate._id}>
            <td>
              <div className={styles.user}>
                {candidate.name}
              </div>
            </td>
            <td>
              {renderProfessions(candidate.professions)}
            </td>
            <td>{candidate.createdAt?.substring(0, 10)}</td>
            <td>{renderDocuments(candidate.documents)}</td>
            <td><Link href={`/dashboard/candidates/${candidate._id}`}>
                        <button className="btn btn-sm btn-success">
                          Открыть карточку
                        </button>
                      </Link></td>
          </tr>
  ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Transactions;
