import React, { createContext, useContext, useEffect, useState } from 'react';
import TechMyExpensesApi from '../api/TechMyExpensesApi';
import {
  CreateTechnicianExpenseDTO,
  TechnicianExpenseDTO
} from '../api/TechMyExpensesInterfaces';
import { useAuth } from '../../../../contexts/AuthContext';

interface TechMyExpensesContextType {
  expenses: TechnicianExpenseDTO[];
  loading: boolean;
  error: string | null;
  createExpense: (dto: Omit<CreateTechnicianExpenseDTO, 'technicianId'>) => Promise<void>;
}

const TechMyExpensesContext = createContext<TechMyExpensesContextType | undefined>(undefined);

export const TechMyExpensesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<TechnicianExpenseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const technicianId = user?.employeeId;

  // 🔄 Cargar gastos al montar si hay técnico
  useEffect(() => {
    if (technicianId) {
      loadExpenses();
    }
  }, [technicianId]);

  const loadExpenses = async () => {
    if (!technicianId) {
      setError('ID del técnico no disponible');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await TechMyExpensesApi.fetchMyExpenses(technicianId);
      setExpenses(data);
    } catch (err) {
      console.error('❌ Error al cargar los gastos:', err);
      setError('No se pudieron cargar los gastos');
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (dto: Omit<CreateTechnicianExpenseDTO, 'technicianId'>) => {
    if (!technicianId) {
      setError('ID del técnico no disponible para registrar el gasto');
      return;
    }

    const payload: CreateTechnicianExpenseDTO = { ...dto, technicianId };

    setLoading(true);
    setError(null);
    try {
      await TechMyExpensesApi.submitExpense(payload);
      await loadExpenses(); // 🔄 Refrescar lista
    } catch (err) {
      console.error('❌ Error al registrar el gasto:', err);
      setError('No se pudo registrar el gasto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TechMyExpensesContext.Provider
      value={{ expenses, loading, error, createExpense }}
    >
      {children}
    </TechMyExpensesContext.Provider>
  );
};

export const useTechMyExpenses = (): TechMyExpensesContextType => {
  const context = useContext(TechMyExpensesContext);
  if (!context) {
    throw new Error('useTechMyExpenses debe usarse dentro de TechMyExpensesProvider');
  }
  return context;
};