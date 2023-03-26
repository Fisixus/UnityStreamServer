exports.handler = function(admin, currentDBVersion, data) {
    const videoId = data.videoId;
    const deletedCommentId = data.commentId;

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments')
    .doc(deletedCommentId).delete()
    .then(()=>{
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc(videoId)
        .update(
        {
            commentIds : admin.firestore.FieldValue.arrayRemove(deletedCommentId)
            //[`studioInvitedMemberInfos.${userId}`]: admin.firestore.FieldValue.delete()
        });
    });
}