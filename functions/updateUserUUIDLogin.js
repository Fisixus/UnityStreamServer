const getUserWithEmailFunc = require('./getUserWithEmail');

exports.handler = function(admin, currentDBVersion, data) {
    const email = data;

    return getUserWithEmailFunc.handler(admin,currentDBVersion,email)
    .then((user)=>{
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc(user.userId)
        .update(
        {
            uuid: token()
        });
    });
}

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};
