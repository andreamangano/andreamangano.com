set -e
GITURL=`git config remote.origin.url`
yarn install
yarn run prod
cd build
rm -rf .git/
git config --global user.email "$GH_EMAIL"
git config --global user.name "$GH_NAME"
git init
git remote add origin $GITURL
git add .
git commit -am "Automated Rebuild"
git push origin master:gh-pages --force