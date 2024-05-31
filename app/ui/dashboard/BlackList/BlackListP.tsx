const BlackListP = ({ data }) => {
    console.log("Полученные данные партнёров:", data); // Добавляем лог для отладки
    if (!data || !Array.isArray(data)) {
      return <div>Нет данных для отображения</div>;
    }
  
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
            {data.map((partner, index) => (
              <tr key={index} className="grid grid-cols-3">
                <td>{partner.name}</td>
                <td>{partner.phone}</td>
                <td>{partner.comment || 'Неизвестно'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination"></div>
      </div>
    );
  };
  
  export default BlackListP;
  