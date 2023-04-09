const getUserWithUUIDFunc = require('./getUserWithUUID');
const updateUserVideoIdsFunc = require('./updateUserVideoIds');

exports.handler = function(admin, currentDBVersion, data, cookie) {

    var videoDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc();
    const videoId = videoDoc.id;
    const data = JSON.parse(data)
    const url = data.url;
    const videoStartingTime = data.videoStartingTime;
    const videoFinishTime = data.videoFinishTime;
    const userUUID = cookie;

    return getUserWithUUIDFunc.handler(admin,currentDBVersion,userUUID)
    .then((user)=>{
      const newVideo = {
        videoId: videoId,
        commentIds: [],
        url: url,
        userId: user.userId,
        videoStartingTime:videoStartingTime,
        videoFinishTime:videoFinishTime
      };
      return videoDoc.set(newVideo).then(()=>
      {
        const d = {
          uuid: userUUID,
          videoId: videoId
        }
        return updateUserVideoIdsFunc.handler(admin,currentDBVersion,d)
      });
    });
}