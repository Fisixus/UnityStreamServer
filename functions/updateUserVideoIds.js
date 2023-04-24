const { FieldValue } = require('firebase-admin/firestore');

exports.handler = function(admin, currentDBVersion, data) {
    const videoId = data.videoId;
    const userId = data.userId;

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc(userId)
    .update(
    {
        videoIds: FieldValue.arrayUnion(videoId)
    });

}
