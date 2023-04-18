const getUserWithEmailFunc = require('./getUserWithEmail');


exports.handler = function(admin, currentDBVersion, data, cookie) {

  var videoDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc();
  const videoId = videoDoc.id;
  const parsed = JSON.parse(data);
  const email = parsed.email;
  const password = parsed.password;
  //const url = parsed.url;
  const videoStartingTime = parsed.videoStartingTime;

  return getUserWithEmailFunc.handler(admin,currentDBVersion,email,password)
  .then((user)=>{
      const newVideo = {
        videoId: videoId,
        commentIds: [],
        //url: url,
        userId: user.userId,
        videoStartingTime:videoStartingTime,
        videoFinishTime:"" ,
        path:"" 
    };
    return videoDoc.set(newVideo);

  });

  //TODO:Update user videoIds
  
}