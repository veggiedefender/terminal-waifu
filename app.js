function readFile(e) {
  var file = e.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      display(contents);
    };
    reader.readAsText(file);
  }
}

function display(contents) {
  colors = getColors("termite", contents);
  if (colors) {
    $("#file-input").style.display = "none";
  } else {
    console.log("couldn't read");
  }
}

$(document).ready(function() {
  $("#file-input").on("change", function(e) {
    readFile(e);
  })
});