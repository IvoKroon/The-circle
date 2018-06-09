import { observable } from "mobx"

class Circle {
  @observable title
  @observable id

  constructor(title, id) {
    this.title = title
    this.id = id
  }
}

export class CircleStore {
  @observable circles = []

  // createTodo(value) {
  //   this.circles.push(new Circle(value, id))
  // }
}

export default new CircleStore