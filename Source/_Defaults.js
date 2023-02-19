/**
 * Import JavaScript libraries required for backend.
 */
var LIBRARIES = {
  mustache: "https://unpkg.com/mustache@latest",
};

Object.keys(LIBRARIES).forEach(function (library) {
  newFunc = loadJSFromUrl(LIBRARIES[library]);
  eval("var " + library + " = " + newFunc);
});

function loadJSFromUrl(url) {
  return eval(UrlFetchApp.fetch(url).getContentText());
}
