
exports.handler = function(admin, currentDBVersion, data) {
    const commentId = data.commentId;
    const newContent = data.content;

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments').doc(commentId)
    .update(
    {
        content: newContent
    });

}