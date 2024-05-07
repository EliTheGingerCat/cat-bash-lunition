import { circle as drawCircle } from "./draw.js"
import { Vector } from "./vector.js"

class Player {
	constructor(id, style) {
		this.id = id
		this.style = style
		this.position = new Vector(0, 0)
	}

	draw(context) {
		drawCircle(context, this.position.x, this.position.y, 20, this.style)
	}
}

export { Player }