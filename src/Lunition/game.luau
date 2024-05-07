local net = require("@lune/net")
local serde = require("@lune/serde")
local task = require("@lune/task")

local Vector2 = require("vector2")

export type player = {
	id: number,
	position: Vector2.Vector2,
	websocket: net.WebSocket
}
export type request = {
	command: "movement",
	id: number,
	position: {
		x: number,
		y: number
	}
}
export type response = {
	command: "playerJoined",
	id: number
} | {
	command: "playerLeft",
	id: number
}

local players = {} :: {player}


return function(websocket: net.WebSocket): ()
	local localId = 1
	while players[localId] ~= nil do
		localId += 1
	end
	local localPlayer = {
		id = localId,
		position = Vector2.new(),
		websocket = websocket
	}
	players[localId] = localPlayer

	local WEB_SOCKET_QUEUE = {} :: {response}

	table.insert(WEB_SOCKET_QUEUE, {
		command = "playerJoined",
		id = localId
	})

	-- websocket loop
	task.spawn(function()
		while true do
			local message = websocket.next()

			-- player left
			if not message then
				table.insert(WEB_SOCKET_QUEUE, {
					command = "playerLeft",
					id = localId
				})
				players[localId] = nil
				return
			end

			local request = serde.decode("json", message) :: {request}
			for _, action in request do
				local command = action.command
				if command == "movement" then
					local player = players[action.id]
					player.position.x = action.position.x
					player.position.y = action.position.y
				else
					-- error bad because what if client does a little Trolling
					print(`Invalid command {command}.`)
				end
			end
		end
	end)

	while true do
		-- in the future server will control stuff
		
		for _, player in players do
			-- The response must be an array, but serde makes empty table an object.
			local response = if #WEB_SOCKET_QUEUE == 0 then "[]" else serde.encode("json", WEB_SOCKET_QUEUE)
			player.websocket.send(response) -- send to all players
			table.clear(WEB_SOCKET_QUEUE)
		end

		task.wait() -- I fear a stack overflow
	end
end