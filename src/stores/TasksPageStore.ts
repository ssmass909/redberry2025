import { action, computed, makeObservable, observable, toJS } from "mobx";
import { ActiveFilter, Department, Employee, Priority, Task, TempFilterAction } from "../types";
import DataStore from "./DataStore";
import FilterStore from "./Filter";

class TasksPageStore {
  activeFilter: ActiveFilter = null;
  departmentFilter: FilterStore<Department> = new FilterStore();
  priorityFilter: FilterStore<Priority> = new FilterStore();
  employeeFilter: FilterStore<Employee> = new FilterStore({ multiSelect: false });
  dataStore?: DataStore;

  constructor() {
    makeObservable(this, {
      activeFilter: observable,
      dataStore: observable,
      departmentFilter: observable,
      priorityFilter: observable,
      employeeFilter: observable,
      setDataStore: action,
      updateFilter: action,
      setActiveFilter: action,
      filteredTasks: computed,
      currentFilter: computed,
    });
  }

  setDataStore(newValue: DataStore) {
    this.dataStore = newValue;
  }

  updateFilterOptions(dataStore?: DataStore) {
    if (!dataStore && !this.dataStore) throw new Error("no source for data");
    const source = (dataStore ? dataStore : this.dataStore) as DataStore;
    this.departmentFilter.setOptions(source.departments);
    this.employeeFilter.setOptions(source.employees);
    this.priorityFilter.setOptions(source.priorities);
  }

  get currentFilter() {
    if (!this.dataStore) return null;
    let currentFilter = this.departmentFilter;
    if (this.activeFilter === "EMPLOYEE") currentFilter = this.employeeFilter;
    if (this.activeFilter === "PRIORITY") currentFilter = this.priorityFilter;

    return currentFilter;
  }

  get filteredTasks() {
    if (!this.dataStore) return;
    const [employeeFilterEmpty, departmentFilterEmpty, priorityFilterEmpty] = [
      this.employeeFilter.filter.length === 0,
      this.departmentFilter.filter.length === 0,
      this.priorityFilter.filter.length === 0,
    ];

    let result = this.dataStore.tasks;
    if (!employeeFilterEmpty) result = result.filter((task) => task.employee.id === this.employeeFilter.options[0].id);
    if (!departmentFilterEmpty)
      result = result.filter((task) => this.departmentFilter.filter.map((el) => el.id).includes(task.department.id));
    if (!priorityFilterEmpty)
      result = result.filter((task) => this.priorityFilter.filter.map((el) => el.id).includes(task.priority.id));

    return result;
  }

  updateFilter(tempFilterAction: TempFilterAction, id: number) {
    let filterToUpdate = this.currentFilter;
    if (!filterToUpdate) return;

    filterToUpdate.updateFilter(tempFilterAction, id);
  }

  setActiveFilter(newValue: ActiveFilter) {
    this.activeFilter = newValue;
  }
}

export default TasksPageStore;
