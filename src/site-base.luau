local Lunition = require("Lunition")
local Lunit = Lunition.Lunit

local lBase = Lunit.new()

lBase:route("/", "html/index.html")

lBase:route("/credits", "html/credits.html")

lBase:route("/websocket", "html/web-socket.html")

return lBase