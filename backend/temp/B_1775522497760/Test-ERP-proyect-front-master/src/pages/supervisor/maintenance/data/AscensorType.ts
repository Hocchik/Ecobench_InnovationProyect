export const ASCENSOR_TYPES = [
    "PASAJEROS",
    "PASAJEROS 1",
    "PASAJEROS 2",
    "MONTACARGA",
    "PASAESCALERAS",
    "MONTAVEHICULO",
    "DISCAPACITADO",
    "DISCAPACITADOS",
    "DISCAPACITADOS 1",
    "DISCAPACITADOS 2"
  ] as const;
  
  export type AscensorType = typeof ASCENSOR_TYPES[number];
  