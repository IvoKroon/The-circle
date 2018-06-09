import { observable, computed, action } from "mobx";

export class TestStore {
  @observable tasks = []
  @action
  addTodo(title) {
    this.tasks.push(title);
  }
}

export default new TestStore