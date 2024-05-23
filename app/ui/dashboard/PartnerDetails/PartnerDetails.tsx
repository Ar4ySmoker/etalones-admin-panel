
export default function PartnerDetails({ partner }) {
    
    // const renderProfessions = (professions) => {
    //   if (!professions || professions.length === 0) {
    //     return "нет профессий";
    //   }
    //   return professions.map((prof, index) => (
    //     <p key={index} className='flex flex-col'>
    //       <p>{prof.name}</p>
    //       <small>{prof.experience}</small>
    //     </p>
    //   ));
    // };
    // const renderDocuments = (documents) => {
    //   if (!documents || documents.length === 0) {
    //     return "нет документов";
    //   }
    //   return documents.map((doc, index) => (
    //     <p key={index} className='flex flex-col'>
    //       <p>{doc.docType}</p>
    //       <p>{doc.dateExp}</p>
    //     </p>
    //   ));
    // };
   
  
  
   
      return (
          <>
          <div className="">
              <h1 className="font-bold py-10 text-2xl">О партнёре {partner.companyName}</h1>
          </div>
          <div>
          <div>
            <div className='flex flex-col w-full'>
  <div>Имя: {partner.name}</div>
  <div>Возраст: {partner.companyName}</div>
  <div >Номер телефона: {partner.phone}</div>
            </div>
          </div>          
          </div>
          </>
      );
  }
  