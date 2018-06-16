import { observable, action } from 'mobx';

class Circle {
  @observable id;
  @observable title;
  @observable desc;
  @observable img;

  constructor(id, title, desc, img) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.img = img;
  }
}

class CircleStore {
  @observable circles = [];

  @action
  setCircle(array) {
    this.circles = array;
  }

  @action
  addCircle(id, title, desc, img) {
    if (this.circles.length === 3) {
      this.removeItem(0);
    }
    this.circles.push(new Circle(id, title, desc, img));
  }
  @action
  removeItem(index) {
    this.circles.splice(index, 1);
  }
  @action
  findItemAndRemove(circleId) {
    let index = null;
    for (let i = 0; i < this.circles.length; i += 1) {
      if (circleId === this.circles[i].id) {
        index = i;
        break;
      }
    }
    // We have to check this.
    if (index !== null) {
      this.removeItem(index);
    }
  }
}
// const circelStore = new CircleStore();
export default new CircleStore();

// export default new CircleStore();
