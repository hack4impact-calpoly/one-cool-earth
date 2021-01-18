# One Cool Earth

## For developers

### Cloning the repository

On your local machine, from either the command line or GitHub GUI, use the following repository URL: 
> https://github.com/hack4impact-calpoly/one-cool-earth.git

If you are cloning the repository from the command line, use the following command:

```
git clone https://github.com/hack4impact-calpoly/one-cool-earth.git
```

### Running the backend

Navigate to the *backend* folder from the project directory using the following command:
```
cd backend
```
Once you are in the *backend* directory, verify that all the packages are up to date with the following command:
```
npm i
```
Then use the following command to run the backend:
```
npm run dev
```
For background, the details of what the script is doing can be found in the *package.json* file

### Running the frontend

Similar to running the backend, navigate to the *frontend* directory using the following command:
```
cd frontend
```
Once you are in the *frontend* directory verify that all the packages are up to date with the following command:
```
npm i
```
Then, use the following command to run the frontend:
```
npm start
```

**_*Note that the backend and frontend are to be ran separately. In other words, in order to run both, the process for running the frontend and backend should each be performed within separate command line windows/shells_**

### Making changes

1. Before modifying code, or staging or committing changes, always make sure that you have the latest code with the following command:
```
git pull 
```
2. Now that your code base is in alignment with the main branch, create a branch, perferably titled with a name that reflects the changes you are implementing. This is done with the following command:
```
git checkout -b <branchName> 
```
3. Work your magic (code)
4. Stash the changes that will be committed:
```
git add *
```
5. Commit the changes. It is also important to leave a concise, descriptive message indicating what the commit (in other words, the changes) is accomplishing:
```
git commit -m "Leave your message here. Make sure to quote the message!"
```
6. The next step is to push your branch to the repository:
```
git push origin <branchName>
```
7. The final step is to make a pull request from GitHub.com, requesting to merge the branch that contains your changes with the *main* branch!
