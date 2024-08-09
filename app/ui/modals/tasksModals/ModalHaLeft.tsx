export default function ModalHaLeft({ selectedCandidate, closeModal, handleSubmitStage3 }) {
    return (
      <dialog id="my_modal_haLeft" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Заполните поля</h3>
          {selectedCandidate && (
            <p className="py-4">Выберите дату когда готовы принять кандидата на объекте {selectedCandidate.name}</p>
          )}
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmitStage3}>
              <div>
                <input type="date"/>
                <label htmlFor="comment">
                  <div>Из какого города будет выезжать, в какой город едет, на каком транспорте</div>
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
  