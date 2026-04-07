export interface ExpenseDetail {
  id: number;
  category: 'Movilidad' | 'Comida' | 'Hospedaje' | 'Viaticos';
  amount: number;
  date: string;
  description: string;
}

export interface TechnicianExpense {
  id: number;
  name: string;
  amount: number;
  details: ExpenseDetail[];
}

export const expenses: TechnicianExpense[] = [
  {
    id: 1,
    name: "Alfonso Espinal",
    amount: 1250,
    details: [
      {
        id: 1,
        category: "Movilidad",
        amount: 450,
        date: "2025-06-15",
        description: "Transporte a obra San Isidro"
      },
      {
        id: 2,
        category: "Comida",
        amount: 350,
        date: "2025-06-15",
        description: "Almuerzo durante trabajo de campo"
      },
      {
        id: 3,
        category: "Viaticos",
        amount: 250,
        date: "2025-06-14",
        description: "Gastos varios mantenimiento"
      },
      {
        id: 4,
        category: "Movilidad",
        amount: 200,
        date: "2025-06-14",
        description: "Taxi de retorno"
      }
    ]
  },
  {
    id: 2,
    name: "Alex Cáceres",
    amount: 980,
    details: [
      {
        id: 5,
        category: "Hospedaje",
        amount: 350,
        date: "2025-06-16",
        description: "Hotel para trabajo fuera de Lima"
      },
      {
        id: 6,
        category: "Comida",
        amount: 280,
        date: "2025-06-16",
        description: "Desayuno y almuerzo"
      },
      {
        id: 7,
        category: "Movilidad",
        amount: 250,
        date: "2025-06-15",
        description: "Transporte interprovincial"
      },
      {
        id: 8,
        category: "Viaticos",
        amount: 100,
        date: "2025-06-15",
        description: "Materiales menores"
      }
    ]
  },
  {
    id: 3,
    name: "Dany Diaz",
    amount: 1840,
    details: [
      {
        id: 9,
        category: "Movilidad",
        amount: 680,
        date: "2025-06-16",
        description: "Múltiples traslados zona norte"
      },
      {
        id: 10,
        category: "Comida",
        amount: 420,
        date: "2025-06-16",
        description: "Comidas durante jornada completa"
      },
      {
        id: 11,
        category: "Hospedaje",
        amount: 450,
        date: "2025-06-15",
        description: "Alojamiento trabajo nocturno"
      },
      {
        id: 12,
        category: "Viaticos",
        amount: 290,
        date: "2025-06-14",
        description: "Herramientas y suministros"
      }
    ]
  }
];