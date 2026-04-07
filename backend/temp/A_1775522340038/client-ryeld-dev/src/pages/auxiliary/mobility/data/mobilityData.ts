import { MobilityExpense, Month, ChartData } from './interfaces';

export const months: Month[] = [
  { id: 1, name: 'Enero' },
  { id: 2, name: 'Febrero' },
  { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' },
  { id: 5, name: 'Mayo' },
  { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' },
  { id: 8, name: 'Agosto' },
  { id: 9, name: 'Septiembre' },
  { id: 10, name: 'Octubre' },
  { id: 11, name: 'Noviembre' },
  { id: 12, name: 'Diciembre' },
];

// Datos de ejemplo para la tabla de movilidad
export const mockMobilityData: Record<number, MobilityExpense[]> = {
  1: [ // Enero
    {
      id: 1,
      fecha: '2/01/2025',
      semana: 'SEMANA 1',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'ESPINAL DE LA CRUZ, ALONSO',
      motivo: 'COMPRAS',
      origen: 'OFICINA',
      destino: 'ESTACION MATELLINI',
      monto: 12.50,
      estado: 'Approved'
    },
    {
      id: 2,
      fecha: '2/01/2025',
      semana: 'SEMANA 1',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'RODRIGUEZ PEREZ, CARLOS',
      motivo: 'MANTENIMIENTO',
      origen: 'OFICINA',
      destino: 'EDIFICIO CENTRAL',
      monto: 15.00,
      estado: 'Approved'
    },
    {
      id: 3,
      fecha: '3/01/2025',
      semana: 'SEMANA 1',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'GUTIERREZ MENDEZ, JUAN',
      motivo: 'INSTALACIÓN',
      origen: 'OFICINA',
      destino: 'CENTRO COMERCIAL JOCKEY',
      monto: 25.50
    },
    {
      id: 4,
      fecha: '5/01/2025',
      semana: 'SEMANA 1',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'ESPINAL DE LA CRUZ, ALONSO',
      motivo: 'REVISIÓN TÉCNICA',
      origen: 'OFICINA',
      destino: 'HOSPITAL REBAGLIATI',
      monto: 18.50
    },
    {
      id: 5,
      fecha: '6/01/2025',
      semana: 'SEMANA 2',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'CAMACHO DIAZ, EDUARDO',
      motivo: 'COMPRAS',
      origen: 'OFICINA',
      destino: 'CENTRO FERRETERO',
      monto: 22.00
    },
    {
      id: 6,
      fecha: '8/01/2025',
      semana: 'SEMANA 2',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'RODRIGUEZ PEREZ, CARLOS',
      motivo: 'MANTENIMIENTO',
      origen: 'OFICINA',
      destino: 'HOSPITAL EDGARDO REBAGLIATI',
      monto: 20.00
    },
    {
      id: 7,
      fecha: '10/01/2025',
      semana: 'SEMANA 2',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'GUTIERREZ MENDEZ, JUAN',
      motivo: 'MANTENIMIENTO',
      origen: 'OFICINA',
      destino: 'PLAZA NORTE',
      monto: 35.00
    },
    {
      id: 8,
      fecha: '12/01/2025',
      semana: 'SEMANA 2',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'ESPINAL DE LA CRUZ, ALONSO',
      motivo: 'EMERGENCIA',
      origen: 'OFICINA',
      destino: 'REAL PLAZA SALAVERRY',
      monto: 28.50
    },
    {
      id: 9,
      fecha: '15/01/2025',
      semana: 'SEMANA 3',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'CAMACHO DIAZ, EDUARDO',
      motivo: 'REVISIÓN TÉCNICA',
      origen: 'OFICINA',
      destino: 'CLÍNICA RICARDO PALMA',
      monto: 17.50
    },
    {
      id: 10,
      fecha: '18/01/2025',
      semana: 'SEMANA 3',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'RODRIGUEZ PEREZ, CARLOS',
      motivo: 'INSTALACIÓN',
      origen: 'OFICINA',
      destino: 'EDIFICIO PANORAMA',
      monto: 30.00
    }
  ],
  2: [ // Febrero
    {
      id: 11,
      fecha: '2/02/2025',
      semana: 'SEMANA 5',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'ESPINAL DE LA CRUZ, ALONSO',
      motivo: 'COMPRAS',
      origen: 'OFICINA',
      destino: 'CENTRO COMERCIAL MINKA',
      monto: 20.50
    },
    {
      id: 12,
      fecha: '3/02/2025',
      semana: 'SEMANA 5',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'GUTIERREZ MENDEZ, JUAN',
      motivo: 'MANTENIMIENTO',
      origen: 'OFICINA',
      destino: 'HOTEL MARRIOTT',
      monto: 35.00
    },
    {
      id: 13,
      fecha: '5/02/2025',
      semana: 'SEMANA 5',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'CAMACHO DIAZ, EDUARDO',
      motivo: 'EMERGENCIA',
      origen: 'OFICINA',
      destino: 'CLÍNICA SAN PABLO',
      monto: 28.00
    }
  ],
  3: [ // Marzo
    {
      id: 14,
      fecha: '3/03/2025',
      semana: 'SEMANA 9',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'RODRIGUEZ PEREZ, CARLOS',
      motivo: 'INSTALACIÓN',
      origen: 'OFICINA',
      destino: 'UNIVERSIDAD CATÓLICA',
      monto: 22.50
    },
    {
      id: 15,
      fecha: '5/03/2025',
      semana: 'SEMANA 9',
      concepto: 'MOVILIDAD LIMA',
      tecnico: 'ESPINAL DE LA CRUZ, ALONSO',
      motivo: 'MANTENIMIENTO',
      origen: 'OFICINA',
      destino: 'EDIFICIO EL REGIDOR',
      monto: 18.00
    }
  ],
  // Meses restantes con algunos datos de ejemplo
  4: [], // Abril
  5: [], // Mayo
  6: [], // Junio
  7: [] // Julio - el mes actual
};

// Datos de ejemplo para el gráfico
export const chartData: ChartData[] = [
  { month: 'Ene', amount: 225 },
  { month: 'Feb', amount: 370 },
  { month: 'Mar', amount: 280 },
  { month: 'Abr', amount: 320 },
  { month: 'May', amount: 450 },
  { month: 'Jun', amount: 280 },
  { month: 'Jul', amount: 180 },
];

// Calcular el total de gastos por mes para actualizar el gráfico
export const calculateMonthlyTotals = () => {
  const totals: ChartData[] = [];
  
  for (let i = 1; i <= 12; i++) {
    const monthData = mockMobilityData[i] || [];
    const total = monthData.reduce((sum, expense) => sum + expense.monto, 0);
    
    totals.push({
      month: months.find(m => m.id === i)?.name.substring(0, 3) || '',
      amount: total
    });
  }
  
  return totals;
};
