# Overtime Managment (friendly-spork)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

CSS: tailwind.css

Backend services: Google Firebase (Hosting, Cloud Firestore, Authentication, Cloud Functions, and Cloud Messaging)

## Project Goal

To streamline the employee schedualing process in a production factory enviroment.

## Deliverable Requirements
- Separate Admin, Supervisor, Operations, and Employee, experience/functionality
- Mobile responsive
- Keeps track of the rotating production schedual for both plant departments

### Admin Functionalities
- Create, Modify, and Delete, users
- Create, Modify, and Delete, overtime postings
- Create, Modify, and Delete, standard and misc jobs
- Update the department "rota" doc to change names of standard job holders

### Supervisor Functionalities
- Create, Modify, and Delete, overtime postings
- Create, Modify, and Delete, standard and misc jobs

### Operations Functionalities
- Display schedual and all open postings

### Employee Functionalities
- View applicable overtime postings
- Bid on open postings until posting down date
- Post bids appear most to least senior per segment
- Assign sequential preference to bid posts that overlap

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run serve`
"firebase serve --only functions"
Starts the firebase functions emulator on [http://localhost:5000](http://localhost:5000) from `/functions/index.js`

### `npm run host`
"firebase deploy --only hosting"
Deploys current build directory to firebase hosting.


### `firebase deploy`

Deploys current build directory to firebase hosting and current functions/index.js to cloud functions.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `react-scripts eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


