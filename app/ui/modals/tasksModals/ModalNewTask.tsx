export default function ModalNewTask({ selectedCandidate, closeModal, handleSubmitStage1 }) {
    console.log("SELECTED CANDIDATE NAME", selectedCandidate?.name)
    return (
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Заполните поля</h3>
          {selectedCandidate && (
            <p className="py-4">Проверка {selectedCandidate.name}</p>
          )}
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmitStage1}>
              <div className="flex flex-col gap-3">
                <label htmlFor="title">
                  <div>Комментарий</div>
                  <textarea className="textarea textarea-accent w-full"
                    id="title" name="title" placeholder="Заголовок" />
                </label>
                <label htmlFor="date">
                  <div>Дата выполнения</div>
                  <input type="date" className="input input-accent w-full"
                    id="date" name="date" />
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
  