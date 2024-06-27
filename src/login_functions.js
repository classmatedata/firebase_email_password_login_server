import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

export const registerNewUser = () => {
    const auth = getAuth();
    let email = document.querySelector('#signUpEmail').value;
    let password = document.querySelector('#signUpPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            console.log(`new user ${user}: ${JSON.stringify(userCredential)}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Coudn't create new account!\nerror register new user ${errorCode}: ${errorMessage}`, error);
            console.log(`error register new user ${errorCode}: ${errorMessage}`);
        });
}

export const logInUser = () => {
    const myAuth = getAuth();
    onAuthStateChanged(myAuth, (theUser) => {
        console.log(`*iii* login/out ${JSON.stringify(theUser)}`);
    })
    let email = document.querySelector('#logInEmailInput').value;
    let password = document.querySelector('#logInPasswordInput').value;



    console.log('log in email:', email, ", password:", password);

    signInWithEmailAndPassword(myAuth, email, password)
        .then((x) => {
            console.log(`logged in user ${JSON.stringify(x.user)}`);
            document.querySelector('#dispalyIsLoggedInDiv').innerHTML = `loggedIn - ${JSON.stringify(x.user.email)}`;
            //hide login form
            document.querySelector('#loginForm').classList.toggle("hdn");
            document.querySelector('#logOutButton').classList.toggle("hdn");

            document.querySelector('#logInEmailInput').value = "";
            document.querySelector('#logInPasswordInput').value = "";
        })
        .catch((err) => { console.log(`error signing in: ${err}`) });
}

export const logOutUser = () => {
    const myAuth = getAuth();

    onAuthStateChanged(myAuth, (theUser) => {
        console.log(`*ooo* login/out ${JSON.stringify(theUser)}`);
    })
    console.log("------------- logging out");
    signOut(myAuth)
        .then((x) => {
            console.log(`signed out successfully ${x}`);
            document.querySelector('#dispalyIsLoggedInDiv').innerHTML = ` not loggedIn`;

            //display login form
            document.querySelector('#loginForm').classList.toggle("hdn");
            document.querySelector('#logOutButton').classList.toggle("hdn");

        }).catch((err) => {
            console.log(`error sign out ${err}`);
        })
}
//sign  with email and password
//https://youtu.be/T9K8bkMEA3Q?si=C_Q1-AiSousk0UVT&t=9371

//sign  with google
//https://youtu.be/T9K8bkMEA3Q?si=CpK8UgWxvnXuRR46&t=11257