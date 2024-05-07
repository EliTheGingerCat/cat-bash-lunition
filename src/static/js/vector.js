class Vector {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	add(scalar) {
		this.x += scalar
		this.y += scalar
	}

	subtract(scalar) {
		this.x -= scalar
		this.y -= scalar
	}

	multiply(scalar) {
		this.x *= scalar
		this.y *= scalar
	}

	divide(scalar) {
		this.x /= scalar
		this.y /= scalar
	}

	normalise() {
		// https://gamedev.stackexchange.com/questions/45358/scale-a-normalized-2d-vector-always-to-the-same-length
		this.divide(this.magnitude)
	}

	get magnitude() {
		return Math.sqrt(this.x^2 + this.y^2)
	}

	get direction() {
		// https://study.com/skill/learn/calculating-a-vectors-magnitude-direction-from-its-components-explanation.html
		return Math.atan2(this.y, this.x)
	}
}

export { Vector }