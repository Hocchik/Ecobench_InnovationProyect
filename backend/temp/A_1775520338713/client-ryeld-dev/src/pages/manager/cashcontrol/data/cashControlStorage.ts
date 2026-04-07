import { AuxiliaryCash, TechnicianCash } from './cashControlData';

const AUXILIARY_CASH_KEY = 'auxiliaryCashData';
const TECHNICIANS_CASH_KEY = 'techniciansCashData';

export class CashControlStorage {
  // Auxiliary Cash Methods
  static getAuxiliaryCashData(): AuxiliaryCash | null {
    try {
      const data = localStorage.getItem(AUXILIARY_CASH_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading auxiliary cash data from localStorage:', error);
      return null;
    }
  }

  static saveAuxiliaryCashData(data: AuxiliaryCash): void {
    try {
      localStorage.setItem(AUXILIARY_CASH_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving auxiliary cash data to localStorage:', error);
    }
  }

  // Technicians Cash Methods
  static getTechniciansCashData(): TechnicianCash[] | null {
    try {
      const data = localStorage.getItem(TECHNICIANS_CASH_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading technicians cash data from localStorage:', error);
      return null;
    }
  }

  static saveTechniciansCashData(data: TechnicianCash[]): void {
    try {
      localStorage.setItem(TECHNICIANS_CASH_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving technicians cash data to localStorage:', error);
    }
  }

  // Initialize with default data if not exists
  static initializeData(defaultAuxiliary: AuxiliaryCash, defaultTechnicians: TechnicianCash[]): void {
    if (!this.getAuxiliaryCashData()) {
      this.saveAuxiliaryCashData(defaultAuxiliary);
    }
    if (!this.getTechniciansCashData()) {
      this.saveTechniciansCashData(defaultTechnicians);
    }
  }

  // Clear all data (for testing or reset purposes)
  static clearAllData(): void {
    localStorage.removeItem(AUXILIARY_CASH_KEY);
    localStorage.removeItem(TECHNICIANS_CASH_KEY);
  }
}
