import React, { createContext, useContext, useState, useCallback } from 'react';
import AttendaceSupervisorService from '../api/AttendanceSupervisorService';
import { Attendance, DayAttendanceDTO, HistoryAttendaceTechDTO, Technician } from '../data/attendanceType';

interface AttendanceContextType {
  loading: boolean;
  error: string | null;
  dayAttendances: DayAttendanceDTO[];
  technicianHistory: HistoryAttendaceTechDTO[];
  technicians: Technician[];
  onlyTechnicians: Technician[];
  onlySupervisors: Technician[];

  getAttendanceByDate: (date: string) => Promise<void>;
  getAttendanceHistory: (technicianId: number, month: number, year: number) => Promise<void>;
  markAttendance: (attendance: Attendance) => Promise<void>;
  markMultipleAttendance: (attendances: Attendance[]) => Promise<void>;
  getTechnicians: () => Promise<void>;
  getTechnicianswithoutSupervisor: () => Promise<void>;
  getSupervisors: () => Promise<void>;
  clearError: () => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance debe ser usado dentro de un AttendanceProvider');
  }
  return context;
};

interface AttendanceProviderProps {
  children: React.ReactNode;
}

export const AttendanceProvider: React.FC<AttendanceProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dayAttendances, setDayAttendances] = useState<DayAttendanceDTO[]>([]);
  const [technicianHistory, setTechnicianHistory] = useState<HistoryAttendaceTechDTO[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [onlyTechnicians, setOnlyTechnicians] = useState<Technician[]>([]);
  const [onlySupervisors, setOnlySupervisors] = useState<Technician[]>([]);

  // 🔹 Obtener lista de supervisores
  const getSupervisors = useCallback(async () => {
    setLoading(true);
    try {
      const data: Technician[] = await AttendaceSupervisorService.getSupervisors();
      setOnlySupervisors(data);
    } catch (err) {
      setError('Error al obtener la lista de supervisores');
      console.error(err);
    } finally {
        setLoading(false);
      }
  }, [])



  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 🔹 Obtener lista de técnicos sin supervisor
  const getTechnicianswithoutSupervisor = useCallback(async () => {
    setLoading(true);
    try {
      const data: Technician[] = await AttendaceSupervisorService.getTechnicianswithoutSupervisor();
      setOnlyTechnicians(data);
    } catch (err) {
      setError('Error al obtener la lista de técnicos');
      console.error(err);
    } finally {
        setLoading(false);
      }
  }, [])

  // 🔹 Obtener lista de técnicos
  const getTechnicians = useCallback(async () => {
    setLoading(true);
    try {
      const data: Technician[] = await AttendaceSupervisorService.getTechnicians();
      setTechnicians(data);
    } catch (err) {
      setError('Error al obtener la lista de técnicos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);



  // 🔹 Obtener asistencias por fecha
  const getAttendanceByDate = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const data: DayAttendanceDTO[] = await AttendaceSupervisorService.getAttendanceByDate(date);
      setDayAttendances(data);
    } catch (err) {
      setError('Error al obtener las asistencias del día');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Obtener historial de asistencia por técnico y período
  const getAttendanceHistory = useCallback(async (technicianId: number, month: number, year: number) => {
    setLoading(true);
    try {
      const data: HistoryAttendaceTechDTO[] = await AttendaceSupervisorService.getAttendanceHistory(technicianId, month, year);
      setTechnicianHistory(data);
    } catch (err) {
      setError('Error al obtener el historial de asistencias');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Marcar asistencia individual
  const markAttendance = useCallback(async (attendance: Attendance) => {
    setLoading(true);
    try {
      await AttendaceSupervisorService.markAttendance([attendance]);
      await getAttendanceByDate(attendance.date);
    } catch (err) {
      setError('Error al marcar la asistencia');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getAttendanceByDate]);

  // 🔹 Marcar múltiples asistencias
  const markMultipleAttendance = useCallback(async (attendances: Attendance[]) => {
    setLoading(true);
    try {
      await AttendaceSupervisorService.markAttendance(attendances);
      if (attendances.length > 0) {
        await getAttendanceByDate(attendances[0].date);
      }
    } catch (err) {
      setError('Error al marcar múltiples asistencias');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getAttendanceByDate]);

  const value = {
    loading,
    error,
    dayAttendances,
    technicianHistory,
    technicians,
    onlyTechnicians,
    onlySupervisors,
    getAttendanceByDate,
    getAttendanceHistory,
    markAttendance,
    markMultipleAttendance,
    getTechnicians,
    getTechnicianswithoutSupervisor,
    getSupervisors,
    clearError
  };

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>;
};