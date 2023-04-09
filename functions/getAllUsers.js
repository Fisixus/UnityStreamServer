exports.handler = function(admin, currentDBVersion, data) {

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users')
    .get().then(snap=>
    {
        let users = [];
        for (var i in snap.docs) {
            users.push(snap.docs[i].data());
        }
        console.log("func:" + users);
   //     res.status(200).send(JSON.stringify(users));
        return users;
    });
}