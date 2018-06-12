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
    console.log(img);
    this.circles.push(new Circle(id, title, desc, img));
  }

  removeItem(index) {
    this.circles.splice(index, 1);
  }
}
// const circelStore = new CircleStore();
export default new CircleStore();

// export default new CircleStore();
