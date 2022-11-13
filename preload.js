'use strict';
/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 **/

/**
 * Expose electron methods to set up api bridge
 * contextBridge - https://www.electronjs.org/docs/latest/api/context-bridge
 * ipcRenderer - https://www.electronjs.org/docs/latest/api/ipc-renderer
 **/
const { contextBridge, ipcRenderer } = require('electron')

let BridgeMethods = {};

/**
 * Expose bridge methods to the renderer process these act as a secure bridge
 * between the renderer process and the main process.
 * https://www.electronjs.org/docs/latest/tutorial/context-isolation
 **/
BridgeMethods.EventToMain = () => {
    ipcRenderer.send('event:to:electron:main', {
        "optional": "data to pass to main process"
    });
}
BridgeMethods.HandleMainResponse = (event) => {
    ipcRenderer.on('event:from:electron:main', (event, response) => {
        /**
         * Our ipcRenderer call back function provides two parameters
         * event: an instance of a electron ipcRenderer event.
         * response: the response from the main process (optional) often JSON, Object, String, Array etc.
         **/
    });
}

/**
 * Expose electron bridge methods for interacting with the node backend securely.
 **/
contextBridge.exposeInMainWorld(
    'bridgeMethods', // API namespace attached to the window object window.api.someMethod().
    BridgeMethods // API methods to expose to the renderer process.
);

/**
 * DOMContent loaded event handler
 **/
window.addEventListener('DOMContentLoaded', () => {
    console.log("Preload.js loaded");
});
