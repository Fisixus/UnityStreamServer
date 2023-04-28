exports.handler = function(admin, currentDBVersion, data) {

    const videoId = JSON.parse(data).videoId;
    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos')
    .where('videoId','==', videoId)
        .get().then(snap=>
        {
            var s = '';
            for (var i in snap.docs) {
                s = snap.docs[i].data();
                break;
            }
            return s;
        });

}