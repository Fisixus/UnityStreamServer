const getVideoFunc = require('./getVideo');
const getCommentFunc = require('./getComment')

exports.handler = function(admin, currentDBVersion, data) {
    const parsed = JSON.parse(data);
    const newData  = {videoId:parsed.videoId};

    return getVideoFunc.handler(admin,currentDBVersion,newData)
    .then((video)=>
    {
        const commentIds = video.commentIds;
        const promises = commentIds.map(function(commentId)
            {
                const d = 
                    {
                        commentId: commentId,
                    };
                return getCommentFunc.handler(admin,currentDBVersion,d)
            });
            return Promise.all(promises);
    });
}
