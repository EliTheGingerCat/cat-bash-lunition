/*const socket = new WebSocket("ws://localhost:8080")

socket.addEventListener("open", event => {
	socket.send("hi")
})

socket.addEventListener("message", event => {
	console.log(event.data)
})*/

import "./player"

const canvas = document.createElement("canvas")
const context = canvas.getContext("2d")

const keysPressed = {}
document.addEventListener("keydown", event => {
	keysPressed[event.key] = true
})
document.addEventListener("keyup", event => {
	keysPressed[event.key] = false
})

const SPEED = 100
const player = {
	x: 0,
	y: 0
}

let timeLast = 0
function main(timeNow) {
	const timeDelta = (timeNow - timeLast) / 1000
	timeLast = timeNow
	if (keysPressed.d) {
		player.x += SPEED * timeDelta
	}
	if (keysPressed.a) {
		player.x -= SPEED * timeDelta
	}
	if (keysPressed.w) {
		player.y -= SPEED * timeDelta
	}
	if (keysPressed.s) {
		player.y += SPEED * timeDelta
	}
	context.clearRect(0, 0, canvas.width, canvas.height)

	context.beginPath()
	context.arc(player.x, player.y, 50, 0, Math.PI * 2)
	context.fillStyle = "#ff8000"
	context.fill()
	context.closePath()

	requestAnimationFrame(main)
}
main()
canvas.width = 480
canvas.height = 320
document.body.appendChild(canvas)