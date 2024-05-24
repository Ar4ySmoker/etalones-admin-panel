'use client';

export default function CandidatsTable({ candidates }) {
  console.log('КАНДИДАТЫ!!!!!', candidates);
  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
            <th>Менеджер</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Профессия</th>
            <th>Добавлен</th>
            <th>Документы</th>
            <th>Детали</th>
      </tr>
    </thead>
    <tbody>
    {candidates.map((candidate) => (

      <tr key={candidate._id}>
        <td>
          {candidate.name}
          <br/>
          <span className="badge badge-ghost badge-sm">{candidate.manager.name}</span>
        </td>
        <td>Purple</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      ))}
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
    
  </table>
</div>

  );
}
