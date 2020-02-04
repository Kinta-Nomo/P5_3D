
var original = [[-100,-100,-100,100],
                [100,-100,-100,100],
                [100,100,-100,100],
                [-100,100,-100,100],
                
                [-100,-100,100,100],
                [100,-100,100,100],
                [100,100,100,100],
                [-100,100,100,100],
                
                [-100,-100,-100,-100],
                [100,-100,-100,-100],
                [100,100,-100,-100],
                [-100,100,-100,-100],
                
                [-100,-100,100,-100],
                [100,-100,100,-100],
                [100,100,100,-100],
                [-100,100,100,-100]]

var screenDepth = 100

var rotationOrigin = [0,0,0]

function setup(){
  createCanvas(800,800);
  background(0);
}

function project(value1,value2){
    //projected point on the plane
    return (screenDepth/value2)*value1
}

var angle = 0
function draw(){
    background(0);
    translate(400,400)

    strokeWeight(5)
    newCoordinate = []
    for (var i in original){

        var x = original[i][0]
        var y = original[i][1]
        var z = original[i][2]
        var W = original[i][3]
        var rot = [x,
                   y,
                   z*cos(angle) + (W*-sin(angle)),
                   z*sin(angle) + (W*cos(angle))]

        var rot1 =[rot[0]*cos(angle) + rot[1]*(-sin(angle)),
                   rot[0]*sin(angle) + rot[1]*cos(angle),
                   rot[2],
                   rot[3]]

        var ingle = -3.141592653589793/2
        var rot2 =[rot1[0],
                   rot1[1]*cos(ingle) + rot1[2]*(-sin(ingle)),
                   rot1[1]*sin(ingle) + rot1[2]*cos(ingle),
                   rot1[3]]

        var wDepth = 200
        var w = 1/(wDepth - rot2[3])
        // console.log(w==)
        var np = [[rot2[0]*w],[rot2[1]*w],[rot2[2]*w]]
        newCoordinate.push([np[0][0], np[1][0], np[2][0]+250])

        point(project(newCoordinate[i][0],newCoordinate[i][2])*100,project(newCoordinate[i][1],newCoordinate[i][2])*100)
        
    }
    stroke(255, 0, 0)
    for (var i in newCoordinate){
        point(newCoordinate[i][0]*100,newCoordinate[i][1]*100)
    }

    strokeWeight(2)
    stroke(0,0,255)
    for (var i = 0; i < original.length; i++) {
      var distances = []
      for (var j = 0; j < original.length; j++) {
        if (i != j){
          distances.push(((original[j][0]-original[i][0])**2 + 
                        (original[j][1]-original[i][1])**2 + 
                        (original[j][2]-original[i][2])**2 + 
                        (original[j][3]-original[i][3])**2)**0.5)
        }
      }
      
      shortest = []
      for (var j = 0; j < 3; j++){
        var min = distances.indexOf(Math.min(...distances))
        shortest.push(min+(j))
        // console.log(min+j))
        console.log(distances[min])
        distances.splice(min, 1)
      }
      // console.log(shortest)
      for (var j in shortest){
        line(project(newCoordinate[i][0],newCoordinate[i][2])*100, 
            project(newCoordinate[i][1],newCoordinate[i][2])*100,
            project(newCoordinate[shortest[j]][0],newCoordinate[shortest[j]][2])*100, 
            project(newCoordinate[shortest[j]][1],newCoordinate[shortest[j]][2])*100);
      }
    }
    angle += 0.02

}