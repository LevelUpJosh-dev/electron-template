'use strict';

const path = require('path');
const { BrowserWindow } = require('electron');

let WindowHelpers = {};

/**
 * @namespace WindowHelpers
 * @param mainWindow {BrowserWindow||null} - Instance of electron BrowserWindow
 */
WindowHelpers.OpenDevTools = (mainWindow = null) => {
    const { webContents } = mainWindow;
    /**
     * Simple conditional if we don't have a window none of this works so throw an error.
     **/
    if (mainWindow === null) {
        throw new Error('Instance of electron BrowserWindow is required.');
    }
    webContents.openDevTools();
};

/**
 * @namespace WindowHelpers
 * @function CreateWindow
 * @param app {Electron.App||null} - Instance of electron app
 * @constructor
 */
WindowHelpers.CreateWindow = (app = null) => {
    /**
     * Create an instance of an electron window. The webPreferences property is required to allow the window to use node.js
     * via the electron bridge and the preload script.
     **/
    const mainWindow = new BrowserWindow({
        width: 1440,
        height: 1280,
        webPreferences: {
            preload: path.normalize(path.join(global.__basedir + '/preload.js')),
        },
    });

    /**
     * Load our base frontend index.html file.
     **/
    mainWindow.loadFile('./Frontend/Html/index.html').then(() => {
        console.log('Loaded index.html');
    });

    /**
     * It's often convenient to auto open devTools when in active development
     * uncomment the following line to enable this feature.
     * WindowHelpers.OpenDevTools(mainWindow);
     **/
};

module.exports = WindowHelpers;
