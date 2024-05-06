const socket = new WebSocket("ws://localhost:8080")

socket.addEventListener("open", event => {
	socket.send("hi")
})

socket.addEventListener("message", event => {
	console.log(event.data)
})