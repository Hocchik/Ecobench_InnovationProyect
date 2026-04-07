import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { SalesTable } from './components/SalesTable';
import { SaleDetailsModal } from './components/SaleDetailsModal';
import { AddSaleModal } from './components/AddSaleModal';
import { mockSales, getSaleDetail } from './data/salesData';
import { Sale, SaleDetail, SaleFormData, SaleStatus } from './data/interfaces';

function AuxiliarySales() {
  const [currentMonth, setCurrentMonth] = useState<number>(1); // Enero por defecto
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [addSaleOpen, setAddSaleOpen] = useState<boolean>(false);
  const [selectedSale, setSelectedSale] = useState<SaleDetail | null>(null);

  // Cargar las ventas del mes actual
  useEffect(() => {
    setLoading(true);
    // Simulamos una carga desde API
    setTimeout(() => {
      setSales(mockSales[currentMonth] || []);
      setLoading(false);
    }, 500);
  }, [currentMonth]);

  const handleViewDetails = (sale: Sale) => {
    try {
      const saleDetail = getSaleDetail(sale.id);
      setSelectedSale(saleDetail);
      setDetailsOpen(true);
    } catch (error) {
      console.error('Error al obtener detalles de venta:', error);
    }
  };

  const handleMonthChange = (month: number) => {
    setCurrentMonth(month);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handleAddSale = () => {
    setAddSaleOpen(true);
  };

  const handleCloseAddSale = () => {
    setAddSaleOpen(false);
  };

  const handleStatusChange = (saleId: string, newStatus: SaleStatus, paymentProof?: File) => {
    // En una implementación real, aquí enviaríamos los datos a una API
    // y actualizaríamos el estado después de recibir una respuesta exitosa
    
    console.log(`Actualizando estado de venta ${saleId} a ${newStatus}`);
    if (paymentProof) {
      console.log(`Comprobante adjunto: ${paymentProof.name}`);
    }
    
    // Actualizar el estado local para reflejar el cambio
    setSales(prevSales => 
      prevSales.map(sale => 
        sale.id === saleId ? { ...sale, status: newStatus } : sale
      )
    );
  };

  const handleSaveSale = (formData: SaleFormData) => {
    // En una implementación real, aquí enviaríamos los datos a una API
    // y actualizaríamos el estado después de recibir una respuesta exitosa
    
    console.log('Guardando nueva venta:', formData);
    
    // Simulamos la creación de una nueva venta y la agregamos al estado local
    const newSale: Sale = {
      id: `new-${Date.now()}`,
      date: new Date().getDate().toString().padStart(2, '0') + '/' + (currentMonth.toString().padStart(2, '0')),
      client: formData.client,
      concept: formData.concept,
      voucher: formData.voucher,
      amount: formData.amount,
      dueDate: formData.dueDate,
      paymentDate: null,
      voucherNumber: formData.voucher === 'FACTURA' ? 'F001-' + Math.floor(100000 + Math.random() * 900000) : formData.voucher,
      status: 'Por cobrar'
    };
    
    // Actualizar el estado local
    setSales(prevSales => [newSale, ...prevSales]);
  };

  return (
    <Box sx={{ height: '100%', p: { xs: 1, sm: 2 } }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <SalesTable
          sales={sales}
          currentMonth={currentMonth}
          onViewDetails={handleViewDetails}
          onMonthChange={handleMonthChange}
          onAddSale={handleAddSale}
          loading={loading}
        />

        <SaleDetailsModal
          open={detailsOpen}
          onClose={handleCloseDetails}
          sale={selectedSale}
          onStatusChange={handleStatusChange}
        />

        <AddSaleModal
          open={addSaleOpen}
          onClose={handleCloseAddSale}
          onSave={handleSaveSale}
        />
      </Container>
    </Box>
  );
}

export default AuxiliarySales;