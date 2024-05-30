const WorkCandidateTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Name</th>
            <th>Трудоустройство</th>
            <th>Фирма</th>
          </tr>
        </thead>
        <tbody>
          {data.map((candidate, _id) => ( 
            <tr key={_id}> 
              <td>{candidate.name}</td> 
              <td>{candidate.statusFromPartner.status} {candidate.statusFromPartner.dismissalDate ? (
  <div>дата увольнения {candidate.statusFromPartner.dismissalDate}</div>
) : null}</td> 
              <td>{candidate.partners?.companyName || 'Неизвестно'}</td> 
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination"></div>
    </div>
  );
};

export default WorkCandidateTable;
