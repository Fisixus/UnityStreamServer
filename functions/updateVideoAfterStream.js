const updateUserVideoIdsFunc = require('./updateUserVideoIds');

exports.handler = function (admin, currentDBVersion, data) {

    const parsed = JSON.parse(data);
    const videoId = parsed.videoId;
    const userId = parsed.userId;
    const videoStartTime = parsed.videoStartTime;
    const videoFinishTime = parsed.videoFinishTime;
    const path = parsed.path;

    d = {
        userId: userId,
        videoId: videoId
    }

    return updateUserVideoIdsFunc.handler(admin, currentDBVersion, d)
        .then(() => {
            return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc(videoId)
                .update(
                    {
                        videoStartTime: videoStartTime,
                        videoFinishTime: videoFinishTime,
                        path: path
                    });
        });

}