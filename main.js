'use strict';

/**
 * @author Red Van Josh
 * @license MIT
 * @version 1.0.0
 * Electron Template
 */

/**
 * Expose native node path module.
 **/
const path = require('path');
/**
 * Store the main application base path to the global namepace.
 **/
global.__basedir = __dirname;

/**
 * Expose Electron app.
 * @function app - Electron app.
 **/
const { app } = require('electron');
/**
 * @namespace AppHandlers - Electron app handlers.
 * Helper methods created for handling electron application events.
 * @function AppReadyhook - Callback function for app ready event.
 * @function AppWindowCloseHook - Callback function for app window close event.
 */
const { AppReadyHook, AppWindowCloseHook } = require('./Handlers/AppHandlers.js');

/**
 * Envoke our Application handlers
 */
AppReadyHook(app);
AppWindowCloseHook(app);
