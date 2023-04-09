const updateUserVideoIdsFunc = require('./updateUserVideoIds');

exports.handler = function(admin, currentDBVersion, data, cookie) {

    const parsed = JSON.parse(data);
    const videoId = parsed.videoId;
    const videoFinishTime = parsed.videoFinishTime;

    d={
       uuid:cookie,
       videoId:videoId   
    }

    return updateUserVideoIdsFunc.handler(admin,currentDBVersion,d)
    .then(()=>{
        
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc(videoId)
        .update(
        {
            videoFinishTime: videoFinishTime
        });
    });

}