/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

/**
 * @namespace window.Abdx
 * @property { function } OrgListRequest - Request the list of orgs from the main process
 * @property { function } OrgListResponse - Callback function for the OrgListResponse event
 */

/**
 * Invoke api bridge methods to handle requests to and from the ipcMain process.
 */
window.bridgeMethods.EventToMain();
window.bridgeMethods.HandleMainResponse();
