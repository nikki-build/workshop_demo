echo "npm version"
cmd.exe /c npm -v
echo "node js version"
cmd.exe /c node -v 

echo "install dependencies..."
cmd.exe /c npm install 

cmd.exe /c tsc .\examples\basicExample.ts  --declaration
cmd.exe /c tsc .\index.ts  --declaration


