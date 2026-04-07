import { 
  Employee, 
  Area, 
  Role, 
  PaymentHistory, 
  EmployeeDocument, 
  EmployeeStats,
  MonthOption 
} from './interfaces';

/** Áreas disponibles */
export const areas: Area[] = [
  { id: 1, name: 'Operaciones' },
  { id: 2, name: 'Administrativa' },
  { id: 3, name: 'Gerencial' },
  { id: 4, name: 'Mantenimiento' },
  { id: 5, name: 'Ventas' }
];

/** Roles disponibles */
export const roles: Role[] = [
  { id: 1, name: 'Gerente', areaId: 3 },
  { id: 2, name: 'Supervisor', areaId: 1 },
  { id: 3, name: 'Técnico', areaId: 1 },
  { id: 4, name: 'Recursos Humanos', areaId: 2 },
  { id: 5, name: 'Auxiliar', areaId: 2 },
  { id: 6, name: 'Especialista en Mantenimiento', areaId: 4 },
  { id: 7, name: 'Vendedor', areaId: 5 }
];

/** Datos de empleados con información extendida para HR */
export const employeesData: Employee[] = [
  {
    id: 1,
    name: "Carlos Alberto Mendoza Ríos",
    personalEmail: "carlos.mendoza@gmail.com",
    workEmail: "cmendoza@ryeld.com",
    phoneNumber: "+51 987 654 321",
    areaId: 1,
    areaName: "Operaciones",
    roleId: 2,
    roleName: "Supervisor",
    active: true,
    salary: 4500,
    hireDate: "2022-03-15",
    birthDate: "1985-07-22",
    document: "12345678",
    address: "Av. Los Olivos 123, San Isidro, Lima",
    emergencyContact: "Rosa Mendoza",
    emergencyPhone: "+51 987 654 322"
  },
  {
    id: 2,
    name: "Ana María García Flores",
    personalEmail: "ana.garcia@hotmail.com",
    workEmail: "agarcia@ryeld.com",
    phoneNumber: "+51 912 345 678",
    areaId: 1,
    areaName: "Operaciones",
    roleId: 3,
    roleName: "Técnico",
    active: true,
    salary: 3200,
    hireDate: "2023-01-10",
    birthDate: "1990-11-05",
    document: "23456789",
    address: "Jr. Las Flores 456, Miraflores, Lima",
    emergencyContact: "Luis García",
    emergencyPhone: "+51 912 345 679"
  },
  {
    id: 3,
    name: "Roberto Carlos Silva Vega",
    personalEmail: "roberto.silva@outlook.com",
    workEmail: "rsilva@ryeld.com",
    phoneNumber: "+51 998 765 432",
    areaId: 1,
    areaName: "Operaciones",
    roleId: 3,
    roleName: "Técnico",
    active: true,
    salary: 3000,
    hireDate: "2023-06-20",
    birthDate: "1988-02-14",
    document: "34567890",
    address: "Calle Los Cedros 789, San Borja, Lima",
    emergencyContact: "María Silva",
    emergencyPhone: "+51 998 765 433"
  },
  {
    id: 4,
    name: "María Fernanda López Torres",
    personalEmail: "maria.fernandez@gmail.com",
    workEmail: "mlopez@ryeld.com",
    phoneNumber: "+51 987 123 456",
    areaId: 2,
    areaName: "Administrativa",
    roleId: 4,
    roleName: "Recursos Humanos",
    active: true,
    salary: 3800,
    hireDate: "2021-11-08",
    birthDate: "1987-09-30",
    document: "45678901",
    address: "Av. Javier Prado 321, Surco, Lima",
    emergencyContact: "Pedro López",
    emergencyPhone: "+51 987 123 457"
  },
  {
    id: 5,
    name: "José Antonio Rodríguez Paz",
    personalEmail: "jose.rodriguez@yahoo.com",
    workEmail: "jrodriguez@ryeld.com",
    phoneNumber: "+51 956 789 123",
    areaId: 1,
    areaName: "Operaciones",
    roleId: 3,
    roleName: "Técnico",
    active: true,
    salary: 3100,
    hireDate: "2022-08-12",
    birthDate: "1992-04-18",
    document: "56789012",
    address: "Av. Universitaria 654, Los Olivos, Lima",
    emergencyContact: "Carmen Rodríguez",
    emergencyPhone: "+51 956 789 124"
  },
  {
    id: 6,
    name: "Patricia Elena Morales Castro",
    personalEmail: "patricia.lopez@gmail.com",
    workEmail: "pmorales@ryeld.com",
    phoneNumber: "+51 934 567 890",
    areaId: 2,
    areaName: "Administrativa",
    roleId: 5,
    roleName: "Auxiliar",
    active: true,
    salary: 2500,
    hireDate: "2023-02-25",
    birthDate: "1995-12-08",
    document: "67890123",
    address: "Jr. Huancavelica 987, Cercado de Lima, Lima",
    emergencyContact: "Luis Morales",
    emergencyPhone: "+51 934 567 891"
  },
  {
    id: 7,
    name: "Alberto Víctor Vásquez Ruiz",
    personalEmail: "alberto.vasquez@hotmail.com",
    workEmail: "avasquez@ryeld.com",
    phoneNumber: "+51 923 456 789",
    areaId: 3,
    areaName: "Gerencial",
    roleId: 1,
    roleName: "Gerente",
    active: true,
    salary: 8000,
    hireDate: "2020-01-15",
    birthDate: "1975-05-12",
    document: "78901234",
    address: "Av. Del Ejército 147, Miraflores, Lima",
    emergencyContact: "Elena Vásquez",
    emergencyPhone: "+51 923 456 790"
  },
  {
    id: 8,
    name: "Carmen Rosa Díaz Herrera",
    personalEmail: "carmen.ruiz@outlook.com",
    workEmail: "cdiaz@ryeld.com",
    phoneNumber: "+51 945 678 901",
    areaId: 4,
    areaName: "Mantenimiento",
    roleId: 6,
    roleName: "Especialista en Mantenimiento",
    active: true,
    salary: 3500,
    hireDate: "2022-05-30",
    birthDate: "1989-08-25",
    document: "89012345",
    address: "Calle Las Palmeras 258, San Miguel, Lima",
    emergencyContact: "Jorge Díaz",
    emergencyPhone: "+51 945 678 902"
  },
  {
    id: 9,
    name: "Luis Fernando Herrera Soto",
    personalEmail: "luis.herrera@gmail.com",
    workEmail: "lherrera@ryeld.com",
    phoneNumber: "+51 967 890 123",
    areaId: 1,
    areaName: "Operaciones",
    roleId: 2,
    roleName: "Supervisor",
    active: false,
    salary: 4200,
    hireDate: "2021-09-18",
    birthDate: "1983-03-07",
    document: "90123456",
    address: "Av. Petit Thouars 369, San Isidro, Lima",
    emergencyContact: "Sandra Herrera",
    emergencyPhone: "+51 967 890 124"
  },
  {
    id: 10,
    name: "Sandra Beatriz Castro Villanueva",
    personalEmail: "sandra.morales@yahoo.com",
    workEmail: "scastro@ryeld.com",
    phoneNumber: "+51 978 901 234",
    areaId: 5,
    areaName: "Ventas",
    roleId: 7,
    roleName: "Vendedor",
    active: true,
    salary: 2800,
    hireDate: "2023-04-12",
    birthDate: "1993-10-20",
    document: "01234567",
    address: "Jr. Lampa 741, Cercado de Lima, Lima",
    emergencyContact: "Miguel Castro",
    emergencyPhone: "+51 978 901 235"
  }
];

/** Historial de pagos mock */
export const paymentHistoryData: PaymentHistory[] = [
  {
    id: 1,
    employeeId: 1,
    month: 7,
    year: 2025,
    amount: 4500,
    paymentDate: "2025-07-30",
    paymentType: "salary",
    description: "Salario julio 2025",
    fileName: "pago_cmendoza_julio2025.pdf",
    fileUrl: "/documents/payments/pago_cmendoza_julio2025.pdf",
    status: "paid"
  },
  {
    id: 2,
    employeeId: 1,
    month: 8,
    year: 2025,
    amount: 4500,
    paymentDate: "2025-08-15",
    paymentType: "salary",
    description: "Salario agosto 2025",
    status: "pending"
  },
  {
    id: 3,
    employeeId: 2,
    month: 7,
    year: 2025,
    amount: 3200,
    paymentDate: "2025-07-30",
    paymentType: "salary",
    description: "Salario julio 2025",
    fileName: "pago_agarcia_julio2025.pdf",
    fileUrl: "/documents/payments/pago_agarcia_julio2025.pdf",
    status: "paid"
  },
  {
    id: 4,
    employeeId: 3,
    month: 6,
    year: 2025,
    amount: 3000,
    paymentDate: "2025-06-28",
    paymentType: "salary",
    description: "Salario junio 2025",
    fileName: "pago_rsilva_junio2025.pdf",
    fileUrl: "/documents/payments/pago_rsilva_junio2025.pdf",
    status: "paid"
  },
  {
    id: 5,
    employeeId: 4,
    month: 7,
    year: 2025,
    amount: 3800,
    paymentDate: "2025-07-30",
    paymentType: "salary",
    description: "Salario julio 2025",
    status: "paid"
  },
  {
    id: 6,
    employeeId: 7,
    month: 7,
    year: 2025,
    amount: 8000,
    paymentDate: "2025-07-30",
    paymentType: "salary",
    description: "Salario julio 2025",
    fileName: "pago_avasquez_julio2025.pdf",
    fileUrl: "/documents/payments/pago_avasquez_julio2025.pdf",
    status: "paid"
  },
  {
    id: 7,
    employeeId: 1,
    month: 6,
    year: 2025,
    amount: 1000,
    paymentDate: "2025-06-15",
    paymentType: "bonus",
    description: "Bono por desempeño",
    fileName: "bono_cmendoza_junio2025.pdf",
    fileUrl: "/documents/payments/bono_cmendoza_junio2025.pdf",
    status: "paid"
  }
];

/** Documentos de empleados mock */
export const employeeDocumentsData: EmployeeDocument[] = [
  {
    id: 1,
    employeeId: 1,
    documentType: "contract",
    fileName: "contrato_cmendoza_2022.pdf",
    fileUrl: "/documents/contracts/contrato_cmendoza_2022.pdf",
    uploadDate: "2022-03-15",
    uploadedBy: "María López",
    description: "Contrato inicial de trabajo"
  },
  {
    id: 2,
    employeeId: 2,
    documentType: "contract",
    fileName: "contrato_agarcia_2023.pdf",
    fileUrl: "/documents/contracts/contrato_agarcia_2023.pdf",
    uploadDate: "2023-01-10",
    uploadedBy: "María López",
    description: "Contrato inicial de trabajo"
  },
  {
    id: 3,
    employeeId: 1,
    documentType: "cv",
    fileName: "cv_cmendoza.pdf",
    fileUrl: "/documents/cvs/cv_cmendoza.pdf",
    uploadDate: "2022-03-10",
    uploadedBy: "Sistema",
    description: "Curriculum vitae del empleado"
  },
  {
    id: 4,
    employeeId: 7,
    documentType: "contract",
    fileName: "contrato_avasquez_2020.pdf",
    fileUrl: "/documents/contracts/contrato_avasquez_2020.pdf",
    uploadDate: "2020-01-15",
    uploadedBy: "Recursos Humanos",
    description: "Contrato de gerencia"
  },
  {
    id: 5,
    employeeId: 4,
    documentType: "certificate",
    fileName: "certificado_rrhh_mlopez.pdf",
    fileUrl: "/documents/certificates/certificado_rrhh_mlopez.pdf",
    uploadDate: "2021-11-05",
    uploadedBy: "Sistema",
    description: "Certificación en gestión de recursos humanos"
  }
];

/** Estadísticas de empleados */
export const employeeStats: EmployeeStats = {
  totalEmployees: 10,
  activeEmployees: 9,
  inactiveEmployees: 1,
  averageSalary: 3970,
  totalPayroll: 35730,
  pendingPayments: 2
};

/** Opciones de meses */
export const monthOptions: MonthOption[] = [
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' }
];

/** Años disponibles */
export const availableYears: number[] = [2023, 2024, 2025, 2026];

/** Última actualización de datos */
export const lastUpdated = "2025-08-18T10:30:00Z";
