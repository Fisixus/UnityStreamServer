const updateVideoCommentsFunction = require('./updateVideoComments');
const getUserWithUUIDFunc = require('./getUserWithUUID');

exports.handler = function(admin, currentDBVersion, data, cookie) {

    var commentDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments').doc();
    const commentId = commentDoc.id;
    const parsed = JSON.parse(data);
    const uuid = cookie;

    const videoId = parsed.videoId;
    const content = parsed.content;
    const videoRelativeTime = parsed.videoRelativeTime; //TODO: Control it
    let userStartToVideoTime = null;

    return getUserWithUUIDFunc.handler(admin,currentDBVersion,uuid)
    .then(user =>{

        userStartToVideoTime = user.startingVideoTimes[videoId];
        const newComment = {
            commentId: commentId,
            userId: user.userId,
            videoId: videoId,
            content: content,
            videoRelativeTime: videoRelativeTime,
            userStartToVideoTime: userStartToVideoTime
            //creationTimestamp: admin.firestore.Timestamp.fromDate(new Date()).toDate()
        };

        return commentDoc.set(newComment)
        .then(()=>{
            newData = 
            {
                videoId:videoId,
                commentId:commentId
            }
            return updateVideoCommentsFunction.handler(admin,currentDBVersion,newData)
        }) 
    });

    
    

}