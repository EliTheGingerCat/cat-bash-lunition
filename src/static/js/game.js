import { Player } from "./player.js"

const SPEED = 100

class Game {
	constructor() {
		this.players = {}
		
		this.websocket = new WebSocket("ws://localhost:8080")
		this.websocket.addEventListener("message", (event) => {
			const data = JSON.parse(event.data)
			for (const action of data) {
				const command = action.command
				switch (command) {
					case "playerJoined":
						this.players[action.id] = new Player(action.id, `hsl(${ 360 * Math.random() }, 100%, 50%)`)
						if (!this.localPlayer) {
							this.localPlayer = this.players[action.id]
						}
						break
					case "playerLeft":
						this.players[data.id] = null
						break
					default:
						throw new Error(`Unknown command ${command}.`)
				}
			}
		})
		this.websocketActions = []

		this.keysPressed = {}
		document.addEventListener("keydown", (event) => {
			this.keysPressed[event.key] = true
		})
		document.addEventListener("keyup", (event) => {
			this.keysPressed[event.key] = false
		})

		this.canvas = document.createElement("canvas")
		this.context = this.canvas.getContext("2d")
		this.canvas.width = 480
		this.canvas.height = 320
		document.body.appendChild(this.canvas)
	}

	send(data) {
		this.websocketActions.push(data)
	}

	frame(timeNow) {
		this.timeLast = this.timeLast || timeNow
		const timeDelta = (timeNow - this.timeLast) / 1000
		this.timeLast = timeNow

		if (this.localPlayer) {
			const playerPosition = this.localPlayer.position
			const playerX = playerPosition.x
			const playerY = playerPosition.y
			if (this.keysPressed.d) {
				playerPosition.x += SPEED * timeDelta
			}
			if (this.keysPressed.a) {
				playerPosition.x -= SPEED * timeDelta
			}
			if (this.keysPressed.w) {
				playerPosition.y -= SPEED * timeDelta
			}
			if (this.keysPressed.s) {
				playerPosition.y += SPEED * timeDelta
			}
			if (playerPosition.x != playerX || playerPosition.y != playerY) {
				this.send({
					command: "movement",
					id: this.localPlayer.id,
					position: playerPosition
				})
			}
		}
		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

		for (const player of Object.values(this.players)) {
			player.draw(this.context)
		}

		// send all queued up actions and reset
		if (this.websocket.readyState == WebSocket.OPEN) {
			this.websocket.send(JSON.stringify(this.websocketActions))
			this.websocketActions.length = 0
		}

		requestAnimationFrame((t) => this.frame(t))
	}
}

export { Game }