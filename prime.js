
var points = []

var currentNum = 1;

var distance = 0

function setup(){
  createCanvas(500,500);
}

function draw(){
  background(0);
  translate(width/2, height/2);

  var spiralLength = (currentNum+1)**2-currentNum**2
  for (var i = 0; i < spiralLength; i++){
    points.push([Math.cos(((Math.PI*2)/spiralLength)*i)*distance,
                 Math.sin(((Math.PI*2)/spiralLength)*i)*distance])
                 
    // fill(255);
    // ellipse(Math.cos(((Math.PI*2)/spiralLength)*i)*distance,
    //         Math.sin(((Math.PI*2)/spiralLength)*i)*distance,20)
    // fill(0);
    // text(currentNum**2 + i,
    //         Math.cos(((Math.PI*2)/spiralLength)*i)*distance,
    //         Math.sin(((Math.PI*2)/spiralLength)*i)*distance)

    distance += 20/spiralLength
  }

  for (var i = 0; i < points.length; i++){
      
    fill(255);
    // ellipse(points[i][0], points[i][1], 20)
    // fill(0);
    text(i+1, points[i][0], points[i][1])

  }

  currentNum ++; 
  distance = 0 
}