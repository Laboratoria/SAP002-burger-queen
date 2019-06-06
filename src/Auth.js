// $('#sign-in-btn').click(function (event) {
//     event.preventDefault();

//     let email = $('#email-input').val();
//     let password = $('#password-input').val();

//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then(function (response) {
//             window.location = 'home.html?id=' + response.user.uid;
//         })

//         .catch(function (error) {
//             let errorCode = error.code;
//             let errorMessage = error.message;
//             alert('Ocorreu um erro, tente novamente.');
//             console.log(errorCode,errorMessage);
//         })
// });


// $('#sign-up-btn').click(function (event) {
//     event.preventDefault();

//     let email = $('#emailInput').val();
//     let password = $('#passwordInput').val();

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then(function (response) {
//             writeUserData(email, password, response.user.uid);
//             window.location = 'home.html?id=' + response.user.uid;
//         })

//         .catch(function (error) {
//             let errorCode = error.code;
//             let errorMessage = error.message;
//             alert('Ocorreu um erro, tente novamente.');
//             console.log(errorCode,errorMessage);
//         })
// });


// $('#logout-btn').click(function() {
//     firebase.auth().signOut().then(function() {
//         window.location = 'index.html'
//       }).catch(function(error) {
//        alert('Ocorreu um erro, tente novamente.')
//       });
// }) 

// });