//Create canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var touchzone = document.getElementById("myCanvas");
var lastPt = new Object();
//Set background
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 500);

//Lines is default
lines();

var removeRectangleInLine = 0;

function lines() {
	touchzone.addEventListener("touchmove", paint, false);
	touchzone.addEventListener("touchend", end, false);

	//Paint includes line width, line cap, and color
	function paint(e) {
		e.preventDefault();
		for (var i = 0; i < e.touches.length; i++) {
			var id = e.touches[i].identifier;
			if (lastPt[id]) {
				ctx.beginPath();
				ctx.moveTo(lastPt[id].x, lastPt[id].y);
				ctx.lineTo(
					e.touches[i].pageX - this.offsetLeft,
					e.touches[i].pageY - this.offsetTop
				);
				ctx.lineWidth = lineWidthRange();
				ctx.lineJoin = "round";
				ctx.lineCap = brushstyle;
				ctx.strokeStyle = colors;
				ctx.stroke();
			}
			lastPt[id] = {
				x: e.touches[i].pageX - this.offsetLeft,
				y: e.touches[i].pageY - this.offsetTop,
			};
		}
	}

	function end(e) {
		e.preventDefault();
		for (var i = 0; i < e.changedTouches.length; i++) {
			var id = e.changedTouches[i].identifier;
			// Terminate this touch
			delete lastPt[id];
		}
	}
};


	//Color palette
var colors;
function changeColors(palette)
{
		switch (palette.id) {
			case "red":
				colors = "red";
				break;
			case "red1":
				colors = "#F16161";
				break;
			case "red2":
				colors = "#F69FA0";
				break;
			case "orange":
				colors = "orange";
				break;
			case "orange1":
				colors = "#F99F62";
				break;
			case "orange2":
				colors = "#FBB57B";
				break;
			case "blue":
				colors = "#09C2DB";
				break;
			case "blue1":
				colors = "#8BD3DC";
				break;
			case "blue2":
				colors = "#B9E3E8";
				break;
			case "indigo":
				colors = "#0E38AD";
				break;
			case "indigo1":
				colors = "#546AB2";
				break;
			case "indigo2":
				colors = "#9C96C9";
				break;
			case "green":
				colors = "green";
				break;
			case "green1":
				colors = "#97CD7E";
				break;
			case "green2":
				colors = "#C6E2BB";
				break;
			case "black":
				colors = "black";
				break;
			case "black1":
				colors = "#545454";
				break;
			case "black2":
				colors = "#B2B2B2";
				break;
			case "yellow":
				colors = "yellow";
				break;
			case "yellow1":
				colors = "#F7F754";
				break;
			case "yellow2":
				colors = "#F7F4B1";
				break;
			case "purple":
				colors = "#B9509E";
				break;
			case "purple1":
				colors = "#D178B1";
				break;
			case "purple2":
				colors = "#E3ABCE";
				break;
			case "erase":
				colors = "white";
				break;
		}
};


//Change brush style
var brushstyle;
function changeBrushStyle(obj) {
  switch (obj.id) {
    case "round":
      brushstyle = "round";
      break;
    case "square":
      brushstyle = "butt";
      break;
    case "rough":
      brushstyle = "square";
      break;
  }
}

//Change line width
function lineWidthRange() {
  var widthLine = document.getElementById("myRange").value;
  return widthLine;
}

//Clear canvas
function erase() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Save image
var button = document.getElementById("dwnld");
button.addEventListener("click", function () {
  var dataURL = canvas.toDataURL("image/png");
  button.href = dataURL;
});
