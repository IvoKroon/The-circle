import firebase from '../general/firebaseConfig';
import { GetProductById } from './ProductRequests';
import { GetUserById } from './UserRequests';
import { remove } from 'mobx';

export const CreateNotification = (productId, userId, moments) =>
  new Promise((resolve) => {
    GetProductById(productId).then((data) => {
      console.log(data.val());
      const slots = [];
      for (let i = 0; i < moments.length; i += 1) {
        const obj = {};
        obj[moments[i]] = true;
        slots.push(obj);
      }

      // plan
      // console.log(data.val().userId);
      const productOwner = data.val().userId;
      const now = new Date();
      const notification = {
        productId,
        userId,
        time: now.getTime(),
        slots,
      };
      resolve(firebase
        .database()
        .ref(`users/${productOwner}/notifications`)
        .push(notification));
    });
  });

export const GetLatestNotifications = userId =>
  new Promise((resolve) => {
    firebase
      .database()
      .ref(`users/${userId}/notifications`)
      .orderByChild('date')
      .limitToFirst(3)
      .once('value')
      .then((data) => {
        if (data.val()) {
          const notifications = Object.values(data.val());
          const keys = Object.keys(data.val());
          const promises = [];
          for (let i = 0; i < notifications.length; i += 1) {
            const requests = [];
            const key = keys[i];
            requests.push(GetUserById(notifications[i].userId));
            requests.push(GetProductById(notifications[i].productId));
            promises.push(Promise.all(requests).then(reqs => ({
              key,
              user: reqs[0].val(),
              product: reqs[1].val(),
            })));
          }
          resolve(Promise.all(promises));
        }
        resolve(null);
      });
  });
export const RemoveNotification = (notificationId) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  return firebase.database().ref(`/users/${userId}/notifications/${notificationId}`).remove();
};
export const UpdateNotification = (notificationId, state) => {
  // GET data from the notification
  // Find the product and plans
  // Update the state (SET)
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const ref = firebase.database().ref(`/users/${userId}/notifications/${notificationId}`);
  const promise = new Promise(resolve =>
    ref.once('value').then((data) => {
      const val = data.val();
      const { productId } = val;
      const slots = val.slots;
      const promises = [];
      console.log(slots);
      for (let i = 0; i < slots.length; i += 1) {
        // promises.push(
        const slot = Object.keys(slots[i]);
        console.log(slot);
        const innerRef = firebase
          .database()
          .ref(`/products/${productId}/plan/${slot[0]}/state/`)
          .set(state);
        promises.push(innerRef);
      }
      resolve(Promise.all(promises));
    }));
  return promise;
};
export default { CreateNotification, GetLatestNotifications, RemoveNotification };
