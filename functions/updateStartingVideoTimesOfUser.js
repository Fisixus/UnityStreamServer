const getUserWithUUIDFunc = require('./getUserWithUUID');
exports.handler = function(admin, currentDBVersion, data, cookie) {
    const parsed = JSON.parse(data);
    const videoId = parsed.videoId;
    const startingTime = parsed.startingTime;
    const uuid = cookie;

    return getUserWithUUIDFunc.handler(admin,currentDBVersion,uuid)
    .then((user)=>
    {
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('users').doc(user.userId)
        .update(
        {
            [`startingVideoTimes.${videoId}`]: startingTime
        });

    });
}