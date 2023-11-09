import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyB5l3CcQPo923RtIErnKroAlHO9uu-IRqw",
    authDomain: "smitb10.firebaseapp.com",
    projectId: "smitb10",
    storageBucket: "smitb10.appspot.com",
    messagingSenderId: "730318374002",
    appId: "1:730318374002:web:13ce8c850ae58cbd6c2eeb",
    measurementId: "G-Q9ST507JWJ"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);

let sbtn = document.getElementById('sbtn');
if (sbtn) {
    sbtn.addEventListener('click', () => {
        let email = document.getElementById('semail').value;
        let password = document.getElementById('spass').value;
        let phone = document.getElementById('sphone').value;

        createUserWithEmailAndPassword(auth, email, password, phone)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user)
                try {
                    const docRef = await addDoc(collection(db, "users"), {
                        email: email,
                        password: password,
                        phone: phone
                    });
                    console.log("Document written with ID: ", docRef.id);
                    alert('user signed up successfully');
                    location.href = './signin.html';
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert('something went wrong');
            });
    });
}

let lbtn = document.getElementById('lbtn');
if (lbtn) {
    lbtn.addEventListener('click', () => {
        let email = document.getElementById('lemail').value;
        let password = document.getElementById('lpass').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('user mil gaya ==>', user);
                location.href = './welcome.html'
            })
            .catch((error) => {
                console.log('error shareef ==>', error);
            });
    });
}


let showData = document.getElementById('showData')
if (showData) {
    showData.addEventListener('click', async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            let showw = document.getElementById('show')
            showw.innerHTML +=  `
            <div>${doc.data().email}</div>
            <div>${doc.data().password}</div>
            <div>${doc.data().phone}</div>
            <br><br>
            `            
            // console.log('Document data:', doc.data());
        });
    }
    )
}
