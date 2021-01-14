# job-application-tracker

##### This application was built quickly as a utility, and is therefore not polished, but it is functional. It allows wildcards to be used to facilitate email templating. The emails contain a signature box with a professional appearance, as well as attaching your resume files.

### Getting Started

##### The current configuration uses MongoDB as a database, so you will need to establish a database connection using the Mongoose package, and add a .env file. Your .env file should contain your email password, a username, a user password of your choosing, and an API key of your choosing. You can take any liberties you choose with authentication and session managament, but I kept it fairly basic for my own use. You will also need to upload your own PDF and Word doc files within the '/public' directory, as well as any images you would like to include to represent your online presence. As with any other Node.js app with packages, you will need to run ``npm install`` in the root of this directory to install the require node modules. I may make a more refined version of the app using React in the near future.

Enjoy!
