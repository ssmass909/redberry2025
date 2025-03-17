export interface Status {
  id: number;
  name: string;
}

export interface Priority {
  id: number;
  name: string;
  icon: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: number;
}
export interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: Status;
  priority: Priority;
  department: Department;
  employee: Employee;
  total_comments: number;
}

export type ActiveFilter = "DEPARTMENT" | "PRIORITY" | "EMPLOYEE" | null;
export type FilterOptionType = Partial<Department & Employee & Priority> & { id: number; name: string };
export type TempFilterAction = "APPLY" | "RESET" | "ADD" | "REMOVE";
