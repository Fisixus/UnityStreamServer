const { FieldValue } = require('firebase-admin/firestore');

exports.handler = function(admin, currentDBVersion, data) {
    const videoId = data.videoId;
    const uuid = data.uuid;

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').where('uuid','==',uuid)
    .update(
    {
        videoIds: FieldValue.arrayUnion(videoId)
    });

}
