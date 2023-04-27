const { FieldValue } = require('firebase-admin/firestore');

exports.handler = function(admin, currentDBVersion, data) {

    const commentId = data.commentId;
    const videoId = data.videoId;

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc(videoId)
    .update(
    {
        commentIds: FieldValue.arrayUnion(commentId)
    });

}
