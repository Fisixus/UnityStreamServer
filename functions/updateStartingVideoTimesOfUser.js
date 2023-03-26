
exports.handler = function(admin, currentDBVersion, data) {
    const videoId = data.videoId;
    const startingTime = data.startingTime;
    const userId = data.userId;

    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc(userId)
    .update(
    {
        [`startingVideoTimes.${videoId}`]: startingTime
    });

}