import firebase from '../general/firebaseConfig';

// Get the circles from the user.
export const AddNewProduct = (title, desc, image) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;

  const productRef = firebase.database().ref('products');
  const action = productRef.push({
    title,
    desc,
    userId,
    image,
  });
  return action;
};

export default { AddNewProduct };
