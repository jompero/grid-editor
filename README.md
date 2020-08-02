# grid-editor

Grid-editor is a working progress project. The goal is to create a tool that allows editing a grid based layout with preset 'palette'. An example will be created with a tileset from Zelda: Link's Awakening and the ability to create and edit a level layout.  
  
The example is available on [Heroku](https://mysterious-meadow-32567.herokuapp.com/).  
  
Backend built on express-generator.  
Client built on create-react-app.
  
## Goals

- View a grid layout - MET!
- Create and edit a grid layout - MET!
- Save/load a layout (to/from database) - MET!
  
### Stretch Goals  

- Create a custom tileset (from an image file) - MET!

Social options:

- view other users' maps - MET!
- like other users' maps - MET!

## Setup

Fork or download .zip to a local folder. Note that there are two projects in the repository. Client is a react project and the backend is a node project. If you need to publish to your server using git, initiatilizing backend folder as a git repository is recommended.

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

Some tests are present on both backend and client. End 2 end tests were written in Cypress before the React Warning that I have not been able to isolate hence no further Cypress teste have been written.  
  
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
