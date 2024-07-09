import Link from "next/link";

export default function CandidateFromPartner({ data }){
    return(
        <>
          <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                    <tr className="grid grid-cols-4">
                        <th>Name</th>
                        <th>Трудоустройство</th>
                        <th>Фирма</th>
                        <th>Детали</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((candidate, _id) => (
                        <tr key={_id} className="grid grid-cols-4">
                            <td>{candidate.name}</td>
                            <td>
                                {candidate.statusFromPartner.status}
                                <div>
                                    {candidate.statusFromPartner.from ? (
                                        <div>дата трудоустроуства {candidate.statusFromPartner.from}</div>
                                    ) : null}
                                    {candidate.statusFromPartner.to ? (
                                        <div>до {candidate.statusFromPartner.to}</div>
                                    ) : null}
                                </div>
                                <div>
                                    {candidate.statusFromPartner.dismissalDate ? (
                                        <div>дата увольнения {candidate.statusFromPartner.dismissalDate}</div>
                                    ) : null}
                                </div>
                            </td>
                            <td>{candidate.partners?.companyName || 'Неизвестно'}</td>
                            <td>
                                <Link href={`/dashboard/candidates/${candidate._id}`}>
                                    <button className="btn btn-sm btn-success w-max">Подробнее</button>
                                </Link>
                                {/* <button
                                    className="btn btn-sm btn-warning w-max ml-2"
                                    onClick={() => openModal(candidate._id)}
                                >
                                    Выставить счёт
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {isModalOpen && selectedCandidate && (
                <ModalForm
                    candidate={selectedCandidate}
                    closeModal={closeModal}
                />
            )} */}
        </div>
        </>
    )
}