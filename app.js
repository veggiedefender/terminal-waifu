contents_id = $("#contents");

function display(format, contents) {
  colors = getColors(format, contents);
  if (colors && colors.length > 0) {
    $("#file-input").remove();
    $("#waifu").append(hori);
    console.log(colors);
    for (var i = 0; i < colors.length; i++) {
      color = colors[i];
      region = ".st" + i;
      $(region).css({"fill": color});
    }
  } else {
    $("#error").fadeIn(300);
  }
}

$("#submit").click(function(event) {
  format = $("#format").val();
  contents = contents_id.val();
  display(format, contents);
});

contents_id.on("input", function(e) {
  contents = contents_id.val();
  format = autodetect(contents);
  $("#format").val(format);
});

contents_id.on("dragover", function(event) {
  if (event.originalEvent.types.indexOf('Files') != -1) {
      event.preventDefault();  
      event.stopPropagation();
      contents_id.addClass("dragging");
  }
});
contents_id.on("dragleave", function(event) {
    event.preventDefault();  
    event.stopPropagation();
    contents_id.removeClass("dragging");
});
contents_id.on("drop", function(event) {
    event.preventDefault();  
    event.stopPropagation();
    file = event.originalEvent.dataTransfer.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      contents_id.val(contents);
      contents_id.removeClass("dragging")
      contents_id.trigger("input");
    }
    reader.readAsText(file);    
});


String.prototype.contains = function(v) {
  return this.indexOf(v) != -1;
}
function autodetect(contents) {
  //incredibly naive format autodetection
  if (contents.contains("<data>")) {
    //runs before iterm because both
    //use xml but this uses <data> tag
    return "terminalapp";
  }
  if (contents.contains("<key>")) {
    return "iterm";
  }
  if (contents.contains("{")) {
    return "json";
  }
  if (contents.contains("[colors]")) {
    return "termite";
  }
  if (contents.contains("!")) {
    return "xresources"
  }
  return "iterm";
}