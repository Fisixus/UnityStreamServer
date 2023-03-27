exports.handler = function(admin, currentDBVersion, data) {

    const commentId = data.commentId;
    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments')
    .where('commentId','==', commentId)
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