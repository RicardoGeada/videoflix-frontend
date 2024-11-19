git pull
git add .
git commit -m "%*"
git push
ng build --configuration production --base-href="/"
git ftp push