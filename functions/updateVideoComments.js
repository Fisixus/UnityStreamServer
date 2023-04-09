const { FieldValue } = require('firebase-admin/firestore');

exports.handler = function(admin, currentDBVersion, data) {
    const parsed = JSON.parse(data);

    const commentId = parsed.commentId;
    const videoId = parsed.videoId;

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc(videoId)
    .update(
    {
        commentIds: FieldValue.arrayUnion(commentId)
    });

}
