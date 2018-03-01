# JerryBooks+

## Workflow

##### Pull Changes
Step 1: Switch to development branch.
```sh
git checkout development 
```
Step 2: Pull any new changes from development branch.
```sh
git pull
```
Step 3: Switch to your local dev branch and merge.
```sh
git checkout dev-:yourname:
git merge development
```
##### Commit Changes
Step 1: Commit changes to your dev brach.
```sh
git add .
git commit -m ':message goes here:'
git push origin dev-:yourname:
```
Step 2: Merge your branch with development and push.
```sh
git checkout development
git merge dev-:yourname:
git push origin development
```

