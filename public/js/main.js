
const chatform = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
});
console.log(username,room);
const socket = io();
socket.emit('joinRoom',{username,room});
socket.on('roomuser', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
  });
socket.on("message",function(message){
    console.log(message);
    outputmessage(message);
    chatMessages.scrollTop=chatMessages.scrollHeight;
});
chatform.addEventListener("submit",function(event){
    event.preventDefault();
    const msg = event.target.elements.msg.value;
    socket.emit("chatMessage",msg);
    event.target.elements.msg.value = "";
    event.target.elements.msg.focus();
});
function outputmessage(message){
    const div = document.createElement("div");
    console.log(message);
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    document.querySelector(".chat-messages").append(div);
};
function outputRoomName(room) {
    roomName.innerText = room
  };
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }
  document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });