const getUserWithUUIDFunc = require('./getUserWithUUID');
exports.handler = function(admin, currentDBVersion, data, cookie) {
    const parsed = JSON.parse(data);
    const videoId = parsed.videoId;
    const uuid = cookie;
    let comments = [];
    
    return getUserWithUUIDFunc.handler(admin,currentDBVersion,uuid)
    .then((user)=>{
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments')
        .where('videoId','==',videoId).where('userId','==',user.userId)
            .get().then(snap=>
            {
                for (var i in snap.docs) {
                    comments.push(snap.docs[i].data());
                }
                return {comments: comments};
            });
    
    });

    
}