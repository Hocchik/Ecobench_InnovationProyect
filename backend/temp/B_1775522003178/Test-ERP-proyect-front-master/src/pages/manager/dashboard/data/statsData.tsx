import { TrendingUp, Wallet, Car } from 'lucide-react';


export const stats = [
    {
      title: 'Total ventas por mes',
      amount: 's/. 100,000.00',
      label: 'RYELD',
      change: '↑ 0.2%',
      changeType: 'up',
      icon: <TrendingUp size={20} />,
    },
    {
      title: 'Total ventas por mes',
      amount: 's/. 100,000.00',
      label: 'SUMMA',
      change: '↑ 0.2%',
      changeType: 'up',
      icon: <TrendingUp size={20} />,
    },
    {
      title: 'Total de gastos mensual',
      amount: 's/. 15,000.00',
      label: '',
      change: '↓ 0.2%',
      changeType: 'down',
      icon: <Wallet size={20} />,
    },
    {
      title: 'Total de gastos movilidad',
      amount: 's/. 10,000.00',
      label: '',
      change: '↓ 0.2%',
      changeType: 'down',
      icon: <Car size={20} />,
    },
  ];