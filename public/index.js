function registerNewUser() {
    let email_val = document.querySelector('#signUpEmail').value;
    let password_val = document.querySelector('#signUpPassword').value;
    console.log('register with email:', email_val, ", password:", password_val);

    let data = { email: email_val, password: password_val };

    fetch('/api/register', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',//'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((response) => response.json())
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

function logInUser() {
    let email_val = document.querySelector('#logInEmailInput').value;
    let password_val = document.querySelector('#logInPasswordInput').value;
    console.log('log in email:', email_val, ", password:", password_val);
    let data = { email: email_val, password: password_val };
    fetch('/api/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',//'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((response) => response.json())
        .then((x) => {
            // Signed up 
            const user = x.userCredential.user;
            // ...
            console.log(x.message);
            console.log(`new user ${user}: ${JSON.stringify(x.userCredential)}`);
            console.log(`logged in user ${JSON.stringify(user)}`);
            document.querySelector('#dispalyIsLoggedInDiv').innerHTML = `loggedIn - ${JSON.stringify(user.email)}`;
            //hide login form
            document.querySelector('#loginForm').classList.toggle("hdn");
            document.querySelector('#logOutButton').classList.toggle("hdn");

            document.querySelector('#logInEmailInput').value = "";
            document.querySelector('#logInPasswordInput').value = "";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`error signing in: ${error}`)
        });

}

function logOutUser() {
    fetch('/api/logout', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',//'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: "" // body data type must match "Content-Type" header
    }).then((response) => response.json())
        .then((x) => {
            // ...
            console.log(x.message);
            document.querySelector('#dispalyIsLoggedInDiv').innerHTML = ` not loggedIn`;

            //display login form
            document.querySelector('#loginForm').classList.toggle("hdn");
            document.querySelector('#logOutButton').classList.toggle("hdn");

        }).catch((err) => {
            console.log(`error sign out ${err}`);
        })
}

function resetPassword() {
    let email_val = document.querySelector('#logInEmailInput').value;

    console.log('log in email:', email_val);
    let data = { email: email_val };

    fetch('/api/reset-password', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',//'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((response) => response.json())
        .then((x) => {


            console.log(`reset password in user ${JSON.stringify(x.message)}`);
            document.querySelector('#dispalyIsLoggedInDiv').innerHTML = `reset password link send to email`

            //hide login form

            document.querySelector('#logInEmailInput').value = "";
            document.querySelector('#logInPasswordInput').value = "";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`error signing in: ${error}`)
        });

}
window.addEventListener('load', () => {
    document.querySelector('#signUpButton').addEventListener('click', registerNewUser);
    document.querySelector('#logInButton').addEventListener('click', logInUser);
    document.querySelector('#logOutButton').addEventListener('click', logOutUser);
    document.querySelector('#resetPasswordButton').addEventListener('click', resetPassword);
});

