const users=[];
function userJoin(id,username,room){
    const user = {id,username,room};
    users.push(user);
    return user;
}
function getCurrentUser(id) {
    return users.find(user => user.id === id);
  };
  function userleaver(id) {
    const index = users.findIndex(user => user.id === id);
  
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  }
function getroomuser(room){
    return users.filter(function(user){
        user.room===room;
    })
}
module.exports = {userJoin,getCurrentUser,userleaver,getroomuser};