const { FieldValue } = require('firebase-admin/firestore');

exports.handler = function(admin, currentDBVersion, videoId, userId) {
    const commentIdsToDelete = [];
    return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments')
    .where('videoId','==', videoId)
    .where('userId','==', userId)
    .get().then(snap=>
    {
        for (var i in snap.docs) {
            commentIdsToDelete.push( snap.docs[i].data().commentId);
            snap.docs[i].ref.delete();
        }
        
    })
    .then(()=>{
        if(commentIdsToDelete.length == 0) return null;
        return admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc(videoId)
        .update(
        {
            commentIds : FieldValue.arrayRemove(...commentIdsToDelete)
            //[`studioInvitedMemberInfos.${userId}`]: admin.firestore.FieldValue.delete()
        });
    });
}