# Microservicio para la Evaluación Energética y Huella de Carbono en Software

## Descripción
Este proyecto compara dos versiones de un programa y muestra diferencias en consumo energético y emisiones de CO₂.

### MVP
- Medición de CPU, RAM y tiempo de ejecución.
- Conversión a consumo energético estimado.
- Cálculo de huella de carbono equivalente.
- Dashboard simple con comparación visual.

## Arquitectura
- **Backend (Node.js + Express):** API REST para benchmarks y métricas.
- **Frontend (React + Vite + Tailwind):** Dashboard visual y reportes.
- **Base de datos:** SQLite o MongoDB (por definir).

## Estructura
- `/backend`: API REST Node.js
- `/frontend`: React + Vite
- `/data`: Resultados y datos
- `/docs`: Documentación

## Instalación rápida
1. Instalar dependencias backend:
   ```sh
   cd backend
   npm install
   ```
2. Instalar dependencias frontend:
   ```sh
   cd frontend
   npm install
   ```
3. Ejecutar backend:
   ```sh
   node index.js
   ```
4. Ejecutar frontend:
   ```sh
   npm run dev
   ```

## Fórmulas clave
- Consumo energético (kWh):
  $$\text{Consumo (kWh)} = \frac{\text{CPU usage (W)} \cdot \text{Tiempo (h)}}{1000}$$
- Huella de carbono:
  $$\text{CO}_2 = \text{Consumo (kWh)} \times \text{Factor de emisión (ej. 0.233 kg CO}_2/\text{kWh)}$$

## Contacto
- Autor: [Tu Nombre]
- Fecha: Abril 2026
