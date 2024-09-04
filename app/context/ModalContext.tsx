'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Интерфейс для данных кандидатов
interface Candidate {
  _id: string;
  name: string;
  // Добавьте остальные поля по мере необходимости
}

// Интерфейс для контекста кандидатов
interface CandidateContextType {
  candidates: Candidate[];
  loading: boolean;
  fetchCandidates: () => void;
}

// Создаем контекст
const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

// Интерфейс для детей провайдера
interface Props {
  children: ReactNode;
}

// Компонент провайдера контекста
export const CandidateContextProvider = ({ children }: Props) => {
  // Состояние для хранения данных о кандидатах
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Функция для загрузки кандидатов с сервера
  const fetchCandidates = async () => {
    try {
      const response = await fetch(`/api/candidate`);
      const data = await response.json();
      setCandidates(data);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке кандидатов:", error);
      setLoading(false);
    }
  };

  // useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <CandidateContext.Provider value={{ candidates, loading, fetchCandidates }}>
      {children}
    </CandidateContext.Provider>
  );
};

// Хук для использования контекста в других компонентах
export const useCandidateContext = () => {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error('useCandidateContext must be used within a CandidateContextProvider');
  }
  return context;
};
