import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

class musicList {
    constructor() {
        this.db = null;
        this.isAvailable = false;
    }
    open() {
        return new Promise((resolve, reject) => {

            try {
                // Web app's Firebase Configuration
                const firebaseConfig = {
                    apiKey: "AIzaSyCqT5cou6RJigqpC98PutxasfNaW1P_-D4",
                    authDomain: "pwa-music-app.firebaseapp.com",
                    projectId: "pwa-music-app",
                    storageBucket: "pwa-music-app.appspot.com",
                    messagingSenderId: "1018740413678",
                    appId: "1:1018740413678:web:9b3b24eca521da5927cfff"
                };

                const app = initializeApp(firebaseConfig);

                // Initializing the Cloud Firestore from the database and give a reference to the service
                const db = getFirestore(app);

                if (db) {
                    this.db = db;
                    this.isAvailable = true;
                    resolve();
                } else {
                    reject("Could not find database");
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    add(titlesong, artistsong) {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject("Database is not created.");
            }

            //Creates music object to be added
            const music = {
                title: titlesong,
                artist: artistsong,
                likes: 0
            };

            //Connects to the firebase collection
            const databaseCollection = collection(this.db, "Music");


            //Includes the new object to the collection.
            addDoc(databaseCollection, music)
                .then((docRef) => {
                    resolve(docRef.id);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject('Database not opened!');
                return;
            }

            //Connecting to the firebase collection
            const databaseCollection = collection(this.db, 'Music');

            //Getting the data from the database collection
            getDocs(databaseCollection)
                .then((querySnapshot) => {
                    const result = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        data.id = doc.id;
                        result.push(data);
                    });
                    resolve(result);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    update(id, like) {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject('Database not opened!');
            }

            //Get the document reference.
            const docRef = doc(this.db, 'Music', id);

            //Updates the document
            updateDoc(docRef, {
                likes: like+1
            })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    delete(id) {
        // console.log("Songs List Database deleted: ", id);
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject('Database not opened!');
            }

            const docRef = doc(this.db, 'Music', id);

            deleteDoc(docRef)
                .then(() => {
                    // console.log("Document deleted successfully");
                    resolve();
                })
                .catch((error) => {
                    // console.error("Error deleting document:", error.message);
                    reject(error.message);
                });
        });
    }
}

export default new musicList();

