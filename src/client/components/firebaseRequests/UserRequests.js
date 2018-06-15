import firebase from '../general/firebaseConfig';

// Get the circles from the user.
export const LoadCircles = () => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const userRef = firebase.database().ref(`users/${userId}`);

  const promise = new Promise((resolve) => {
    userRef.once('value', (snapshot) => {
      console.log(snapshot.val());
      // Check if there are circle if there are we make an array of the object.
      const circles = snapshot.val().circles ? Object.values(snapshot.val().circles) : [];
      console.log(circles);
      resolve(circles);
    });
  });
  return promise;
};

// export const CheckUserHasGroup = (groupId) => {
//   const userId = JSON.parse(localStorage.getItem('user')).id;
//   const userRef = firebase.database().ref(`users/${userId}/circles/${}`);
// };

export default { LoadCircles };
