
export default function PartnerDetails({ partner }) {
      
    const renderProfessions = (professions) => {
        if (!professions || professions.length === 0) {
          return "нет профессий";
        }
        return professions.map((prof, index) => (
          <div key={index} className='flex flex-col'>
            <p>{prof.name}</p>
            <small>{prof.experience}</small>
          </div>
        ));
      };

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
  <div >Почта: {partner.email ? partner.email : 'не указанна'}</div>
  <div >Сайт: {partner.site ? partner.site : 'не указан'}</div>
  <div >Стоимость проживания: {partner.rentPrice ? partner.rentPrice : 'не записанно'}</div>
  <div >Местоположение: {partner.location}</div>
  <div >Фирма: {partner.companyName}</div>
  <div >Номер DE: {partner.numberDE ? partner.numberDE : 'не указан'}</div>

  <div >Менеджер: {partner.manager.name}</div>
  <div>Профессии: {renderProfessions(partner.professions)}</div>
            </div>
          </div>          
          </div>
          </>
      );
  }
  