import firebase from '../general/firebaseConfig';

export const LoadImage = (image, store) => {
  // const link = 'images/'
  const storage = firebase.storage();
  const starsRef = storage.ref(`/${store}/${image}`);
  // Get the download URL
  return starsRef.getDownloadURL().catch((error) => {
    console.log(error);
  });
};

export const LoadMultipleImages = (images, store) => {
  const imageUrls = [];
  for (let i = 0; i < images.length; i += 1) {
    imageUrls.push(new Promise((resolve, reject) => {
      LoadImage(images[i], store).then((image) => {
        resolve(image);
      });
    }));
  }
  return Promise.all(imageUrls);
};

export default { LoadImage, LoadMultipleImages };
