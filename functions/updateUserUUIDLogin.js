const getUserWithEmailFunc = require('./getUserWithEmail');

exports.handler = function(admin, currentDBVersion, data) {
    const parsed = JSON.parse(data);
    const email = parsed.email;
    const password = parsed.password;

    return getUserWithEmailFunc.handler(admin,currentDBVersion,email, password)
    .then((user)=>{
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc(user.userId)
        .update(
        {
            uuid: token()
        })
        .then(()=> {
            return getUserWithEmailFunc.handler(admin,currentDBVersion,email, password);
        });
    });
}

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};
