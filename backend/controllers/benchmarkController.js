// controllers/benchmarkController.js

import { runBenchmark } from '../services/benchmarkService.js';
import { generateReportPDF } from '../services/pdfService.js';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

export const compareSoftwares = async (req, res) => {
  try {
    // Espera dos archivos ZIP: softwareA y softwareB
    const { files } = req;
    if (!files || !files.softwareA || !files.softwareB) {
      return res.status(400).json({ error: 'Se requieren dos archivos ZIP: softwareA y softwareB' });
    }

    // Guardar y descomprimir ambos ZIP
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const extractZip = (file, name) => {
      const zipPath = path.join(tempDir, file[0].filename);
      const extractPath = path.join(tempDir, name + '_' + Date.now());
      const zip = new AdmZip(zipPath);
      zip.extractAllTo(extractPath, true);
      return extractPath;
    };

    const pathA = extractZip(files.softwareA, 'A');
    const pathB = extractZip(files.softwareB, 'B');

    // Ejecutar benchmark (ahora devuelve estadísticas: mean y std)
    // Allow client to request a different number of runs via form field 'runs'
    const runsRequested = req.body && req.body.runs ? parseInt(req.body.runs, 10) : undefined;
    const runs = Number.isInteger(runsRequested) && runsRequested > 0 ? runsRequested : undefined;
    const resultA = await runBenchmark({ name: 'SoftwareA', path: pathA }, runs);
    const resultB = await runBenchmark({ name: 'SoftwareB', path: pathB }, runs);

    const comparison = {
      moreEfficient: (resultA.energy.mean || 0) < (resultB.energy.mean || 0) ? 'A' : 'B',
      difference: Math.abs((resultA.energy.mean || 0) - (resultB.energy.mean || 0)),
    };

    const pdfBuffer = await generateReportPDF(resultA, resultB, comparison);

    // Generar nombre único: reporte_DDMMYYYYHHMM.pdf
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const fecha = `${pad(now.getDate())}${pad(now.getMonth()+1)}${now.getFullYear()}`;
    const hora = `${pad(now.getHours())}${pad(now.getMinutes())}`;
    const fileName = `reporte_${fecha}${hora}.pdf`;
    const docsDir = path.join(process.cwd(), '../docs');
    if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
    const filePath = path.join(docsDir, fileName);
    fs.writeFileSync(filePath, pdfBuffer);

    // Calcular índice de incertidumbre (coeficiente de variación de la energía en %)
    const cvA = (resultA.energy.std / (resultA.energy.mean || 1)) * 100;
    const cvB = (resultB.energy.std / (resultB.energy.mean || 1)) * 100;
    const uncertaintyIndex = Math.max(cvA, cvB).toFixed(2);

    // Devolver encabezados con metadatos para que el frontend los muestre
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'X-SoftwareA-Name': resultA.name,
      'X-SoftwareB-Name': resultB.name,
      'X-SoftwareA-Energy-Mean': resultA.energy.mean.toString(),
      'X-SoftwareB-Energy-Mean': resultB.energy.mean.toString(),
      'X-Uncertainty-Index': uncertaintyIndex,
    });
    res.send(pdfBuffer);

    // Limpieza asíncrona de archivos temporales (intento, no bloqueante)
    try {
      // eliminar carpetas extraídas
      if (pathA && fs.existsSync(pathA)) {
        fs.rmSync(pathA, { recursive: true, force: true });
      }
      if (pathB && fs.existsSync(pathB)) {
        fs.rmSync(pathB, { recursive: true, force: true });
      }
      // eliminar zips subidos
      try {
        const zipA = path.join(tempDir, files.softwareA[0].filename);
        if (fs.existsSync(zipA)) fs.unlinkSync(zipA);
      } catch (e) {
        // ignore
      }
      try {
        const zipB = path.join(tempDir, files.softwareB[0].filename);
        if (fs.existsSync(zipB)) fs.unlinkSync(zipB);
      } catch (e) {
        // ignore
      }
      // Si tempDir quedó vacío, eliminarlo
      try {
        const remaining = fs.readdirSync(tempDir);
        if (!remaining || remaining.length === 0) fs.rmdirSync(tempDir);
      } catch (e) {
        // ignore
      }
    } catch (cleanupErr) {
      console.error('Error durante limpieza de temp:', cleanupErr);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
