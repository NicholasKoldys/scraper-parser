try {
    //this is a temporary error wrapper to catch errors in the js extension files.
    importScripts("background.js");
} catch (error) {
    console.error(error);
}