var socket = io.connect('http://localhost:4000');
socket.on("news", function(data) {
    console.log(data);
});

var message = document.getElementById('message');
var heading = document.getElementById('heading');
var sendButton = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

sendButton.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        heading: heading.value
    });
    message.value = '';
});

socket.on('chat', function(data) {
    output.innerHTML += '<p><strong>' + data.heading + ': </strong>' + data.message + '</p>';
    feedback.innerHTML = '';
});

socket.on('refresh', function(data) {
    output.innerHTML = '';
});

message.addEventListener('keypress', function() {
    socket.emit('typing', heading.value);
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});