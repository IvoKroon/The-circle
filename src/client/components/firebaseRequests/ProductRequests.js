import firebase from '../general/firebaseConfig';

// Get the circles from the user.
export const AddNewProduct = (title, desc, image, circles) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;

  const productRef = firebase.database().ref('products');
  const action = productRef.push({
    title,
    desc,
    userId,
    image,
    circles,
  });
  return action;
};

// ADD plan to product.
export const PlanProduct = (productId, moments, state) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const productRef = firebase.database().ref(`products/${productId}/plan/`);
  const updates = {};
  console.log(moments);
  for (let i = 0; i < moments.length; i += 1) {
    updates[moments[i]] = { userId, state };
  }
  console.log('UPDATES');
  console.log(updates);
  return productRef.update(updates);
  // var updates = {};
  // updates['/posts/' + newPostKey] = postData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
};

export const GetProductById = (productId) => {
  const ref = firebase.database().ref(`products/${productId}`);
  return ref.once('value');
};

export default { AddNewProduct, PlanProduct, GetProductById };
