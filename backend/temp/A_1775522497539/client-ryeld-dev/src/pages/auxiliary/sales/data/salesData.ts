import { Month, Sale, SaleDetail } from './interfaces';

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

// Datos de ejemplo para la tabla de ventas
export const mockSales: Record<number, Sale[]> = {
  1: [ // Enero
    {
      id: '1',
      date: '6/01',
      client: 'RAMON CASTILLA',
      concept: 'MTTO. PREVENTIVO',
      voucher: 'RECIBO',
      amount: 340.00,
      dueDate: '10-Enero-25',
      paymentDate: '16-Enero-25',
      voucherNumber: 'RECIBO',
      status: 'Pagado'
    },
    {
      id: '2',
      date: '01',
      client: 'Fatima Mohammed',
      concept: 'Managing Director',
      voucher: 'MD/CEO',
      amount: 445331.00,
      dueDate: '₦600,000.00',
      paymentDate: '₦1,145,331.00',
      voucherNumber: '₦224,000.00',
      status: 'Pendiente'
    },
    {
      id: '3',
      date: '01',
      client: 'Ibrahim Bankole',
      concept: 'Managing Director',
      voucher: 'MD/CEO',
      amount: 445331.00,
      dueDate: '₦600,000.00',
      paymentDate: '₦1,145,331.00',
      voucherNumber: '₦224,000.00',
      status: 'Anulado'
    },
    {
      id: '4',
      date: '01',
      client: 'Sadiq Sadiq',
      concept: 'Managing Director',
      voucher: 'MD/CEO',
      amount: 445331.00,
      dueDate: '₦600,000.00',
      paymentDate: '₦1,145,331.00',
      voucherNumber: '₦224,000.00',
      status: 'Por cobrar'
    },
    {
      id: '5',
      date: '01',
      client: 'James Emmanuel',
      concept: 'Managing Director',
      voucher: 'MD/CEO',
      amount: 445331.00,
      dueDate: '₦600,000.00',
      paymentDate: '₦1,145,331.00',
      voucherNumber: '₦224,000.00',
      status: 'Pagado'
    },
    {
      id: '6',
      date: '01',
      client: 'Ranky Solomon',
      concept: 'Managing Director',
      voucher: 'MD/CEO',
      amount: 445331.00,
      dueDate: '₦600,000.00',
      paymentDate: '₦1,145,331.00',
      voucherNumber: '₦224,000.00',
      status: 'Pagado'
    },
    {
      id: '7',
      date: '01',
      client: 'Otor John',
      concept: 'Managing Director',
      voucher: 'MD/CEO',
      amount: 445331.00,
      dueDate: '₦600,000.00',
      paymentDate: '₦1,145,331.00',
      voucherNumber: '₦224,000.00',
      status: 'Pagado'
    },
    {
      id: '8',
      date: '01',
      client: 'Charles Wilson',
      concept: 'Managing Director',
      voucher: 'MD/CEO',
      amount: 445331.00,
      dueDate: '₦600,000.00',
      paymentDate: '₦1,145,331.00',
      voucherNumber: '₦224,000.00',
      status: 'Pagado'
    },
    {
      id: '9',
      date: '01',
      client: 'Victoria Imosemi',
      concept: 'Managing Director',
      voucher: 'MD/CEO',
      amount: 445331.00,
      dueDate: '₦600,000.00',
      paymentDate: '₦1,145,331.00',
      voucherNumber: '₦224,000.00',
      status: 'Pagado'
    },
    {
      id: '10',
      date: '01',
      client: 'Ifeanyi Richardson',
      concept: 'Managing Director',
      voucher: 'MD/CEO',
      amount: 445331.00,
      dueDate: '₦600,000.00',
      paymentDate: '₦1,145,331.00',
      voucherNumber: '₦224,000.00',
      status: 'Pagado'
    }
  ],
  2: [ // Febrero
    {
      id: '11',
      date: '5/02',
      client: 'CLINICA SAN PABLO',
      concept: 'MTTO. CORRECTIVO',
      voucher: 'FACTURA',
      amount: 1200.00,
      dueDate: '15-Febrero-25',
      paymentDate: '20-Febrero-25',
      voucherNumber: 'F001-123456',
      status: 'Pagado'
    },
    {
      id: '12',
      date: '10/02',
      client: 'HOTEL LIBERTADOR',
      concept: 'REPARACIÓN EMERGENCIA',
      voucher: 'FACTURA',
      amount: 2500.00,
      dueDate: '25-Febrero-25',
      paymentDate: null,
      voucherNumber: 'F001-123457',
      status: 'Pendiente'
    }
  ],
  3: [ // Marzo
    {
      id: '13',
      date: '3/03',
      client: 'HOSPITAL NACIONAL',
      concept: 'INSTALACIÓN',
      voucher: 'FACTURA',
      amount: 8500.00,
      dueDate: '15-Marzo-25',
      paymentDate: '10-Marzo-25',
      voucherNumber: 'F001-123458',
      status: 'Pagado'
    }
  ]
};

// Detalles adicionales para cada venta
export const getSaleDetail = (id: string): SaleDetail => {
  // Buscar la venta en todos los meses
  for (const monthId in mockSales) {
    const sale = mockSales[Number(monthId)].find(s => s.id === id);
    if (sale) {
      return {
        ...sale,
        description: 'Mantenimiento preventivo realizado en los ascensores principales del edificio. Incluye revisión de sistemas de seguridad, lubricación de componentes y calibración de sensores.',
        paymentMethod: sale.status === 'Pagado' ? 'Transferencia bancaria' : undefined,
        notes: 'Cliente solicitó certificado de mantenimiento para presentar a la administración del edificio.',
        bankAccount: sale.status === 'Pagado' ? 'BCP 193-2458741-0-23' : undefined,
        operationNumber: sale.status === 'Pagado' ? '124578963' : undefined,
        paymentProof: sale.status === 'Pendiente' ? 'comprobante_pago.jpg' : undefined
      };
    }
  }
  
  // Si no se encuentra, devolver un detalle vacío
  throw new Error(`Venta con ID ${id} no encontrada`);
};
