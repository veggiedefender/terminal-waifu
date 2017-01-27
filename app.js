function display(format, contents) {
  colors = getColors(format, contents);
  if (colors) {
    colors.forEach(function(color) {
      console.log(color);
    })
  } else {
    console.log("couldn't read");
  }
}

$("#submit").click(function(event) {
  format = $("#format").val();
  contents = $("#contents").val();
  $("#file-input").remove();
  display(format, contents);
});