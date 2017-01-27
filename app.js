contents_id = $("#contents");

function display(format, contents) {
  colors = getColors(format, contents);
  if (colors && colors.length > 0) {
    $("#file-input").remove();
    $("#waifu").append(waifu);
    for (var i = 0; i < colors.length; i++) {
      color = colors[i];
      id = "#_" + i;
      $(id).css({"fill": color});
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

String.prototype.contains = function(v) {
  return this.indexOf(v) != -1;
}
function autodetect(contents) {
  //incredibly naive format autodetection
  if (contents.contains("<data>")) {
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

waifu = `<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg8"
   version="1.1"
   viewBox="0 0 210 297"
   height="297mm"
   width="210mm">
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="layer1">
    <ellipse
       ry="32.883926"
       rx="31.75"
       cy="66.8125"
       cx="80.130951"
       id="_1"
       style="fill:none;stroke:#000000;stroke-width:13.07094574;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <ellipse
       ry="22.111607"
       rx="40.443455"
       cy="187.19792"
       cx="129.64583"
       id="_2"
       style="fill:none;stroke:#000000;stroke-width:13.07094574;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <ellipse
       ry="19.276785"
       rx="23.623512"
       cy="267.13986"
       cx="56.129463"
       id="_3"
       style="fill:none;stroke:#000000;stroke-width:13.07094574;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <ellipse
       ry="11.339286"
       rx="12.851191"
       cy="136.7381"
       cx="36.663689"
       id="_4"
       style="fill:none;stroke:#000000;stroke-width:13.07094574;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <ellipse
       ry="19.087799"
       rx="17.008928"
       cy="86.278275"
       cx="173.86905"
       id="_5"
       style="fill:none;stroke:#000000;stroke-width:13.07094574;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
  </g>
</svg>`