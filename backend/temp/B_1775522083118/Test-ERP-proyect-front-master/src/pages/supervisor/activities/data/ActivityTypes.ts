const activityTypes: Record<string, { label: string; color: string; border: string }> = {
    "Correctivo": { label: "Correctivo", color: "#FB8C00", border: "#F57C00"  }, // Naranja
    "Reparación": { label: "Reparación", color: "#7B1FA2", border: "#6A1B9A" }, // Púrpura
    "Urgencia": { label: "Urgencia", color: "#FDD835", border: "#FBC02D" }, // Amarillo
    "Emergencia": { label: "Emergencia", color: "#E53935", border: "#D32F2F" }, // Rojo
    "Admin": { label: "Administrativo", color: "#546E7A", border: "#455A64" }, // Gris
    "Preventivo": { label: "Preventivo", color: "#4CAF50", border: "#388E3C" } // Verde
  };

  export default activityTypes;