# grid-editor

Grid-editor is a a tool that allows editing a grid based layout with preset 'palettes'. Tilesets used in the example are [Adam Saltsman](https://adamatomic.itch.io/)'s _Kyst_ and _Monochrome Caves_.
  
The example itself is running on [Heroku](https://mysterious-meadow-32567.herokuapp.com/). CircleCi is used to test, build (client) and deploy (backend).
  
Backend built with express-generator.  
Client built with create-react-app.
  
## Goals

- View a grid layout - MET!
- Create and edit a grid layout - MET!
- Save/load a layout (to/from database) - MET!
  
### Stretch Goals  

- Create a custom static tilesets (from an image file) - MET!
- Upload a custom tilesets - BACKLOG

Social options:

- view other users' maps - MET!
- like other users' maps - MET!

## Setup

Fork or download .zip to a local folder. Note that there are two projects in the repository. Client is a react project and the backend is a node project. Circleci configuration is provided for CI/CD (deployment to Heroku).

### Environment variables

#### Backend

```bash
MONGODB_URI | The address to the Mongo database  
MONGODB_URI_TEST | The address to the Mongo database for test purposes  
GOOGLE_CLIENT_ID | Google Client Id  
GOOGLE_CONSUMER_SECRET | Google Consumer Secret
```

#### Client

```bash
REACT_APP_BASE_URL | the home address of the app  
REACT_APP_GOOGLE_LOGIN_URL | the Google login Url
```

#### CircleCI
Configure these also on CircleCi for Heroku deployment, if CircleCi is used.

```bash
HEROKU_API_KEY
HEROKU_APP_NAME
```

### Installing packages

```bash
cd client
npm install

cd ../backend
npm install
```

### Launching project in development mode

In production, the backend serves the static site. However, to run the static site in development, start the projects in tandem. The development app is then found at <http://localhost:3000>.

```bash
cd client
npm start

cd ../backend
npm run start:watch
```

## Tests

Some tests are present on both backend and client. End 2 end tests were written in Cypress before the React Warning that I have not been able to isolate hence no further Cypress tests have been written. Cypress tests are also ignored on the CI/CD pipeline. 
  
To run the client tests:

```bash
cd client
npm test
```

To run the backend tests:

```bash
cd backend
npm test
```

## Lessons Learned
1. Setup CI/CD as early as possible
1. Setup testing practices as early as possible, and follow it
1. If using template and TypeScript, check if there is a TypeScript template already
