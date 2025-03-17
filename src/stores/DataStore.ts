import { action, makeObservable, observable } from "mobx";
import { Task, Priority, Department, Employee, Status } from "../types";
import api from "../utils/api";

class DataStore {
  tasks: Task[] = [];
  priorities: Priority[] = [];
  departments: Department[] = [];
  employees: Employee[] = [];
  taskStatuses: Status[] = [];

  constructor() {
    makeObservable(this, {
      tasks: observable,
      priorities: observable,
      departments: observable,
      employees: observable,
      taskStatuses: observable,
      setTasks: action,
      setPriorities: action,
      setDepartments: action,
      setEmployees: action,
      setTaskStatuses: action,
    });
  }

  setTasks(newValue: Task[]) {
    this.tasks = newValue;
  }

  setPriorities(newValue: Priority[]) {
    this.priorities = newValue;
  }

  setDepartments(newValue: Department[]) {
    this.departments = newValue;
  }

  setEmployees(newValue: Employee[]) {
    this.employees = newValue;
  }
  setTaskStatuses(newValue: Status[]) {
    this.taskStatuses = newValue;
  }

  async fetchTasks() {
    try {
      const tasks = (await api.get<Task[]>("/tasks")).data;
      console.log("CLIENT: tasks from server:", tasks);
      this.setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchPriorities() {
    try {
      const priorities = (await api.get<Priority[]>("/priorities")).data;
      console.log("CLIENT: priorities from server:", priorities);
      this.setPriorities(priorities);
    } catch (e) {
      console.error(e);
    }
  }
  async fetchDepartments() {
    try {
      const departments = (await api.get<Department[]>("/departments")).data;
      console.log("CLIENT: departments from server:", departments);
      this.setDepartments(departments);
    } catch (e) {
      console.error(e);
    }
  }
  async fetchEmployees() {
    try {
      const employees = (await api.get<Employee[]>("/employees")).data;
      console.log("CLIENT: employees from server:", employees);
      this.setEmployees(employees);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchStatuses() {
    try {
      const statuses = (await api.get<Status[]>("/statuses")).data;
      console.log("CLIENT: statuses from server:", statuses);
      this.setTaskStatuses(statuses);
    } catch (e) {
      console.error(e);
    }
  }
}

export default DataStore;
