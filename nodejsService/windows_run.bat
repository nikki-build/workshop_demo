echo "npm version"
cmd.exe /c npm -v

echo "install dependencies..."

cmd.exe /c npm update nikki.node
cmd.exe /c npm install 

echo "running basic example app..."
cmd.exe /c node basicExample.js




