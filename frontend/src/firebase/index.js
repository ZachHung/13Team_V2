import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB7SKEOIYSEZd32-vsE5UlSx7TwKhVW6yM",
    authDomain: "fir-upload-images-912bd.firebaseapp.com",
    projectId: "fir-upload-images-912bd",
    storageBucket: "fir-upload-images-912bd.appspot.com",
    messagingSenderId: "815021452818",
    appId: "1:815021452818:web:63b91f7405caa386a4b2cb",
    measurementId: "G-H9G8QYLN4C"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };