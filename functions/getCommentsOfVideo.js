const getVideoFunc = require('./getVideo');
const getCommentFunc = require('./getComment')

exports.handler = function(admin, currentDBVersion, data) {
    
    return getVideoFunc.handler(admin,currentDBVersion,data)
    .then((video)=>
    {
        const commentIds = video.commentIds;
        const promises = commentIds.map(function(commentId)
            {
                const newData = 
                    {
                        commentId: commentId,
                    };
                return getCommentFunc.handler(admin,currentDBVersion,newData)
            });
            return Promise.all(promises);
    });
}
