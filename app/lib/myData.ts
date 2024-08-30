import {  ProfessionField, ManagerField, StatusField, PartnersField } from "./definitions";
import {  Profession,  Manager, Status, Partner } from "./models";
import { connectToDB } from "./utils";



export const fetchStatus = async (): Promise<StatusField[]> => {
    try {
        await connectToDB();
        const status = await Status.find({}, 'name').lean();
        return status.map(status => ({
            _id: status._id.toString(),
            name: status.name
          }));
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch status!");
    }
};
export const fetchManager = async (): Promise<ManagerField[]> => {
    try {
      await connectToDB();
      const managers = await Manager.find({}, 'name phone telegram viber whatsapp').lean();
      return managers.map(manager => ({
        _id: manager._id.toString(),
        name: manager.name,
        phone: manager.phone,
        telegram: manager.telegram,
        viber: manager.viber,
        whatsapp: manager.whatsapp,
      }));
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch managers!");
    }
  };

export const fetchProfession = async (): Promise<ProfessionField[]> => {
    try {
         await connectToDB(); // Добавлен await для гарантии асинхронного подключения
         const professions = await Profession.find({}, 'name category') // Получаем профессии с полями name и category
         .sort({ name: 1 }) // Сортируем по name в алфавитном порядке
         .lean(); // Преобразуем результат в простой объект JavaScript
     
     
     // Преобразуем список профессий в новый формат
     const formattedProfessions = professions.map(profession => ({
         _id: profession._id.toString(), // Преобразуем _id в строку
         name: profession.name, // Оставляем поле name как есть
         category: profession.category // Оставляем поле category как есть
     }));
     
     return formattedProfessions; // Возвращаем преобразованный список профессий
     
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch Profession!");
    }
};

export const fetchPartners = async (): Promise<PartnersField[]> => {
    try {
         await connectToDB(); // Добавлен await для гарантии асинхронного подключения
        const partners = await Partner.find({}, 'name companyName').lean();
        return partners.map(partner => ({
            _id: partner._id.toString(), // Преобразование _id в строку
            name: partner.name,
            companyName: partner.companyName,
          }));
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch Profession!");
    }
};

