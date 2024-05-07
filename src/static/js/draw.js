function circle(context, x, y, radius, style) {
	context.beginPath()
	context.arc(x, y, radius, 0, Math.PI * 2)
	context.fillStyle = style
	context.fill()
}
function rectangle(context, x, y, w, h, style) {
	context.beginPath()
	context.rect(x, y, w, h)
	context.fillStyle = style
	context.fill()
}

export { circle, rectangle }