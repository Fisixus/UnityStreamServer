const { FieldValue } = require('firebase-admin/firestore');

exports.handler = function(admin, currentDBVersion, data) {
    const parsed = JSON.parse(data);
    const videoId = parsed.videoId;
    const deletedCommentId = parsed.commentId;

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments')
    .doc(deletedCommentId).delete()
    .then(()=>{
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc(videoId)
        .update(
        {
            commentIds : FieldValue.arrayRemove(deletedCommentId)
            //[`studioInvitedMemberInfos.${userId}`]: admin.firestore.FieldValue.delete()
        });
    });
}