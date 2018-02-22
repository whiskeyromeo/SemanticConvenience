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

This has evolved into a bit of a solution for file upload/rendering in the browser. I am currently working on getting the functionality down in order to have this be deployed to AWS EC2 with the file system being linked to an S3 instance. In this case it will be easier to access the data remotely, and hopefully by the time the full functionality is up I will have the kinks worked out.

Next steps are better validation of the folders and filesystem in order to ensure there will be no overwrites of existing files. This will need to be ported to a service, the S3 interface will need to be a service as well so that the port can happen remotely. Also need to add in the ability to have multiple view engines running as currently the partials being rendered are all .ejs types.



