// DayAttendance.ts
export interface DayAttendance {
  id_attendance: string;         // UUID
  id_technician: string;         // UUID
  name_technician: string;
  entry_time: string;            // HH:mm:ss
  exit_time: string;             // HH:mm:ss
  is_present: boolean;
}

// HistoryAttendanceTech.ts
export interface HistoryAttendanceTech {
  id_attendance: string;         // UUID
  id_technician: string;         // UUID
  date: string;                  // yyyy-MM-dd
  entry_time: string;            // HH:mm:ss
  exit_time: string;             // HH:mm:ss
  hours_worked: string;          // "8.00"
  overtime: string;              // "0.00"
  isPresent: boolean;
}

// UpdateAttendance.ts
export interface UpdateAttendance {
  entry_time: string;            // HH:mm:ss
  exit_time: string;             // HH:mm:ss
  is_present: boolean;
}

export interface CreateAttendance {
  id_technician: string;       // UUID del técnico
  date: string;                // formato "YYYY-MM-DD"
  entry_time: string;          // formato "HH:mm"
  exit_time: string;           // formato "HH:mm"
  is_present: boolean;
}