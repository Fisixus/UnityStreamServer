exports.handler = function(admin, currentDBVersion, data) {

    var userDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc();
    const userId = userDoc.id;
    const role = data.role;
    const email = data.email;
    const password = data.password;


    const newUser = {
        userId: userId,
        email: email,
        password: password,
        role: role,
        startingVideoTimes: {}
        //userIds: [userId],
        //creationTimestamp: admin.firestore.Timestamp.fromDate(new Date()).toDate()
      };
    return userDoc.set(newUser);

}