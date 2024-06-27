"use server"

import { revalidatePath } from "next/cache";
import { Candidate } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";

export const addCandidate = async (formData) =>{
    const {name, phone, location, profession, manager, status} = Object.fromEntries(formData);

try{
    connectToDB()
    const newCandidate = new Candidate({
        name,
        phone,
        location,
        profession,
        status,
        manager,
    });
    await newCandidate.save();
}catch (err){
    console.log(err);
    throw new Error("Failed to create Candidate")
}
revalidatePath("/dashboard/candidates");
redirect("/dashboard/candidates");

};



export const updateCandidate = async (formData) => {
  const data = Object.fromEntries(formData);
  const _id = data._id;
  console.log("Updating candidate with ID:", _id);
  
  const { name, phone, location, profession } = data;
  const updateFields = { name, phone, location, profession };

  // Очищаем объект обновлений от пустых значений
  Object.keys(updateFields).forEach(key => {
    if (updateFields[key] === undefined || updateFields[key] === '') {
      delete updateFields[key];
    }
  });

  try {
    await connectToDB(); // Подключение к базе данных
    const result = await Candidate.updateOne(
      { _id: _id },
      { $set: updateFields },
      { new: true } // Возвращает объект после обновления
      
    );

    // Проверка, был ли обновлен хотя бы один документ
    if (result.matchedCount === 0) {
      console.log("No matching document found to update");
      throw new Error("No matching document found to update");
    }

    
    return result; // Возвращает успешный результат для дальнейшего использования
  } catch (err) {
    console.error("Error updating candidate:", err);
    throw new Error("Failed to update Candidate");
  }
  
};






export const deleteCandidate = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDB();
      await Candidate.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete candidate!");
    }
  
    revalidatePath("/dashboard/candidates");
    redirect("/dashboard/candidates");  };



  export const addLocation = async (formData) =>{
    const {name} = Object.fromEntries(formData);

try{
    connectToDB()
    const newLocation = new Location({
        name,
    });
    await newLocation.save();
}catch (err){
    console.log(err);
    throw new Error("Failed to create Location")
}
revalidatePath("/dashboard/candidates");
redirect("/dashboard/candidates");

};