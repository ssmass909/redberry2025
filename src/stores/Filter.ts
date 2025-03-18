import { action, makeObservable, observable } from "mobx";
import { TempFilterAction } from "../types";

class FilterStore<T extends { id: number }> {
  options: T[] = [];
  filter: T[] = [];
  tempFilter: T[] = [];
  multiselect = true;

  constructor(config: { options: T[]; multiSelect: boolean } = { options: [], multiSelect: true }) {
    this.options = config.options;
    this.multiselect = !!config?.multiSelect;

    makeObservable(this, {
      options: observable,
      filter: observable,
      tempFilter: observable,
      setOptions: action,
      setTempFilter: action,
      updateFilter: action,
      setFilter: action,
    });
  }

  setOptions(newValue: T[]) {
    this.options = newValue;
  }

  setFilter(newValue: T[]) {
    this.filter = newValue;
  }

  setTempFilter(newValue: typeof this.tempFilter) {
    this.tempFilter = newValue;
  }

  updateFilter(
    tempFilterOption: TempFilterAction,
    id: number = -1,
    customOptions?: Partial<Record<TempFilterAction, (filterObj: typeof this) => void>>
  ) {
    if (customOptions && customOptions[tempFilterOption]) {
      customOptions[tempFilterOption](this);
      return;
    }

    switch (tempFilterOption) {
      case undefined:
      case null:
        return;
      case "RESET":
        this.tempFilter.length = 0;
        return;
      case "ADD":
        const element = this.options.filter((e) => e.id === id)[0];
        if (!element) throw new Error(`Couldn't find element with id ${id}`);
        if (this.multiselect) {
          this.tempFilter.push(element);
          return;
        }
        this.tempFilter = [element];
        return;

      case "REMOVE":
        this.tempFilter = this.tempFilter.filter((op) => op.id !== id);
        return;
      case "APPLY":
        this.filter = new Array(...this.tempFilter);
        return;
      case "REVERSE_APPLY":
        this.tempFilter = new Array(...this.filter);
        return;
    }
  }
}

export default FilterStore;
