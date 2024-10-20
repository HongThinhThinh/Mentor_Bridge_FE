echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@103.200.20.149:/var/www/html/
echo "Deploy Successfully!!!"


#//password :Kei7O4QwjmjJsmehkF11