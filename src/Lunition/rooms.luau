local net = require("@lune/net")

export type player = {
	name: string
}

local players = {}

type movement = "x-" | "x+" | "y-" | "y+"
return function(socket: net.WebSocket): ()
	while true do
		local message = socket.next()
		
	end
end
