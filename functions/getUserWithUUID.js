exports.handler = function(admin, currentDBVersion, data) {
    const uuid = data;
    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users')
    .where('uuid','==',uuid)
        .get().then(snap=>
        {
            var user = '';
            for (var i in snap.docs) {
                user = snap.docs[i].data();
                break;
            }
            //if(Object.keys(user).length === 0)
            //{
                //console.log("ERROR!");
                //console.log("userId:" + userId);
            //}
            return user;
        });

}