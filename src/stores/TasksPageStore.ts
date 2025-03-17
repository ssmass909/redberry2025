import { action, computed, makeObservable, observable } from "mobx";
import { ActiveFilter, Department, Employee, Priority, TempFilterAction } from "../types";
import DataStore from "./DataStore";

class TasksPageStore {
  activeFilter: ActiveFilter = null;
  departmentFilter: Department[] = [];
  priorityFilter: Priority[] = [];
  employeeFilter: Employee[] = [];
  tempFilter: (Department | Employee | Priority)[] = [];
  dataStore?: DataStore;

  constructor() {
    makeObservable(this, {
      activeFilter: observable,
      departmentFilter: observable,
      priorityFilter: observable,
      employeeFilter: observable,
      tempFilter: observable,
      dataStore: observable,
      setDataStore: action,
      updateFilter: action,
      setTempFilter: action,
      setActiveFilter: action,
      filteredTasks: computed,
      currentFilterInfo: computed,
    });
  }

  setDataStore(newValue: DataStore) {
    this.dataStore = newValue;
  }

  get currentFilterInfo() {
    if (!this.dataStore) return { options: [], filter: [] };
    switch (this.activeFilter) {
      case "DEPARTMENT":
        return {
          options: this.dataStore.departments,
          filter: this.departmentFilter,
        };
      case "EMPLOYEE":
        return { options: this.dataStore.employees, filter: this.employeeFilter };
      case "PRIORITY":
        return { options: this.dataStore.priorities, filter: this.priorityFilter };
      default:
        return { options: [], filter: [] };
    }
  }

  get filteredTasks() {
    if (!this.dataStore) return [];

    const [employeeFilterEmpty, departmentFilterEmpty, priorityFilterEmpty] = [
      this.employeeFilter.length === 0,
      this.departmentFilter.length === 0,
      this.priorityFilter.length === 0,
    ];

    let result = this.dataStore.tasks;
    if (!employeeFilterEmpty) result = result.filter((task) => task.employee.id === this.employeeFilter[0]?.id);
    if (!departmentFilterEmpty)
      result = result.filter((task) => this.departmentFilter.map((el) => el.id).includes(task.department.id));
    if (!priorityFilterEmpty)
      result = result.filter((task) => this.priorityFilter.map((el) => el.id).includes(task.priority.id));

    return result;
  }

  setTempFilter(newValue: typeof this.tempFilter) {
    this.tempFilter = newValue;
  }

  updateFilter(tempFilterOption: TempFilterAction, id: number) {
    if (!this.dataStore) return;

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

  setActiveFilter(newValue: ActiveFilter) {
    this.activeFilter = newValue;
  }
}

export default TasksPageStore;
