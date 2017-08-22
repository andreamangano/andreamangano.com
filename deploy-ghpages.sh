set -e
GITURL=`git config remote.origin.url`
npm install
node index.js
cd build
rm -rf .git/
git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
git config --global user.name "$GH_NAME" > /dev/null 2>&1
git init
git remote add origin $GITURL
git add .
git commit -am "deploy"
git push origin master:gh-pages --force