
//no cordinate should have less than 'screenDepth' depth(z)

var original = [[100,100,200],[-100,100,200],[-100,-100,200],[100,-100,200],[100,100,400],[-100,100,400],[-100,-100,400],[100,-100,400]
                ,[-100,300,200],[100,300,200],[-100,300,400],[100,300,400]]
var screenDepth = 50

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


function setup(){
    createCanvas(800,800);
    background(0);
}

function project(value1,value2,i1,i2){
    //projected point on the plane
    // return ((rotationOrigin[2]+screenDepth)/(value2-rotationOrigin[2])) * (rotationOrigin[i1]-value1)
    return ((screenDepth)/(value2-rotationOrigin[2]))* (value1-rotationOrigin[0])
    // return (screenDepth/value2)*value1
}

angle = [0, 0, 0]
function draw(){
    background(0);
    translate(400,400)
    strokeWeight(5)
    for (var i in original){

        var coordinates = [original[i][0],original[i][1],original[i][2]]

        // var coordinates = [coordinates[0],coordinates[1]*Math.cos(angle[0]) - Math.sin(angle[0]),coordinates[1]*Math.sin(angle[0]) + coordinates[2]*Math.cos(angle[0])]

        
        coordinates = [coordinates[0]*Math.cos(angle[0]) + coordinates[2]*Math.sin(angle[0]), coordinates[1],-coordinates[0]*Math.sin(angle[0]) + coordinates[2]*Math.cos(angle[0])]

        // var coordinates = [original[i][0],original[i][1]*Math.cos(angle[0]) - Math.sin(angle[0]),original[i][1]*Math.sin(angle[0]) + original[i][2]*Math.cos(angle[0])]
        
        stroke(255,0,0)
        m = 1
        point(coordinates[0]/m, coordinates[2]/m)
        line(-1000, (rotationOrigin[2]+screenDepth)/m, 1000, (rotationOrigin[2]+screenDepth)/m)
        stroke(255,0,255)
        strokeWeight(2)
        line(coordinates[0]/m, coordinates[2]/m, rotationOrigin[0]/m, rotationOrigin[2]/m)
        // var coordinates = rotatePoint('y', coordinates[0],coordinates[1],coordinates[2])
        // var coordinates = rotatePoint('z', coordinates[0],coordinates[1],coordinates[2])
        // original[i] = [coordinates[0],coordinates[1],coordinates[2]]
        strokeWeight(5)
        stroke(255)
        point(project(coordinates[0], coordinates[2], 0, 2)/m, (rotationOrigin[2]+screenDepth)/m+5)

        stroke(0,0,255)
        //projecting 3d point onto 2d plane
        if (Math.atan(coordinates[0]/coordinates[2]) < PI/2 && coordinates[2]>0){
          if (coordinates[2] > rotationOrigin[2]+screenDepth){
          var m = 1
          point(project(coordinates[0],coordinates[2], 0, 2)*m,project(coordinates[1],coordinates[2], 1, 2)*m, 0, 1)
          }
        }
    }
    if (dragging){
      mouseDifference = [startMouse[0]-mouseX, startMouse[1]-mouseY]
      if (mouseDifference[0] < 0){
        angle[0] = -mouseDifference[0]/100 - Math.floor((-mouseDifference[0]/100)/(2*PI))*2*PI
      }else{
        angle[0] = -mouseDifference[0]/100 + Math.floor((-mouseDifference[0]/100)/(2*PI))*2*PI
      }
      // console.log(angle[0])
    }
    // screenDepth -= 1

    if (pressedKey.space){
      rotationOrigin[1]-=3
    }if (pressedKey.shift){
      rotationOrigin[1]+=3
    }if (pressedKey.w){
      rotationOrigin[2]+=3
    }if (pressedKey.a){
      rotationOrigin[0]-=3
    }if (pressedKey.s){
      rotationOrigin[2]-=3
    }if (pressedKey.d){
      rotationOrigin[0]+=3
    }
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

      var coordinates = [original[i][0],original[i][1],original[i][2]]
      
      var coordinates = [coordinates[0]*Math.cos(angle[0]) + coordinates[2]*Math.sin(angle[0]), coordinates[1],-coordinates[0]*Math.sin(angle[0]) + coordinates[2]*Math.cos(angle[0])]

      original[i] = [coordinates[0],coordinates[1],coordinates[2]]
      //projecting 3d point onto 2d plane
  }
  angle[0] = 0
}