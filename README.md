### Archival

Archived on 2026-01-11.

This repository has been archived since it started out as Cat Bash using Python and Flaskr and I think it would be strange to replace all of it with Luau and with our Lunition technology. I do not plan on continuing Cat Bash (with Python), so the only solution is to archive. Perhaps I will use Lunition someday, but for now, I am going to keep <eli.bridgeduel.xyz> simple.

See branches [`dev`](</EliTheGingerCat/cat-bash-lunition/tree/dev>) for Lunition and [`websocket`](</EliTheGingerCat/cat-bash-lunition/tree/websocket>) for my incomplete work on supporting multiplayer games using websockets.

# cat-bash
A really bad social media application that is only going to get worse.

# Installation
1) Clone the repository.
    1) I would recommend naming it "app".
2) In the repository's parent folder, create a virtual environment.
3) Activate the virtual environment.
4) Install everything from `requirements.txt`.
5) Execute `flask init-db`.

# Testing
1) Execute `flask run`.
    1) If you did not call it "app", then execute `flask run --app {name of the folder here}`.
2) Go to <http://127.0.0.1:5000/>.

# Deployment
Depends on what you are using, but eli.bridgeduel.xyz uses [Apache](https://flask.palletsprojects.com/en/2.0.x/deploying/mod_wsgi/).