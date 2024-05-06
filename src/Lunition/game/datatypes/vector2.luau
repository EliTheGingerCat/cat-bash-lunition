-- http://lua-users.org/wiki/MetatableEvents

local Vector2 = {
	kind = "data",
	type = "Vector2"
}
Vector2.__index = Vector2

export type Vector2 = typeof(setmetatable({} :: {
	x: number,
	y: number
}, Vector2))
export type operation = "unm" | "add" | "sub" | "mul" | "div" | "idiv" | "mod" | "pow"

local AXES = {"x", "y"}
local METAMETHODS_MATHEMATICS = {"unm", "add", "sub", "mul", "div", "idiv", "mod", "pow"} :: {operation}

local function operate(operation: operation, number1: number, number2: number?): (number | boolean)
	-- unary
	if operation == "unm" then
		return -number1
	end
	-- binary
	assert(number2)
	if operation == "add" then
		return number1 + number2
	elseif operation == "sub" then
		return number1 - number2
	elseif operation == "mul" then
		return number1 * number2
	elseif operation == "div" then
		return number1 / number2
	elseif operation == "idiv" then
		return number1 // number2
	elseif operation == "mod" then
		return number1 % number2
	elseif operation == "pow" then
		return number1^number2
	end
	error(`Invalid operation {operation}.`)
end

-- special
function Vector2.__tostring(vector: Vector2): (string)
	return `'<vector2 x={vector.x} y={vector.y}>'`
end

-- mathematics
for _, metamethod: operation in METAMETHODS_MATHEMATICS do
	Vector2["__" .. metamethod] = function(value1: Vector2 | number, value2: Vector2 | number | nil): (Vector2)
		local vector: Vector2, object: Vector2 | number | nil
		if type(value1) == "table" then
			vector = value1 :: Vector2
			object = value2 :: number?
		else
			vector = value2 :: Vector2
			object = value1 :: number?
		end
		if type(object) == "number" then
			for _, axis in AXES do
				vector[axis] = operate(vector[axis], object, metamethod)
			end
		elseif type(object) == "table" and object.name == "Vector2" then
			for _, axis in AXES do
				vector[axis] = operate(vector[axis], object[axis], metamethod)
			end
		else
			error(`Invalid object {object} of type {type(object)}.`)
		end
		return vector
	end
end

-- comparison
-- I see now why Vector2 is a bad name...
function Vector2.__eq(vector1: Vector2, vector2: Vector2): (boolean)
	for _, axis in AXES do
		if vector1[axis] ~= vector2[axis] then
			return false
		end
	end
	return true
end

function Vector2.new(x: number, y: number): (Vector2)
	return setmetatable({
		x = x,
		y = y
	}, Vector2)
end

return Vector2