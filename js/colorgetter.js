//to "compile":
//browserify colorgetter.js | uglifyjs --compress --mangle > bundle.js
var termcolors = require('termcolors');

function getColors(type, contents) {
  var colors;
  switch (type) {
    case "iterm":
      colors = termcolors.iterm.import(contents);
      break;
    case "json":
      colors = termcolors.json.import(contents);
      break;
    case "terminalapp":
      colors = termcolors.terminalapp.import(contents);
      break;
    case "termite":
      colors = termcolors.termite.import(contents);
      break;
    case "xresources":
      colors = termcolors.xresources.import(contents);
      break;
  }
  if (colors) {
    colors = Object.keys(colors).map(function(color) {
      return colors[color].toHex();
    })
    return colors;
  }
}

window.getColors = getColors;