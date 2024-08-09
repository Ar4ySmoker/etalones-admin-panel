export default function ModalPartnerInterview({ selectedCandidate, partners, closeModal, handleSubmitStage2 }) {
    return (
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Заполните поля</h3>
          {selectedCandidate && (
            <p className="py-4">Выберите к кому отправляете на собеседование кандидата {selectedCandidate.name}</p>
          )}
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmitStage2}>
              <div>
                <label htmlFor="partners">
                  <select className="select w-full max-w-xs select-success select-xs"
                    id="partners" name="partners">
                    <option disabled selected value={null}>Выберите заказчика</option>
                    {partners.map(p => (
                      <option key={p._id} value={p._id}>{p.name} - {p.companyName}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="comment">
                  <div>Комментарий</div>
                  <textarea className="textarea textarea-accent w-full"
                    id="comment" name="comment" placeholder="Комментарий" />
                </label>
              </div>
              <div>
                <button type="button" onClick={closeModal} className="btn">Закрыть</button>
                <button type="submit" className="btn">Отправить</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
  