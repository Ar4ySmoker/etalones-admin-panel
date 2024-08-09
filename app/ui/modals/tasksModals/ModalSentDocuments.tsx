export default function ModalSentDocuments({ selectedCandidate, closeModal, handleSubmitStage3 }) {
    return (
      <dialog id="my_modal_documents" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Заполните поля</h3>
          {selectedCandidate && (
            <p className="py-4">Загрузите отправленые докумены {selectedCandidate.name}</p>
          )}
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmitStage3}>
              <div>
                <div>
                  <div>
<p>Пасспорт</p>
                <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs" />
                  </div>
                  <div>
<p>Виза</p>
                <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs" />
                  </div>
                  <div>
<p>Песель</p>
                <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs" />
                  </div>

                </div>
                <label htmlFor="comment">
                  <div>Напишите что ещё нужно знать о документах этого человека</div>
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
  