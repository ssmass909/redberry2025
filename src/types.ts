export interface Status {
  id: number;
  name: string;
}

export type PriorityName = "დაბალი" | "საშუალო" | "მაღალი";

export interface PriorityType {
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
  priority: PriorityType;
  department: Department;
  employee: Employee;
  total_comments: number;
}

export interface CommentType {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments?: CommentType[];
}

export type ActiveFilter = "DEPARTMENT" | "PRIORITY" | "EMPLOYEE" | null;
export type FilterOptionType = Partial<Department & Employee & PriorityType> & { id: number; name: string };
export type TempFilterAction = "APPLY" | "RESET" | "ADD" | "REMOVE" | "REVERSE_APPLY";
