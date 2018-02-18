# Semantic UI Playground/Staging Area


I have gone ahead and put in the base for a platform which will allow for the swapping in and out of various customized 
Semantic UI Components with ease. My thought is to make it as easy as possible to move new components in and out of react 
and angular by having them prepped in a staging area such as this. 


This project started out as a very simple place with which I could experiment with my UI Components in a much easier fashion but I have since realized the potential benefits of having a setup where I could readily parse through them on demand. There might be some goodness here after all....



Each component is served in a different partial. Some components I have linked script tags to which may or may not be included depending on whether theymay be needed. 

## SETUP

This uses node version 8.9.4

Hot-reloading of files happens but browser reloading must be done manually at this point. 


```
    git clone <dir> && cd <dir>
    npm install && node.server.js
```
**NOTE** : I have excluded the current location of the semantic directory from the upload so you'll need to follow 
[the instructions on their site if you want this to work properly](https://semantic-ui.com/introduction/getting-started.html)
 
