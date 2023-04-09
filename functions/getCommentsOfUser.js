exports.handler = function(admin, currentDBVersion, data) {

    const videoId = data.videoId;
    const userId = data.userId;
    let comments = [];
    
    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments')
    .where('videoId','==',videoId).where('userId','==',userId)
        .get().then(snap=>
        {
            for (var i in snap.docs) {
                comments.push(snap.docs[i].data());
            }
            return comments;
        });

}