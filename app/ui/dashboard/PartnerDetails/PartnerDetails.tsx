
export default function PartnerDetails({ partner }) {
      
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
  