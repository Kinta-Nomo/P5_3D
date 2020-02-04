
//no cordinate should have less than 'screenDepth' depth(z)

var original = [[100,200],[-100,200],[-100,400],[100,400]]
var screenDepth = 100

var rotationOrigin = [0,300]

function setup(){
    createCanvas(800,800);
    background(0);
}

function project(value1,value2){
    //projected point on the plane
    return (screenDepth/value2)*value1
}

function rotatePoint(x,y){
  var radius = ((x-rotationOrigin[0])**2+(y-rotationOrigin[1])**2)**0.5
  var zeroAngle = Math.atan((y-rotationOrigin[1])/(x-rotationOrigin[0]+0.001))
  
  //other half of the rotation
  if (x<rotationOrigin[0]){
      zeroAngle+=3.141592653589793
  }
  
  return [rotationOrigin[0]+Math.cos(zeroAngle+0.01)*radius, rotationOrigin[1]+Math.sin(zeroAngle+0.01)*radius]
}

function draw(){
    background(0);
    translate(400,500)
    stroke(255,0,0)
    strokeWeight(5)
    for (var i in original){
        point(original[i][0],-original[i][1])
    }
    stroke(0,0,255)
    for (var i in original){
        //projecting 3d point onto 2d plane
        point(project(original[i][0],original[i][1]), -screenDepth)
        
        var coordinates = rotatePoint(original[i][0],original[i][1])
        original[i] = [coordinates[0],coordinates[1]]
    }
    
}