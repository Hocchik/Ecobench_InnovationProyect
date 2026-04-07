import { ToolPosesion, ToolRequestGET } from './interface/toolinterfaces';


export const mockTools: ToolPosesion[] = [
  { name_tool: "Herramienta 1", quantity: 2 },
  { name_tool: "Herramienta 2", quantity: 2 },
  { name_tool: "Herramienta 3", quantity: 2 },
  { name_tool: "Herramienta 4", quantity: 2 },
];

export const mockCharges: ToolRequestGET[] = [
  {
    request_number: "CAS-112",
    date: "2024-07-20",
    reason: "Mantenimiento preventivo de luminarias",
    status: "Pending",
    items: [
      {
        code_item: "LM-001",
        name_item: "Lámpara LED 12W",
        request_quantity: 10
      },
      {
        code_item: "CB-007",
        name_item: "Cable eléctrico 1.5mm",
        request_quantity: 25
      }
    ]
  },
  {
    request_number: "CAS-111",
    date: "2024-07-10",
    reason: "Reposición por daños",
    status: "Approved",
    items: [
      {
        code_item: "FH-003",
        name_item: "Fusible 20A",
        request_quantity: 5
      }
    ]
    // approved_by: { id_employee: 4, name_employee: "Luis Peña" } ← puedes agregar si lo usas
  }
];
