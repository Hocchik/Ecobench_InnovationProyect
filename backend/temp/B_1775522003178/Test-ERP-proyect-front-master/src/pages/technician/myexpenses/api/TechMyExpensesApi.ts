import axios from 'axios';
import { CreateTechnicianExpenseDTO, TechnicianExpenseDTO } from './TechMyExpensesInterfaces';

const BASE_URL = "http://localhost:8080/api/technician/expenses";

class TechMyExpensesApi {
  /* // 🔄 Obtener todos los gastos del técnico
  async fetchMyExpenses(technicianId: string): Promise<TechnicianExpenseDTO[]> {
    if (!technicianId) throw new Error("El ID del técnico es requerido");
    const response = await axios.get(`${BASE_URL}/${technicianId}`);
    return response.data;
  }

  // 📝 Registrar un nuevo gasto
  async submitExpense(dto: CreateTechnicianExpenseDTO): Promise<TechnicianExpenseDTO> {
    if (!dto.technicianId) throw new Error("El ID del técnico es requerido en el DTO");
    if (!dto.type || !dto.amount || !dto.date) throw new Error("Todos los campos son obligatorios");
    const response = await axios.post(BASE_URL, dto);
    return response.data;
  } */

  async fetchMyExpenses(_: string): Promise<TechnicianExpenseDTO[]> {
    throw new Error("⚠️ fetchMyExpenses está deshabilitado temporalmente");
  }

  async submitExpense(_: CreateTechnicianExpenseDTO): Promise<TechnicianExpenseDTO> {
    throw new Error("⚠️ submitExpense está deshabilitado temporalmente");
  }

}

export default new TechMyExpensesApi();