'use client'
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from 'react';

function EditCandidatePage() {
  const pathname = usePathname();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);  // Состояние загрузки

  useEffect(() => {
    const candidateId = pathname.split("/").pop(); // Извлекаем ID кандидата из URL
    if (candidateId) {
      fetchCandidateData(candidateId);
    }
  }, [pathname]);

  const fetchCandidateData = async (id) => {
    try {
      const response = await fetch(`/api/candidates/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch candidate: ${response.status}`);
      }
      const data = await response.json();
      setCandidate(data);  // Устанавливаем полученные данные кандидата
      setLoading(false);  // Обновляем состояние загрузки
    } catch (error) {
      console.error("Ошибка: ", error.message);
      setLoading(false);  // Обновляем состояние загрузки в случае ошибки
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;  // Отображаем индикатор загрузки
  }

  return (
    <form>
      <label>
        Имя:{candidate.name}
        <input type="text" placeholder={candidate.name} />
      </label>
      <label>
        Телефон:
        <input type="text" placeholder={candidate ? candidate.phone : 'Телефон не найден'} />
      </label>
      {/* Добавьте другие поля аналогично */}
      <button type="submit">Сохранить изменения</button>
    </form>
  );
}

export default EditCandidatePage;
