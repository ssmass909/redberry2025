import { action, computed, makeObservable, observable, reaction, toJS } from "mobx";
import { ActiveFilter, Department, Employee, PriorityType, Task, TempFilterAction } from "../types";
import DataStore from "./DataStore";
import FilterStore from "./Filter";

class TasksPageStore {
  activeFilter: ActiveFilter = null;
  departmentFilter: FilterStore<Department> = new FilterStore();
  priorityFilter: FilterStore<PriorityType> = new FilterStore();
  employeeFilter: FilterStore<Employee> = new FilterStore({ multiSelect: false, options: [] });
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
      filtersEmpty: computed,
    });

    this.loadFiltersFromSessionStorage();

    reaction(
      () => ({
        departmentFilter: toJS(this.departmentFilter.filter),
        priorityFilter: toJS(this.priorityFilter.filter),
        employeeFilter: toJS(this.employeeFilter.filter),
      }),
      (filters) => {
        localStorage.setItem("taskFilters", JSON.stringify(filters));
      }
    );
  }

  loadFiltersFromSessionStorage() {
    const savedFilters = localStorage.getItem("taskFilters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);

      this.departmentFilter.tempFilter = parsedFilters.departmentFilter || [];
      this.priorityFilter.tempFilter = parsedFilters.priorityFilter || [];
      this.employeeFilter.tempFilter = parsedFilters.employeeFilter || [];

      this.departmentFilter.updateFilter("APPLY");
      this.employeeFilter.updateFilter("APPLY");
      this.priorityFilter.updateFilter("APPLY");
    }
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

  getCurrentFilter(filter?: ActiveFilter) {
    let src = filter || this.activeFilter;
    let currentFilter = this.departmentFilter;
    if (src === "EMPLOYEE") currentFilter = this.employeeFilter;
    if (src === "PRIORITY") currentFilter = this.priorityFilter;

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

  get filtersEmpty() {
    return (
      this.employeeFilter.filter.length === 0 &&
      this.priorityFilter.filter.length === 0 &&
      this.departmentFilter.filter.length === 0
    );
  }

  updateFilter(tempFilterAction: TempFilterAction, id: number) {
    let filterToUpdate = this.getCurrentFilter();
    if (!filterToUpdate) return;

    filterToUpdate.updateFilter(tempFilterAction, id);
  }

  setActiveFilter(newValue: ActiveFilter) {
    this.activeFilter = newValue;
  }
}

export default TasksPageStore;
