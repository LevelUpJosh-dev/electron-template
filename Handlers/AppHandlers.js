'use strict';

/**
 * @function BrowserWindow - Creates a new BrowserWindow
 * @docs https://www.electronjs.org/docs/api/browser-window
 **/
const { BrowserWindow } = require('electron');
/**
 * @function CreateWindow - Creates a new BrowserWindow.
 **/
const { CreateWindow } = require('../Helpers/WindowHelpers');
const { LoadFrontEndHandlers } = require('./FrontEndHandlers.js');

let AppHandlers = {};

/**
 * @function AppReadyHook - Tracks the readyiness of the application and then creates a new instance of the window.
 * @param app - Electron App
 * @returns {Promise<void>}
 */
AppHandlers.AppReadyHook = async (app) => {
    /**
     * This method will be called when Electron has finished
     * initialization and is ready to create browser windows.
     * Some APIs can only be used after this event occurs.
     */
    app.whenReady().then(() => {
        /** Create a new electron window helper method. **/
        CreateWindow(app);
        LoadFrontEndHandlers();
        app.on('activate', function () {
            /**
             * On macOS, it's common to re-create a window in the app when the
             * dock icon is clicked and there are no other windows open.
             */
            if (BrowserWindow.getAllWindows().length === 0) {
                CreateWindow();
            }
        });
    });
};

/**
 * @function AppWindowAllClosedHook - Tracks the closing of all windows and then quits the application if macOS.
 * @param app
 * @constructor
 */
AppHandlers.AppWindowCloseHook = (app) => {
    /**
     * Quit when all windows are closed, except on macOS. There, it's common
     * for applications and their menu bar to stay active until the user quits
     * explicitly with Cmd + Q.
     */
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit();
    });
};

module.exports = AppHandlers;
