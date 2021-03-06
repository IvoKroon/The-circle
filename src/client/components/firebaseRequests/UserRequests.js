import firebase from '../general/firebaseConfig';

// Get the circles from the user.
export const LoadCircles = () => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const userRef = firebase.database().ref(`users/${userId}`);

  const promise = new Promise((resolve) => {
    userRef.once('value', (snapshot) => {
      // Check if there are circle if there are we make an array of the object.
      const circles = snapshot.val().circles ? Object.keys(snapshot.val().circles) : [];
      resolve(circles);
    });
  });
  return promise;
};

export const UserHasCircle = (circleId) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const userRef = firebase.database().ref(`users/${userId}/circles/${circleId}`);
  return new Promise(resolve =>
    userRef.once('value').then((data) => {
      if (data.val()) {
        resolve(true);
      }
      resolve(false);
    }));
};

export const UserJoinsCircle = (circleId) => {
  // Save the circleId to the user
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const userRef = firebase.database().ref(`users/${userId}/circles`);
  const set = {};
  set[circleId] = true;
  return userRef.update(set);
};

export const UserLeavesCircle = (circleId) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const userRef = firebase.database().ref(`users/${userId}/circles/${circleId}`);
  return userRef.remove();
};

export const GetUserById = (userId) => {
  const userRef = firebase.database().ref(`users/${userId}`);
  return userRef.once('value');
};

export default {
  LoadCircles,
  UserHasCircle,
  UserJoinsCircle,
  UserLeavesCircle,
  GetUserById,
};
