contents_id = $("#contents");

//load format/contents if saved
contents = localStorage.getItem("contents");
if (contents != null) {
  console.log("loaded contents from localStorage");
  format = localStorage.getItem("format");
  console.log("loaded format from localStorage");
  $("format").val(format);
  contents_id.val(contents);
}

function display(format, contents) {
  colors = getColors(format, contents);
  if (colors && colors.length > 0) {
    localStorage.setItem("contents", contents);
    $("#waifu-container").append(hori);

    background = colors[17];
    foreground = colors[16];
    $("#waifu").css("background-color", background);

    for (var i = 0; i <= 15; i++) {
      color = colors[i];
      region = ".st" + i;
      $(region).css("fill", color);
    }
    $(".words").css("fill", foreground);

    var serializer = new XMLSerializer();
    var svg = $("#waifu").get(0);
    var string = serializer.serializeToString(svg);
    var encoded = window.btoa(string);
    window.location.replace("data:image/svg+xml;base64," + encoded);
  } else {
    $("#error").fadeIn(300);
  }
}

$("#submit").click(function(event) {
  format = $("#format").val();
  contents = contents_id.val();
  display(format, contents);
});
$("#reset").click(function(event) {
  localStorage.clear();
  window.location.reload();
});

contents_id.on("input", function(e) {
  contents = contents_id.val();
  format = autodetect(contents);
  $("#format").val(format);
});

contents_id.on("dragover", function(event) {
  dt = event.originalEvent.dataTransfer;
  //check if dragged item is a file
  if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))) {
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
      contents_id.removeClass("dragging");
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
  if (contents[0] == "{") {
    return "json";
  }
  if (contents.contains("[colors]")) {
    return "termite";
  }
  if (contents.contains("!")) {
    return "xresources";
  }
  return "iterm";
}

contents_id.trigger("input");