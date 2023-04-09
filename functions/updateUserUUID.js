const getUserWithUUIDFunc = require('./getUserWithUUID');

exports.handler = function(admin, currentDBVersion, data) {
    const newUUID = data.uuid;

    return getUserWithUUIDFunc.handler(admin,currentDBVersion,data)
    .then((user)=>{
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc(user.userId)
        .update(
        {
            uuid: newUUID
        });
    });
}