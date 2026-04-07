/**
 * API del módulo Output para HR
 * Endpoints relacionados con compras y servicios
 */

import type { 
  Purchase, 
  Service, 
  NewPurchaseData, 
  NewServiceData, 
  PurchaseFilters, 
  ServiceFilters,
  OutputStats,
  CategorySummary,
  ServiceTypeSummary 
} from '../data/interfaces';

// TODO: Implementar cuando el backend esté disponible
// Por ahora retorna datos mock

/** Obtener todas las compras */
export const getPurchases = async (filters?: PurchaseFilters): Promise<Purchase[]> => {
  // return await axios.get('/api/hr/output/purchases', { params: filters });
  const { getFilteredPurchases } = await import('../data/outputData');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFilteredPurchases(filters || {}));
    }, 300);
  });
};

/** Obtener compra por ID */
export const getPurchaseById = async (id: string): Promise<Purchase | null> => {
  // return await axios.get(`/api/hr/output/purchases/${id}`);
  const { mockPurchases } = await import('../data/outputData');
  return new Promise((resolve) => {
    setTimeout(() => {
      const purchase = mockPurchases.find(p => p.id === id);
      resolve(purchase || null);
    }, 200);
  });
};

/** Crear nueva compra */
export const createPurchase = async (data: NewPurchaseData): Promise<Purchase> => {
  // return await axios.post('/api/hr/output/purchases', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPurchase: Purchase = {
        id: `PUR-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        description: data.description,
        paymentType: data.paymentType,
        category: data.category,
        voucher: data.voucher,
        voucherNumber: `${data.voucher === 'Factura' ? 'F' : data.voucher === 'Boleta' ? 'B' : 'R'}001-${String(Date.now()).slice(-7)}`,
        amount: data.amount,
        status: 'Pendiente',
        supplier: data.supplier,
        notes: data.notes,
        createdBy: 'Usuario Actual',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        modifiedBy: 'Usuario Actual'
      };
      resolve(newPurchase);
    }, 500);
  });
};

/** Actualizar compra */
export const updatePurchase = async (id: string, data: Partial<Purchase>): Promise<Purchase> => {
  // return await axios.put(`/api/hr/output/purchases/${id}`, data);
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedPurchase: Purchase = {
        id,
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description || '',
        paymentType: data.paymentType || 'Al contado',
        category: data.category || 'Oficina',
        voucher: data.voucher || 'Factura',
        voucherNumber: data.voucherNumber || '',
        amount: data.amount || 0,
        status: data.status || 'Pendiente',
        supplier: data.supplier,
        notes: data.notes,
        createdBy: data.createdBy || 'Usuario Actual',
        createdAt: data.createdAt || new Date().toISOString(),
        lastModified: new Date().toISOString(),
        modifiedBy: 'Usuario Actual'
      };
      resolve(updatedPurchase);
    }, 500);
  });
};

/** Eliminar compra */
export const deletePurchase = async (_id: string): Promise<boolean> => {
  // return await axios.delete(`/api/hr/output/purchases/${id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
};

/** Obtener todos los servicios */
export const getServices = async (filters?: ServiceFilters): Promise<Service[]> => {
  // return await axios.get('/api/hr/output/services', { params: filters });
  const { getFilteredServices } = await import('../data/outputData');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFilteredServices(filters || {}));
    }, 300);
  });
};

/** Obtener servicio por ID */
export const getServiceById = async (id: string): Promise<Service | null> => {
  // return await axios.get(`/api/hr/output/services/${id}`);
  const { mockServices } = await import('../data/outputData');
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = mockServices.find(s => s.id === id);
      resolve(service || null);
    }, 200);
  });
};

/** Crear nuevo servicio */
export const createService = async (data: NewServiceData): Promise<Service> => {
  // return await axios.post('/api/hr/output/services', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newService: Service = {
        id: `SER-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        description: data.description,
        amount: data.amount,
        status: 'Pendiente',
        serviceType: data.serviceType,
        supplier: data.supplier,
        accountNumber: data.accountNumber,
        dueDate: data.dueDate,
        notes: data.notes,
        createdBy: 'Usuario Actual',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        modifiedBy: 'Usuario Actual'
      };
      resolve(newService);
    }, 500);
  });
};

/** Actualizar servicio */
export const updateService = async (id: string, data: Partial<Service>): Promise<Service> => {
  // return await axios.put(`/api/hr/output/services/${id}`, data);
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedService: Service = {
        id,
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description || '',
        amount: data.amount || 0,
        status: data.status || 'Pendiente',
        serviceType: data.serviceType || 'Otros',
        supplier: data.supplier || '',
        accountNumber: data.accountNumber,
        dueDate: data.dueDate,
        paymentProof: data.paymentProof,
        notes: data.notes,
        createdBy: data.createdBy || 'Usuario Actual',
        createdAt: data.createdAt || new Date().toISOString(),
        lastModified: new Date().toISOString(),
        modifiedBy: 'Usuario Actual'
      };
      resolve(updatedService);
    }, 500);
  });
};

/** Eliminar servicio */
export const deleteService = async (_id: string): Promise<boolean> => {
  // return await axios.delete(`/api/hr/output/services/${id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
};

/** Obtener estadísticas de output */
export const getOutputStats = async (): Promise<OutputStats> => {
  // return await axios.get('/api/hr/output/stats');
  const { mockOutputStats } = await import('../data/outputData');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOutputStats);
    }, 200);
  });
};

/** Obtener resumen por categorías */
export const getCategorySummary = async (): Promise<CategorySummary[]> => {
  // return await axios.get('/api/hr/output/category-summary');
  const { mockCategorySummary } = await import('../data/outputData');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategorySummary);
    }, 200);
  });
};

/** Obtener resumen por tipos de servicio */
export const getServiceTypeSummary = async (): Promise<ServiceTypeSummary[]> => {
  // return await axios.get('/api/hr/output/service-type-summary');
  const { mockServiceTypeSummary } = await import('../data/outputData');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockServiceTypeSummary);
    }, 200);
  });
};

/** Marcar compra como pagada */
export const markPurchaseAsPaid = async (id: string): Promise<Purchase> => {
  // return await axios.patch(`/api/hr/output/purchases/${id}/mark-paid`);
  return updatePurchase(id, { status: 'Pagado' });
};

/** Marcar servicio como pagado */
export const markServiceAsPaid = async (id: string): Promise<Service> => {
  // return await axios.patch(`/api/hr/output/services/${id}/mark-paid`);
  return updateService(id, { status: 'Pagado' });
};

/** Exportar datos de compras */
export const exportPurchases = async (format: 'excel' | 'pdf', _filters?: PurchaseFilters): Promise<string> => {
  // return await axios.post('/api/hr/output/purchases/export', { format, filters });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`output_purchases_${new Date().getTime()}.${format === 'excel' ? 'xlsx' : 'pdf'}`);
    }, 1000);
  });
};

/** Exportar datos de servicios */
export const exportServices = async (format: 'excel' | 'pdf', _filters?: ServiceFilters): Promise<string> => {
  // return await axios.post('/api/hr/output/services/export', { format, filters });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`output_services_${new Date().getTime()}.${format === 'excel' ? 'xlsx' : 'pdf'}`);
    }, 1000);
  });
};
