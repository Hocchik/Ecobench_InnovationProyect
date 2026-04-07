import { useState, useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'EcoBench';
  }, []);
  const [softwareA, setSoftwareA] = useState(null);
  const [softwareB, setSoftwareB] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [meta, setMeta] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!softwareA || !softwareB) {
      setError('Selecciona ambos archivos ZIP.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('softwareA', softwareA);
    formData.append('softwareB', softwareB);
    try {
      const response = await fetch('http://localhost:3001/api/benchmark', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Error en el análisis');
      }

      // Leer metadatos desde encabezados
      const headerNameA = response.headers.get('X-SoftwareA-Name') || '';
      const headerNameB = response.headers.get('X-SoftwareB-Name') || '';
      const energyA = response.headers.get('X-SoftwareA-Energy-Mean') || '';
      const energyB = response.headers.get('X-SoftwareB-Energy-Mean') || '';
      const uncertainty = response.headers.get('X-Uncertainty-Index') || '';
      setMeta({ nameA: headerNameA, nameB: headerNameB, energyA, energyB, uncertainty });

      const blob = await response.blob();
      // Descargar el PDF
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte_${headerNameA || 'A'}_vs_${headerNameB || 'B'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Error al analizar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const shortName = (f) => {
    if (!f) return '';
    return f.name.length > 28 ? f.name.slice(0, 25) + '...' : f.name;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-xl bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-emerald-300 mb-1">EcoBench</h1>
          <p className="text-gray-300 mb-6">Comparador Energético de Software</p>
        </div>

        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">Software A (ZIP)</label>
            <label className="flex items-center justify-between cursor-pointer bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 hover:bg-gray-700 transition">
              <span className="flex-1 text-gray-300 font-medium">{softwareA ? shortName(softwareA) : 'Selecciona archivo ZIP...'}</span>
              <input type="file" accept=".zip" onChange={e => setSoftwareA(e.target.files[0])} className="hidden" required />
              <span className="ml-4 bg-emerald-600 text-white px-3 py-1 rounded text-sm font-semibold">Elegir</span>
            </label>
            <p className="text-xs text-gray-400 mt-1">Formato ZIP con el código o build del software.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">Software B (ZIP)</label>
            <label className="flex items-center justify-between cursor-pointer bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 hover:bg-gray-700 transition">
              <span className="flex-1 text-gray-300 font-medium">{softwareB ? shortName(softwareB) : 'Selecciona archivo ZIP...'}</span>
              <input type="file" accept=".zip" onChange={e => setSoftwareB(e.target.files[0])} className="hidden" required />
              <span className="ml-4 bg-sky-600 text-white px-3 py-1 rounded text-sm font-semibold">Elegir</span>
            </label>
            <p className="text-xs text-gray-400 mt-1">Puedes subir dos versiones para comparar.</p>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div className="pt-2">
            <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold py-3 rounded-lg shadow-md hover:from-emerald-600 hover:to-teal-600 transition disabled:opacity-60" disabled={loading}>
              {loading ? 'Analizando...' : 'Comparar y Descargar PDF'}
            </button>
          </div>
        </form>

        {meta && (
          <div className="mt-6 bg-gray-900/60 border border-gray-700 rounded p-4 text-sm text-gray-200">
            <div className="font-semibold text-gray-100">Resultados</div>
            <div className="mt-2">Software A: <span className="font-medium">{meta.nameA || '-'}</span> — Energía: <span className="font-medium">{meta.energyA || '-'}</span> kWh</div>
            <div>Software B: <span className="font-medium">{meta.nameB || '-'}</span> — Energía: <span className="font-medium">{meta.energyB || '-'}</span> kWh</div>
            <div className="mt-1">Índice de incertidumbre (CV%): <span className="font-medium">{meta.uncertainty || '-'}</span>%</div>
          </div>
        )}

        <div className="mt-6 text-center text-gray-400 text-xs">Desarrollado con React · Vite · Tailwind</div>
      </div>
    </div>
  );
}

export default App;
