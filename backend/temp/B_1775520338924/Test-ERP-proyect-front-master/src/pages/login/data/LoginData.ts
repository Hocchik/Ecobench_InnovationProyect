export interface User {
    id: number;
    code: string;
    password: string;
    fullName: string;
    role: 'Supervisor' | 'Auxiliar' | 'RecusosHumanos' | 'Manager' | 'Técnico';
    roleRoute: string;
  }
  
  export const users: User[] = [
    {
      id: 1,
      code: "SUP001",
      password: "sup123",
      fullName: "John Supervisor",
      role: "Supervisor",
      roleRoute: "/sp7x9v3/dashboard"
    },
    {
      id: 2,
      code: "auxiliary@ryeld.com",
      password: "auxiliary123",
      fullName: "Mary Auxiliary",
      role: "Auxiliar",
      roleRoute: "/auxiliary/dashboard"
    },
    {
      id: 3,
      code: "hr@ryeld.com",
      password: "hr123",
      fullName: "Jessica HR",
      role: "RecusosHumanos",
      roleRoute: "/hr/dashboard"
    },
    {
      id: 4,
      code: "manager@ryeld.com",
      password: "manager123",
      fullName: "Robert Manager",
      role: "Manager",
      roleRoute: "/manager/dashboard"
    },
    {
      id: 5,
      code: "technician@ryeld.com",
      password: "tech123",
      fullName: "Mike Technician",
      role: "Técnico",
      roleRoute: "/technician/dashboard"
    }
  ];
  
  export const validateCredentials = (code: string, password: string): User | null => {
    const user = users.find(
      (u) => u.code === code && u.password === password
    );
    return user || null;
  };
  
  export const getRoleRoute = (role: string): string => {
    const user = users.find((u) => u.role === role);
    return user ? user.roleRoute : '/login';
  };