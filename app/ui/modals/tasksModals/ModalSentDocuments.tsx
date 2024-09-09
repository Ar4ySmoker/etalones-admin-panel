export default function ModalSentDocuments({ selectedCandidate, closeModal, handleSubmitStageDocuments }) {
  return (
    <dialog id="my_modal_documents" className="modal">
      <div className="modal-box flex flex-col justify-center items-center">
        <h3 className="font-bold text-lg">Заполните поля</h3>
        {selectedCandidate && (
          <p className="py-4 text-center">Загрузите отправленные документы {selectedCandidate.name}</p>
        )}
        <div className="modal-action">
          {/* Убираем method="dialog" */}
          <form onSubmit={handleSubmitStageDocuments}>

                  <input type="file" name="documents" className="file-input file-input-bordered file-input-md w-full max-w-xs" />

            <div className="flex justify-center items-center mt-3 gap-5">
              <button type="button" onClick={closeModal} className="btn btn-outline btn-error">Закрыть</button>
              <button type="submit" className="btn btn-success">Отправить</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
