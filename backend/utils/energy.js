// utils/energy.js
// Fórmulas de conversión energética y CO2

export function calcularConsumo(cpuUsageW, tiempoH) {
  return (cpuUsageW * tiempoH) / 1000;
}

export function calcularCO2(consumoKWh, factorEmision = 0.233) {
  return consumoKWh * factorEmision;
}
