const getUserWithEmailFunc = require('./getUserWithEmail');

exports.handler = function(admin, currentDBVersion, data) {
    const parsed = JSON.parse(data);

    const newPassword = parsed.password;
    const email = parsed.email;

    return getUserWithEmailFunc.handler(admin,currentDBVersion,email)
    .then((user)=>{
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc(user.userId)
        .update(
        {
            password: newPassword
        });
    });

    

}