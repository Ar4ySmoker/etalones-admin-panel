"use client";
import { useState } from "react";
import TextInput from "../../inputs/TextInput/TextInput";
import { FormUpload } from "../FormUpload/FormUpload";

export default function FormVacancy() {
  const [imagePath, setImagePath] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const body = {
      title: formData.get("title") || "",
      town: formData.get("town") || "",
      workHours: formData.get("workHours") || "",
      workPrice: formData.get("workPrice") || "",
      image: imagePath || "",
    };

    try {
      const response = await fetch("/api/vacancy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("partner created:", result);
      } else {
        console.error("Failed to create partners:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-[700px] gap-1">
        <TextInput id="title" title="Заголовок" placeholder="Название профессии" />
        <TextInput id="town" title="Город" placeholder="Адрес объекта" />
        <TextInput id="workPrice" title="Зарплата" placeholder="Сколько получает работник" />
        <TextInput id="workHours" title="Количество часов" placeholder="Часы отработки" />
        <FormUpload onUpload={(path) => setImagePath(path)} />
        <button className="btn btn-success w-full" type="submit">
          Создать вакансию
        </button>
      </form>
    </>
  );
}
