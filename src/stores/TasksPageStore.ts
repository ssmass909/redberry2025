import { action, computed, makeObservable, observable } from "mobx";
import { ActiveFilter, Department, Employee, Priority, Task } from "../types";
import api from "../utils/api";

class TasksPageStore {
  tasks: Task[] = [];
  priorities: Priority[] = [];
  departments: Department[] = [];
  employees: Employee[] = [];
  activeFilter: ActiveFilter = null;
  departmentFilter: Department[] = [];
  priorityFilter: Priority[] = [];
  employeeFilter: Employee | null = null;

  constructor() {
    makeObservable(this, {
      tasks: observable,
      priorities: observable,
      departments: observable,
      employees: observable,
      activeFilter: observable,
      departmentFilter: observable,
      priorityFilter: observable,
      employeeFilter: observable,
      setTasks: action,
      setPriorities: action,
      setDepartments: action,
      setActiveFilter: action,
      setEmployees: action,
      changeDepartmentFilter: action,
      changePriorityFilter: action,
      changeEmployeeFilter: action,
      filteredTasks: computed,
    });
  }

  get filteredTasks() {
    return this.tasks.filter((task) => {
      if (task.employee.id !== this.employeeFilter?.id) return false;
      if (!this.departmentFilter.includes(task.department)) return false;
      if (!this.priorityFilter.includes(task.priority)) return false;
      return true;
    });
  }

  changeDepartmentFilter(add: boolean, id: number) {
    if (add) {
      const department = this.departments.filter((dep) => dep.id === id)[0];
      if (!department) throw new Error("Something weird happened whilst adding department in filter!");
      this.departmentFilter.push(department);
      return;
    }

    const newValue = this.departmentFilter.filter((dep) => dep.id !== id);
    this.departmentFilter = newValue;
  }

  changePriorityFilter(add: boolean, id: number) {
    if (add) {
      const priority = this.priorities.filter((prio) => prio.id === id)[0];
      if (!priority) throw new Error("Something weird happened whilst adding priority in filter!");
      this.priorityFilter.push(priority);
      return;
    }

    const newValue = this.priorityFilter.filter((prio) => prio.id !== id);
    this.priorityFilter = newValue;
  }

  changeEmployeeFilter(id: number) {
    if (this.employeeFilter?.id === id) {
      this.employeeFilter = null;
      return;
    }

    const employee = this.employees.filter((emp) => emp.id === id)[0];
    this.employeeFilter = employee;
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

  setActiveFilter(newValue: ActiveFilter) {
    this.activeFilter = newValue;
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
}

export default TasksPageStore;
