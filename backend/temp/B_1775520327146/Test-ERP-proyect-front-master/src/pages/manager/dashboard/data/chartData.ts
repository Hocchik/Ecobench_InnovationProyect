export const dataset = [
    {
      ingresos: 59,
      egresos: 57,
      month: 'Ene',
    },
    {
      ingresos: 50,
      egresos: 52,
      month: 'Feb',
    },
    {
      ingresos: 47,
      egresos: 53,
      month: 'Mar',
    },
    {
      ingresos: 54,
      egresos: 56,
      month: 'Abr',
    },
    {
      ingresos: 57,
      egresos: 69,
      month: 'May',
    },
    {
      ingresos: 60,
      egresos: 63,
      month: 'Jun',
    },
    {
      ingresos: 59,
      egresos: 60,
      month: 'Jul',
    },
    {
      ingresos: 65,
      egresos: 60,
      month: 'Ago',
    },
    {
      ingresos: 51,
      egresos: 51,
      month: 'Sep',
    },
    {
      ingresos: 60,
      egresos: 65,
      month: 'Oct',
    },
    {
      ingresos: 67,
      egresos: 64,
      month: 'Nov',
    },
    {
      ingresos: 61,
      egresos: 70,
      month: 'Dec',
    },
  ];
  
  export function valueFormatter(value: number | null) {
    return `s/.${value}`;
  }

  export  const chartSetting = {
    yAxis: [
      {
        label: 'Flujo de dinero',
        width: 60,
      },
    ],
    height: 300,
  };
  