
//no cordinate should have less than 'screenDepth' depth(z)

// var original = [[100,100,200],[-100,100,200],[-100,-100,200],[100,-100,200],[100,100,400],[-100,100,400],[-100,-100,400],[100,-100,400],[-100,300,200],[100,300,200],[-100,300,400],[100,300,400]]

// var original = [[100,100,200],[-100,100,200],[-100,-100,200],[100,-100,200],[100,100,400],[-100,100,400],[-100,-100,400],[100,-100,400],[-100,300,200],[100,300,200],[-100,300,400],[100,300,400]]

// var original = [[0,0,0], [100,0,0], [0,100,0], [0,0,100]]

var screenDepth = 1

var rotationOrigin = [0,0,0]

var pressedKey = {
  "w":false,
  "a":false,
  "s":false,
  "d":false,
  "space":false,
  "shift":false
}

var startMouse = [0, 0]
var dragging = false

var images = null

function preload(){
  images = loadImage("/Soul_red.png")
}

function setup(){
  createCanvas(800,800);
  background(0);
}

function project(value1,value2,i1,i2){
    //projected point on the plane
    return (screenDepth/(value2-rotationOrigin[2])) * (value1-rotationOrigin[i1])
    // return (screenDepth/value2)*value1
}
d
angle = [0, 0, 0]
function draw(){
    background(0);
    translate(400,400)
    stroke(255,0,0)
    
    strokeWeight(5)
    fill(0,0,255)
    for (var i in original){
      beginShape();

      var color = original[i][original[i].length-1]
      stroke(color[0], color[1], color[2])
      // original[i].length
      for (var j = 0; j < original[i].length-1; j++){
        var coordinates = [original[i][j][0],original[i][j][1],original[i][j][2]]

        // var coordinates = [coordinates[0],coordinates[1]*Math.cos(angle[0]) - Math.sin(angle[0]),coordinates[1]*Math.sin(angle[0]) + coordinates[2]*Math.cos(angle[0])]

        
        coordinates = [rotationOrigin[0]+(coordinates[0]-rotationOrigin[0])*Math.cos(angle[0]) + (coordinates[2]-rotationOrigin[2])*Math.sin(angle[0]), rotationOrigin[1]+coordinates[1]-rotationOrigin[1],rotationOrigin[2] -(coordinates[0]-rotationOrigin[0])*Math.sin(angle[0]) + (coordinates[2]-rotationOrigin[2])*Math.cos(angle[0])]
        
        // var coordinates = [original[i][0],original[i][1]*Math.cos(angle[0]) - Math.sin(angle[0]),original[i][1]*Math.sin(angle[0]) + original[i][2]*Math.cos(angle[0])]
        
        // var coordinates = rotatePoint('y', coordinates[0],coordinates[1],coordinates[2])
        // var coordinates = rotatePoint('z', coordinates[0],coordinates[1],coordinates[2])
        if (dragging){
          original[i][j] = [coordinates[0],coordinates[1],coordinates[2]]
        }
        //projecting 3d point onto 2d plane
        bearing = Math.atan((coordinates[0]-rotationOrigin[0])/(coordinates[2]-rotationOrigin[2]))
        if (bearing < PI/4 && bearing > -PI/4){
          if (coordinates[2] > rotationOrigin[2]+screenDepth){
            var m = 300;
            point(project(coordinates[0],coordinates[2], 0, 2)*m,-project(coordinates[1],coordinates[2], 1, 2)*m);
          }
        }
      }
      endShape(CLOSE);
    }
    if (dragging){
      mouseDifference = [startMouse[0]-mouseX, startMouse[1]-mouseY]
      angle[0] = -mouseDifference[0]/200 + (Math.floor((-mouseDifference[0]/100)/(2*PI))*2*PI)*((mouseDifference[0] < 0)* -1)
      // console.log(angle[0])
    }
    // screenDepth -= 1
    var speed = 7
    if (pressedKey.space){
      rotationOrigin[1]+=speed
    }if (pressedKey.shift){
      rotationOrigin[1]-=speed
    }if (pressedKey.w){
      rotationOrigin[2]+=speed
    }if (pressedKey.a){
      rotationOrigin[0]-=speed
    }if (pressedKey.s){
      rotationOrigin[2]-=speed
    }if (pressedKey.d){
      rotationOrigin[0]+=speed
    }

    startMouse = [mouseX, mouseY]
}

function keyPressed(){
  if (keyCode == 32){
    pressedKey.space = true
  }else if (keyCode == 16){
    pressedKey.shift = true
  }else if (keyCode == 87){
    pressedKey.w = true
  }else if (keyCode == 65){
    pressedKey.a = true
  }else if (keyCode == 83){
    pressedKey.s = true
  }else if (keyCode == 68){
    pressedKey.d = true
  }
}function keyReleased(){
  if (keyCode == 32){
    pressedKey.space = false
  }else if (keyCode == 16){
    pressedKey.shift = false
  }else if (keyCode == 87){
    pressedKey.w = false
  }else if (keyCode == 65){
    pressedKey.a = false
  }else if (keyCode == 83){
    pressedKey.s = false
  }else if (keyCode == 68){
    pressedKey.d = false
  }
}


function mousePressed(){
  dragging = true
  startMouse = [mouseX, mouseY]
}function mouseReleased(){
  dragging = false;

  for (var i in original){

      // var coordinates = [original[i][0],original[i][1],original[i][2]]
      
      // var coordinates = [coordinates[0]*Math.cos(angle[0]) + coordinates[2]*Math.sin(angle[0]), coordinates[1],-coordinates[0]*Math.sin(angle[0]) + coordinates[2]*Math.cos(angle[0])]

      // var coordinates = [(coordinates[0]-rotationOrigin[0])*Math.cos(angle[0]) + (coordinates[2]-rotationOrigin[2])*Math.sin(angle[0]), coordinates[1]-rotationOrigin[1],-(coordinates[0]-rotationOrigin[0])*Math.sin(angle[0]) + (coordinates[2]-rotationOrigin[2])*Math.cos(angle[0])]
        

      // original[i] = [coordinates[0],coordinates[1],coordinates[2]]
      //projecting 3d point onto 2d plane
  }
  angle[0] = 0
}