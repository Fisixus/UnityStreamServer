exports.handler = function(admin, currentDBVersion, data) {
    const email = data;
    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users')
    .where('email','==',email)
        .get().then(snap=>
        {
            var user = '';
            for (var i in snap.docs) {
                user = snap.docs[i].data();
                break;
            }
            return user;
        });

}