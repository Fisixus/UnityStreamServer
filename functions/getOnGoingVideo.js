const getUserWithUUIDFunc = require('./getUserWithUUID')

exports.handler = function(admin, currentDBVersion, cookie) {
    
    const uuid = cookie;

    return getUserWithUUIDFunc.handler(admin,currentDBVersion,uuid)
    .then((user)=>
    {
        if(user == '') return user;

        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').where('videoFinishTime','==',"")
        .get().then(snap=>
            {
                var s = '';
                for (var i in snap.docs) {
                    s = snap.docs[i].data();
                    break;
                }
                return s;
            });
    });
}
