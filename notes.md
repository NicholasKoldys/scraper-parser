BACKGROUND.js
-----------------

**How to add Context Menu**

plan is to add right click context menu for popup and input, as clicking the extension icon runs the main inject.js.

// var CONTEXT_MENU_CONTENTS = {
//     options : [
//       'foo',
//       'bar',
//       'baz'
//     ]
//   }
  
// function setUpContextMenus() {
//     CONTEXT_MENU_CONTENTS.options.forEach( (commandId) => {
//         chrome.contextMenus.create({
//             title: 'A: ' + commandId,
//             type: 'radio',
//             id: 'A' + commandId,
//             documentUrlPatterns: [ "chrome-extension://*/a.html"],
//             contexts: ['all']
//         });
//     });
// }

// chrome.runtime.onInstalled.addListener(function() {
//     // When the app gets installed, set up the context menus
//     setUpContextMenus();
// });


// chrome.contextMenus.onClicked.addListener( (contextItem) => {
//     console.log( JSON.stringify( contextItem.menuItemId )  ); 
// });
    
// //   chrome.contextMenus.onClicked.addListener(function(itemData) {
// //     if (itemData.menuItemId == "launcher0")
// //       chrome.app.window.create('a.html', {id: 'a', outerBounds:{top: 0, left: 0, width: 300, height: 300}});
// //     if (itemData.menuItemId == "launcher1")
// //       chrome.app.window.create('b.html', {id: 'b', outerBounds:{top: 0, left: 310, width: 300, height: 300}});
// //   });

// //   chrome.action.onClicked.addListener(function() {
// //     chrome.app.window.create('a.html', {id: 'a', outerBounds:{top: 0, left: 0, width: 300, height: 300}});
// //     chrome.app.window.create('b.html', {id: 'b', outerBounds:{top: 0, left: 310, width: 300, height: 300}});
// //   });
