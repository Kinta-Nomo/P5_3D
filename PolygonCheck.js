
function setup(){
  createCanvas(500,500);
  background(0);
}

var poi = [50,50]
var shape = [[50,50],[-50,50],[-50,-50],[50,-50]]

function draw(){
  background(0);
  translate(250,250)
  strokeWeight(4);
  fill(255, 0, 0)
  beginShape()
  for (var i in shape){
    vertex(shape[i][0], shape[i][1])
  }
  endShape(CLOSE)
  strokeWeight(10)
  inside(poi, shape)
}

function inside(p, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = p[0], y = p[1];         

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        // point(xi,yi)

        if (xi == x)
        var intersect = ((yi >= y) != (yj >= y))
            && (x+1 <= (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
      stroke(255,255,0)
      point(x,y)
  strokeWeight(7);
    if (inside){
      stroke(255,0, 255)
      point(x,y)
      stroke(0,0,255)
    }
    return inside;
};