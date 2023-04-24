const getUserWithEmailFunc = require('./getUser');


exports.handler = function(admin, currentDBVersion, data) {

  var videoDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc();
  const videoId = videoDoc.id;
  const parsed = JSON.parse(data);
  const email = parsed.email;
  //const url = parsed.url;
  const videoStartTime = parsed.videoStartTime;

  return getUserWithEmailFunc.handler(admin,currentDBVersion,email)
  .then((user)=>{
      const newVideo = {
        videoId: videoId,
        commentIds: [],
        //url: url,
        userId: user.userId,
        videoStartTime:videoStartTime,
        videoFinishTime:"" ,
        path:"" 
    };
    videoDoc.set(newVideo);
    return videoId;

  });

  //TODO:Update user videoIds
  
}