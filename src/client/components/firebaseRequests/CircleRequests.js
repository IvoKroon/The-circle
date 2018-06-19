import firebase from '../general/firebaseConfig';

export const GetCirclesByCircleIds = (circleIds) => {
  // Create the reference
  const circelesRef = firebase.database().ref('circles');
  // Create all the requests
  const requests = circleIds.map(id => circelesRef.child(id).once('value'));
  // Create the promise that we are going to use.
  const promise = new Promise((resolve) => {
    // handle all the requests.
    Promise.all(requests).then((circles) => {
      const data = [];
      for (let i = 0; i < circles.length; i += 1) {
        // Get the data and save it for resolving.
        const val = circles[i].val();
        val.id = circles[i].key;
        data.push(val);
      }
      // We have data here is it
      resolve(data);
    });
  });
  return promise;
};

export const AddProductToCircle = (circleKey, product) =>
  firebase
    .database()
    .ref(`circles/${circleKey}/products`)
    .push(product);

export const CancelGetCirclesByCircleIds = () => {
  firebase
    .database()
    .ref('circles')
    .off();
};

export default { AddProductToCircle, GetCirclesByCircleIds, CancelGetCirclesByCircleIds };
