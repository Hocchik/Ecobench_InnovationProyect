// services/pdfService.js
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

export async function generateReportPDF(resultA, resultB, comparison) {
  try {
    const doc = new PDFDocument();
    const stream = new PassThrough();
    doc.pipe(stream);
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));

    doc.fontSize(18).text('Reporte de Comparación de Software', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text('Detalles Software A:');
    doc.text(`Nombre: ${resultA.name}`);
    doc.text(`Corridas: ${resultA.runs}`);
    doc.text(`Tiempo (s): ${resultA.time.mean.toFixed(3)} ± ${resultA.time.std.toFixed(3)}`);
    doc.text(`CPU (%): ${resultA.cpu.mean.toFixed(2)} ± ${resultA.cpu.std.toFixed(2)}`);
    doc.text(`RAM (MB): ${resultA.ram.mean.toFixed(1)} ± ${resultA.ram.std.toFixed(1)}`);
    doc.text(`Energía (kWh): ${resultA.energy.mean.toFixed(6)} ± ${resultA.energy.std.toFixed(6)}`);
    doc.text(`CO₂ (kg): ${resultA.co2.mean.toFixed(6)} ± ${resultA.co2.std.toFixed(6)}`);
    doc.moveDown();

    doc.fontSize(14).text('Detalles Software B:');
    doc.text(`Nombre: ${resultB.name}`);
    doc.text(`Corridas: ${resultB.runs}`);
    doc.text(`Tiempo (s): ${resultB.time.mean.toFixed(3)} ± ${resultB.time.std.toFixed(3)}`);
    doc.text(`CPU (%): ${resultB.cpu.mean.toFixed(2)} ± ${resultB.cpu.std.toFixed(2)}`);
    doc.text(`RAM (MB): ${resultB.ram.mean.toFixed(1)} ± ${resultB.ram.std.toFixed(1)}`);
    doc.text(`Energía (kWh): ${resultB.energy.mean.toFixed(6)} ± ${resultB.energy.std.toFixed(6)}`);
    doc.text(`CO₂ (kg): ${resultB.co2.mean.toFixed(6)} ± ${resultB.co2.std.toFixed(6)}`);
    doc.moveDown();

    doc.fontSize(14).text('Comparación:');
    doc.text(`Más eficiente: Software ${comparison.moreEfficient}`);
    doc.text(`Diferencia de energía: ${comparison.difference.toFixed(6)} kWh`);
    const cvA = (resultA.energy.std / (resultA.energy.mean || 1)) * 100;
    const cvB = (resultB.energy.std / (resultB.energy.mean || 1)) * 100;
    doc.text(`Índice de incertidumbre (CV%): A=${cvA.toFixed(2)}%  B=${cvB.toFixed(2)}%`);

    doc.end();
    await new Promise(resolve => stream.on('finish', resolve));
    return Buffer.concat(chunks);
  } catch (err) {
    console.error('Error generando PDF:', err);
    throw new Error('Error generando el PDF');
  }
}
