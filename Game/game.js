
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

// function preload(){
//   images = loadImage("/Soul_red.png")
// }

function setup(){
  createCanvas(800,600);
  background(0);
}

function project(value1,value2,i1,i2){
    //projected point on the plane
    return (screenDepth/(value2-rotationOrigin[2])) * (value1-rotationOrigin[i1])
    // return (screenDepth/value2)*value1
}

function distance(point1, point2){
  return ((point1[0]-point2[0])**2+(point1[1]-point2[1])**2+(point1[2]-point2[2])**2)**0.5
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

        var intersect = ((yi >= y) != (yj >= y))
            && (x <= (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    if (inside){
      stroke(255,255,0)
      point(x,y)
      stroke(0,0,255)
    }
    return inside;
};

angle = [0, 0, 0]
function draw(){
    background(0);
    translate(400,300)
    
    stroke(255)
    line(-rotationOrigin[2]-screenDepth,-500 ,-rotationOrigin[2]-screenDepth ,500)
    strokeWeight(5)
    point(-rotationOrigin[2]-screenDepth, -rotationOrigin[1] ,-rotationOrigin[2]-screenDepth , -rotationOrigin[1])

    stroke(255,0,0)
    strokeWeight(2)
    fill(0,0,255)
    stroke(0);

    for (var i in original){
      for (var j = 0; j < original[i].length-1; j++){
        var coordinates = [original[i][j][0],original[i][j][1],original[i][j][2]]

        coordinates = [rotationOrigin[0]+(coordinates[0]-rotationOrigin[0])*Math.cos(angle[0]) + (coordinates[2]-rotationOrigin[2])*Math.sin(angle[0]), rotationOrigin[1]+coordinates[1]-rotationOrigin[1],rotationOrigin[2] -(coordinates[0]-rotationOrigin[0])*Math.sin(angle[0]) + (coordinates[2]-rotationOrigin[2])*Math.cos(angle[0])]
        
        original[i][j] = [coordinates[0],coordinates[1],coordinates[2]]

        // var pointDistance = distance(rotationOrigin, original[i][j])
        // average = [average[0] + original[i][j][0] ,average[1] + original[i][j][1] ,average[2] + original[i][j][2]]
      }
    }

    //=================================================================

    var projected = []
    for (var i in original){
      var outest = 0
      var newPlane = []
      for (var j = 0; j < original[i].length-1; j++){
        // //projecting 3d point onto 2d plane
        // bearing = Math.atan((original[i][j][0]-rotationOrigin[0])/(original[i][j][2]-rotationOrigin[2]))
        
        // if (bearing < PI/4 && bearing > -PI/4){
        stroke(255, 0, 0)
        strokeWeight(5)
          

        // var m = 1;
        var m = 390;
        if (original[i][j][2] > rotationOrigin[2]+screenDepth){
          // consolse.log(arranged[i][0][j])
          point(project(original[i][j][0], original[i][j][2], 0, 2)*m,-project(original[i][j][1], original[i][j][2], 1, 2)*m);

          po = ((project(original[i][j][0], original[i][j][2], 0, 2)*m)**2 + (-project(original[i][j][1], original[i][j][2], 1, 2)*m)**2)**0.5

          if (po < outest){
            outest = po;
          }

          newPlane.push([project(original[i][j][0], original[i][j][2], 0, 2)*m,-project(original[i][j][1], original[i][j][2], 1, 2)*m])

          // point(-original[i][j][2],-original[i][j][1])
        }else{
          stroke(0, 0, 255)
          strokeWeight(5)
          
          var ax = null;
          var yy = null;
          var yyy = null;



          var leftIndex = null;
          
          if (j == 0){
            leftIndex = original[i].length-2
          }else{
            leftIndex = j-1
          }
          var xpos;
          
          yyy = original[i][j][2] - rotationOrigin[2]  - screenDepth
          if (original[i][leftIndex][2]  > rotationOrigin[2]+screenDepth){
            ax = (original[i][leftIndex][0] - original[i][j][0])
            yy = original[i][j][2] - original[i][leftIndex][2]
            xpos = original[i][j][0] + (ax/yy)*yyy
          }

          var ypos;
          yyy = original[i][j][2] - rotationOrigin[2]  - screenDepth
          if (original[i][leftIndex][2]  > rotationOrigin[2]+screenDepth){
            ax = (original[i][leftIndex][1] - original[i][j][1])
            yy = original[i][j][2] - original[i][leftIndex][2]
            ypos = original[i][j][1] + (ax/yy)*yyy

            po = (((xpos - rotationOrigin[0])*m)**2 + (-(ypos - rotationOrigin[1])*m)**2)**0.5
            if (po > outest){
              outest = po;
            }
            newPlane.push([(xpos - rotationOrigin[0])*m, -(ypos - rotationOrigin[1])*m])
          }





          var rightIndex = null;
          
          if (j == original[i].length-2){
            rightIndex = 0
          }else{
            rightIndex = j+1
          }
          
            
          // if (arranged[i][0][rightIndex][2]  > rotationOrigin[2]+screenDepth){
          //   ax = (arranged[i][0][rightIndex][0] - arranged[i][0][j][0])
          //   yy = arranged[i][0][j][2] - arranged[i][0][rightIndex][2]
          //   xpos = arranged[i][0][j][0] + (ax/yy)*yyy
          // }
          // if (arranged[i][0][rightIndex][2]  > rotationOrigin[2]+screenDepth){
          //   ax = (arranged[i][0][rightIndex][1] - arranged[i][0][j][1])
          //   yy = arranged[i][0][j][2] - arranged[i][0][rightIndex][2]
          //   ypos = arranged[i][0][j][1] + (ax/yy)*yyy
          //   vertex((xpos - rotationOrigin[0])*m, -(ypos - rotationOrigin[1])*m)
          // }
                    
          if (original[i][rightIndex][2]  > rotationOrigin[2]+screenDepth){
            ax = (original[i][rightIndex][0] - original[i][j][0])
            yy = original[i][j][2] - original[i][rightIndex][2]
            xpos = original[i][j][0] + (ax/yy)*yyy
          }
          if (original[i][rightIndex][2]  > rotationOrigin[2]+screenDepth){
            ax = (original[i][rightIndex][1] - original[i][j][1])
            yy = original[i][j][2] - original[i][rightIndex][2]
            ypos = original[i][j][1] + (ax/yy)*yyy
            // vertex((xpos - rotationOrigin[0])*m, -(ypos - rotationOrigin[1])*m)

            po = (((xpos - rotationOrigin[0])*m)**2 + (-(ypos - rotationOrigin[1])*m)**2)**0.5
            if (po > outest){
              outest = po;
            }
            newPlane.push([(xpos - rotationOrigin[0])*m, -(ypos - rotationOrigin[1])*m])
          }
          

          strokeWeight(2)
          
          }
        // }
      }
      newPlane.push(original[i][original[i].length-1])
      projected.push(newPlane)
    }



    noStroke();
    for (var i in projected){
      var color = projected[i][projected[i].length-1]
      fill(color[0],color[1],color[2])
      beginShape()
      for (var j = 0; j < projected[i].length-1; j++){
        vertex(projected[i][j][0], projected[i][j][1])
      }
      endShape(CLOSE)
    }
    
    stroke(0,0,255)
    strokeWeight(14)
    for (var i in projected){
      for (var j = 0; j < projected[i].length-1; j++){
        var p = [projected[i][j][0], projected[i][j][1]]
        for (var i2 in projected){
          if (i2 != i){
            if (inside(p, projected[i2])){
              // point(p[0], p[1])
            }
          }
        }
      }
    }


    if (dragging){
      mouseDifference = [startMouse[0]-mouseX, startMouse[1]-mouseY]
      angle[0] = -mouseDifference[0]/200 + (Math.floor((-mouseDifference[0]/100)/(2*PI))*2*PI)*((mouseDifference[0] < 0)* -1)
      // console.log(angle[0])
    }
    // screenDepth -= 1
    var speed = 3
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
  angle[0] = 0
}