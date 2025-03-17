import { action, computed, makeObservable, observable } from "mobx";
import { ActiveFilter, Department, Employee, TempFilterOption, Priority, Status, Task } from "../types";
import api from "../utils/api";

class TasksPageStore {
  tasks: Task[] = [];
  priorities: Priority[] = [];
  departments: Department[] = [];
  employees: Employee[] = [];
  taskStatuses: Status[] = [];
  activeFilter: ActiveFilter = null;
  departmentFilter: Department[] = [];
  priorityFilter: Priority[] = [];
  employeeFilter: Employee[] = [];
  tempFilter: (Department | Employee | Priority)[] = [];
  createEmployeeModalOpen = false;

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
      tempFilter: observable,
      taskStatuses: observable,
      createEmployeeModalOpen: observable,
      setTasks: action,
      setPriorities: action,
      setDepartments: action,
      setActiveFilter: action,
      setEmployees: action,
      setTaskStatuses: action,
      updateFilter: action,
      setTempFilter: action,
      setCreateEmployeeModalOpen: action,
      filteredTasks: computed,
      currentFilterInfo: computed,
    });
  }

  get currentFilterInfo() {
    switch (this.activeFilter) {
      case "DEPARTMENT":
        return {
          options: this.departments,
          filter: this.departmentFilter,
        };
      case "EMPLOYEE":
        return { options: this.employees, filter: this.employeeFilter };
      case "PRIORITY":
        return { options: this.priorities, filter: this.priorityFilter };
      default:
        return { options: [], filter: [] };
    }
  }

  get filteredTasks() {
    const [employeeFilterEmpty, departmentFilterEmpty, priorityFilterEmpty] = [
      this.employeeFilter.length === 0,
      this.departmentFilter.length === 0,
      this.priorityFilter.length === 0,
    ];

    let result = this.tasks;
    if (!employeeFilterEmpty) result = result.filter((task) => task.employee.id === this.employeeFilter[0]?.id);
    if (!departmentFilterEmpty)
      result = result.filter((task) => this.departmentFilter.map((el) => el.id).includes(task.department.id));
    if (!priorityFilterEmpty)
      result = result.filter((task) => this.priorityFilter.map((el) => el.id).includes(task.priority.id));

    return result;
  }

  setCreateEmployeeModalOpen(newValue: boolean) {
    this.createEmployeeModalOpen = newValue;
  }

  setTempFilter(newValue: typeof this.tempFilter) {
    this.tempFilter = newValue;
  }

  updateFilter(tempFilterOption: TempFilterOption, id: number) {
    switch (tempFilterOption) {
      case undefined:
        break;
      case "RESET":
        this.tempFilter.length = 0;
        return;
      case "ADD":
        const addedOption = this.currentFilterInfo.options.filter((op) => op.id === id)[0];
        if (!addedOption) throw new Error("Something weird happened whilst adding option in filter!");
        this.tempFilter.push(addedOption);
        return;
      case "REMOVE":
        this.tempFilter = this.tempFilter.filter((op) => op.id !== id);
        return;
      case "APPLY":
        switch (this.activeFilter) {
          case "DEPARTMENT":
            this.departmentFilter = this.tempFilter as Department[];
            break;
          case "EMPLOYEE":
            this.employeeFilter = this.tempFilter as Employee[];
            break;
          case "PRIORITY":
            this.priorityFilter = this.tempFilter as Priority[];
        }
        this.tempFilter = [];
        return;
    }
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

export default TasksPageStore;
