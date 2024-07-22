const BlackListC = ({ data }) => {
  console.log("Полученные данные :", data); // Добавляем лог для отладки

    return (
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr className="grid grid-cols-3">
              <th>Имя</th>
              <th>Телефон</th>
              <th>Причина</th>
            </tr>
          </thead>
          <tbody>
            {data.map((candidate, _id) => ( 
              <tr key={_id} className="grid grid-cols-3"> 
                <td>{candidate.name}</td> 
                <td>{candidate.phone}</td> 
                <td>{candidate.comment|| 'Неизвестно'}</td> 
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination"></div>
      </div>
    );
  };
  
  export default BlackListC;
  