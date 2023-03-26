const updateVideoCommentsFunction = require('./updateVideoComments');
const getUserFunc = require('./getUser');

exports.handler = function(admin, currentDBVersion, data) {

    var commentDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments').doc();
    const commentId = commentDoc.id;
    const userId = data.userId;
    const videoId = data.videoId;
    const content = data.content;
    const videoRelativeTime = data.videoRelativeTime; //TODO: Control it
    let userStartToVideoTime = null;

    return getUserFunc.handler(admin,currentDBVersion,data)
    .then(user =>{

        userStartToVideoTime = user.startingVideoTimes[videoId];
        const newComment = {
            commentId: commentId,
            userId: userId,
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