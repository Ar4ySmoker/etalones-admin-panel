
export default function ModalNewTask({ selectedCandidate, closeModal, handleSubmitStage1 }) {
    return (
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box flex flex-col">
          <h3 className="font-bold text-lg absolute left-2 top-2">Заполните поля</h3>
          {selectedCandidate && (
            <p className="py-4">Опишите ваши впечатления и ожидания после собеседования с кандидатом {selectedCandidate.name}</p>
          )}
          <div className="modal-action w-full">
            <form method="dialog" onSubmit={handleSubmitStage1}>
              <div className="">
                <label htmlFor="title">
                  <div>Комментарий</div>
                  <textarea className="textarea textarea-accent w-full"
                    id="title" name="title" placeholder="Заголовок" />
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
  