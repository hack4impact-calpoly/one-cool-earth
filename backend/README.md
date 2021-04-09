# Backend
## Notes on Google Signin/Authentication

The "auth" and "config" directory contain all of the code that enable Google Authentication. More specifically, the protocol is called OAuth. The process is as follows:

1. To initiate the authentication/sign-in process, (assuming that the backend is running) navigate to api/auth/google.
2. You will be redirected to google to sign in -- if you are already signed into google on the browser, it will ask for permission before signing you in.
3. After this, you will be redirected back to /api/auth/google/callback. This route will verify if the sign in was a success or not. On success, you are put in api/auth/ route, which is the default. On failure, the application will route back to /api/auth/google to try to authenticate again.


Notes:
- api/auth/ is a default route that is simply being used for testing purposes right now; navigating to it will inform you whether or not a user is currently signed in
- the config directory shouldn't need to be changed -- it just contains configuration settings for passport (this is the package that takes care of all the user authentication)
- Moreover, there is a .env file that will be required for google authentication to work. It has sensitive credentials that I didn't want to upload onto the public repository. Thus, if you developing a part of the project that invovlves google authentication, shoot me a message for the .env file and I will send it to you. It should be placed in your backend directory and remember not to upload it to github when you push code. 
- I have a special database setup for testing purposes -- that is what the backend is currently interfaced with. You all should have access to the MongoDB so you can go in an see whats in there. 
- The application uses a cookie to store the user that has been authenticated for a limited amount of time. This way, you don't have to authenticate everytime you navigate to a different page. 
