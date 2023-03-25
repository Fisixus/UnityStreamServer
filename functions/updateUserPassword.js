
exports.handler = function(admin, currentDBVersion, data) {
    const newPassword = data.password;
    const userId = data.userId;

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc(userId)
    .update(
    {
        password: newPassword
    });

}