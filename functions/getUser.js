exports.handler = function(admin, currentDBVersion, data) {
    const userId = data.userId;
    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users')
    .where('userId','==',userId)
        .get().then(snap=>
        {
            var user = '';
            for (var i in snap.docs) {
                user = snap.docs[i].data();
                break;
            }
            if(Object.keys(user).length === 0)
            {
                console.log("ERROR!");
                console.log("userId:" + userId);
            }
            return user;
        });

}