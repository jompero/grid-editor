# grid-editor

Grid-editor is a working progress project. The goal is to create a tool that allows editing a grid based layout with preset 'palette'. An example will be created with a tileset from Zelda: Link's Awakening and the ability to create and edit a level layout.  
  
The example is available on [Heroku](https://mysterious-meadow-32567.herokuapp.com/).
  
## Goals

- View a grid layout - MET!
- Create and edit a grid layout - MET!
- Save/load a layout (to/from database) - MET!
  
### Stretch Goals  

- Create a custom tileset (from an image file) - IN PROGRESS
- Social options (view and like other users' maps)

## Setup

Fork or download .zip to a local folder. Note that there are two projects in the repository. Client is a react project and the backend is a node project.

```bash
cd client
npm install

cd ../backend
npm install
```

Backend is required to run the static site. To run the static site in development:

```bash
cd client
npm start
```

And run the backend at the same time:

```bash
cd backend
npm run start:watch
```

## Tests

For now, only client has tests. Tests are written using jest.  
Configuration has not been made to run tests once and only once.

```bash
cd client
npm test
```
