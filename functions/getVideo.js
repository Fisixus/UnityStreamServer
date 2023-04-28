const getUserWithUUIDFunc = require('./getUserWithUUID');

exports.handler = function (admin, currentDBVersion, data, uuid) {

    const videoId = JSON.parse(data).videoId;

    return getUserWithUUIDFunc.handler(admin, currentDBVersion, uuid)
        .then((user) => {
            if (user == "") throw Exception();
            return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos')
                .where('videoId', '==', videoId)
                .get().then(snap => {
                    var s = '';
                    for (var i in snap.docs) {
                        s = snap.docs[i].data();
                        break;
                    }
                    return s;
                });

        });

}