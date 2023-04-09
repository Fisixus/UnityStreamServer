
exports.handler = function(admin, currentDBVersion, data) {
    const parsed = JSON.parse(data)
    const commentId = parsed.commentId;
    const newContent = parsed.content;

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments').doc(commentId)
    .update(
    {
        content: newContent
    });

}