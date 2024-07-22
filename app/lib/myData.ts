import {  ProfessionField, LangueField, ManagerField, StatusField, PartnersField } from "./definitions";
import {  Profession,  Langue, Manager, Status, Partner } from "./models";
import { connectToDB } from "./utils";





export const fetchLangue = async (): Promise<LangueField[]> => {
    try {
        await connectToDB();
        const langue = await Langue.find({}, 'name').lean();
        return langue.map(langue => ({
            _id: langue._id.toString(),
            name: langue.name
          }));
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch Langue!");
    }
};
export const fetchStatus = async (): Promise<StatusField[]> => {
    try {
        await connectToDB();
        console.log("Connected to the db");
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
        console.log("Connected to the db");
        const manager = await Manager.find({}, 'name').lean();
        return manager.map(manager => ({
            _id: manager._id.toString(),
            name: manager.name,
            phone: manager.phone
          }));
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch managers!");
    }
  };

export const fetchProfession = async (): Promise<ProfessionField[]> => {
    try {
         await connectToDB(); // Добавлен await для гарантии асинхронного подключения
        console.log("Connected to db Profession");
        const professions = await Profession.find({}, 'name').sort({ name: 1 }).lean();
        return professions.map(profession => ({
            _id: profession._id.toString(), // Преобразование _id в строку
            name: profession.name,
            description: profession.description // Убедитесь, что поле description существует в модели
          }));
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch Profession!");
    }
};

export const fetchPartners = async (): Promise<PartnersField[]> => {
    try {
         await connectToDB(); // Добавлен await для гарантии асинхронного подключения
        console.log("Connected to db Profession");
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

