import { observable, action } from 'mobx';

class User {
  @observable id;
  @observable firstname;
  @observable lastname;
  @observable lat;
  @observable long;
  @observable circles;
  @observable products;

  constructor(id, firstname, lastname, lat, long, circles, products) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.lat = 0;
    this.long = 0;
    this.circles = circles;
    this.products = products;
  }
}

class UserStore {
  @observable user = new User(1, 'Ivo', 'Kroon', 0, 0, null, null);

  @action
  createUser(id, firstname, lastname, lat, long, circles, products) {
    this.user = new User(id, firstname, lastname, lat, long, circles, products);
  }
}

export default new UserStore();
