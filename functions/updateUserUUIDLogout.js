const getUserWithUUIDFunc = require('./getUserWithUUID');

exports.handler = function(admin, currentDBVersion, data) {
    const cookie = data;

    return getUserWithUUIDFunc.handler(admin,currentDBVersion,cookie)
    .then((user)=>{
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc(user.userId)
        .update(
        {
            uuid: ""
        });
    });
}