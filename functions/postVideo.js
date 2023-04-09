const getUserWithUUIDFunc = require('./getUserWithUUID');


exports.handler = function(admin, currentDBVersion, data, cookie) {

  var videoDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc();
  const videoId = videoDoc.id;
  const parsed = JSON.parse(data);
  const url = parsed.url;
  const videoStartingTime = parsed.videoStartingTime;

  return getUserWithUUIDFunc.handler(admin,currentDBVersion,cookie)
  .then((user)=>{
      const newVideo = {
        videoId: videoId,
        commentIds: [],
        url: url,
        userId: user.userId,
        videoStartingTime:videoStartingTime,
        videoFinishTime:""  
    };
    return videoDoc.set(newVideo);

  });

  //TODO:Update user videoIds
  
}