exports.handler = function(admin, currentDBVersion, data) {

    var userDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc();
    const userId = userDoc.id;
    const parsed = JSON.parse(data);
    const role = parsed.role;
    const email = parsed.email;
    const password = parsed.password;


    const newUser = {
        userId: userId,
        email: email,
        password: password,
        role: role,
        uuid:"",
        startingVideoTimes: {}
        //userIds: [userId],
        //creationTimestamp: admin.firestore.Timestamp.fromDate(new Date()).toDate()
      };
    return userDoc.set(newUser);

}