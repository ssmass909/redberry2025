import { action, makeObservable, observable } from "mobx";
import { Task, PriorityType, Department, Employee, Status } from "../types";
import api from "../utils/api";

class DataStore {
  tasks: Task[] = [];
  priorities: PriorityType[] = [];
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

  setPriorities(newValue: PriorityType[]) {
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

  async fetchEverything() {
    await Promise.all([
      this.fetchTasks(),
      this.fetchPriorities(),
      this.fetchDepartments(),
      this.fetchEmployees(),
      this.fetchStatuses(),
    ]);
  }

  async fetchTasks() {
    try {
      const tasks = (await api.get<Task[]>("/tasks")).data;
      this.setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchPriorities() {
    try {
      const priorities = (await api.get<PriorityType[]>("/priorities")).data;
      this.setPriorities(priorities);
    } catch (e) {
      console.error(e);
    }
  }
  async fetchDepartments() {
    try {
      const departments = (await api.get<Department[]>("/departments")).data;
      this.setDepartments(departments);
    } catch (e) {
      console.error(e);
    }
  }
  async fetchEmployees() {
    try {
      const employees = (await api.get<Employee[]>("/employees")).data;
      this.setEmployees(employees);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchStatuses() {
    try {
      const statuses = (await api.get<Status[]>("/statuses")).data;
      this.setTaskStatuses(statuses);
    } catch (e) {
      console.error(e);
    }
  }
}

export default DataStore;
