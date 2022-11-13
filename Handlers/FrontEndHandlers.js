'use strict';

/**
 * @namespace FrontEndHandlers
 * Expose the electron ipcMain process backend handlers
 * to front end requests affectively.
 **/
const { ipcMain } = require('electron');

let FrontEndHandlers = {};

/**
 * @namespace FrontEndHandlers
 * @function LoadFrontEndHandlers
 * @description Loads all the front end handlers
 * Both the ipcMain and ipcRenderer process communicate via these event channels
 * communicating back and forth is as simple as creating the necessary event request and response
 * handlers
 */
FrontEndHandlers.LoadFrontEndHandlers = () => {
    /**
     * Handles the event request from the front end ipcRenderer process
     **/
    ipcMain.on('event:to:electron:main', (event, request) => {
        /**
         * Some data simulating your JSON, String, Object or whatever data you want to send back to the front end
         */
        let responseData = {};
        responseData.string = 'This is a string';
        responseData.number = 123;
        responseData.object = {
            key: 'value',
        };

        /**
         * Send back our response data to the front end keep in mind the ipcRenderer process
         * need to have an event handler setup listening for this channel in order to receive this data.
         **/
        event.sender.send('event:from:electron:main', responseData);
    });
};

module.exports = FrontEndHandlers;
