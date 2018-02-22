# Semantic UI Playground/Staging Area

This is a fairly basic application thrown together with node/express and semantic_ui in order to provide a staging ground for various components

## SETUP

This uses node version 8.9.4

Hot-reloading of already created files happens but browser reloading must be done manually at this point. 

furthermore the updates to the file directory only happen at load time. Will need to migrate this into the chokidar watch.


```
    git clone <dir> && cd <dir>
    npm install && node.server.js
```
**NOTE** : I have excluded the current location of the semantic directory from the upload so you'll need to follow 
[the instructions on their site if you want this to work properly](https://semantic-ui.com/introduction/getting-started.html)
 

## Future works

I am planning on removing whatever elements I am not actively using from semantic out of the primary application and making it into more of a universal solution so that bootstrap/material/d3 components can be included with minimal conflict. 

