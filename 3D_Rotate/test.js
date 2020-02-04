
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
    for (var i = 0; i < 4; i++) {
      line(project(newCoordinate[i][0],newCoordinate[i][2])*100, 
           project(newCoordinate[i][1],newCoordinate[i][2])*100,
           project(newCoordinate[(i+1) % 4][0],newCoordinate[(i+1) % 4][2])*100, 
           project(newCoordinate[(i+1) % 4][1],newCoordinate[(i+1) % 4][2])*100);

      line(project(newCoordinate[i+4][0],newCoordinate[i][2])*100, 
           project(newCoordinate[i+4][1],newCoordinate[i][2])*100,
           project(newCoordinate[((i+1) % 4)+4][0],newCoordinate[((i+1) % 4)+4][2])*100, 
           project(newCoordinate[((i+1) % 4)+4][1],newCoordinate[((i+1) % 4)+4][2])*100);

      line(project(newCoordinate[i][0],newCoordinate[i][2])*100, 
           project(newCoordinate[i][1],newCoordinate[i][2])*100,
           project(newCoordinate[i+4][0],newCoordinate[i+4][2])*100, 
           project(newCoordinate[i+4][1],newCoordinate[i+4][2])*100);

      line(project(newCoordinate[i+8][0],newCoordinate[i][2])*100, 
           project(newCoordinate[i+8][1],newCoordinate[i][2])*100,
           project(newCoordinate[((i+1) % 4)+8][0],newCoordinate[((i+1) % 4)+8][2])*100, 
           project(newCoordinate[((i+1) % 4)+8][1],newCoordinate[((i+1) % 4)+8][2])*100);

      line(project(newCoordinate[i+12][0],newCoordinate[i+12][2])*100, 
           project(newCoordinate[i+12][1],newCoordinate[i+12][2])*100,
           project(newCoordinate[((i+1) % 4)+12][0],newCoordinate[((i+1) % 4)+12][2])*100, 
           project(newCoordinate[((i+1) % 4)+12][1],newCoordinate[((i+1) % 4)+12][2])*100);

      line(project(newCoordinate[i+8][0],newCoordinate[i+8][2])*100, 
           project(newCoordinate[i+8][1],newCoordinate[i+8][2])*100,
           project(newCoordinate[i+12][0],newCoordinate[i+12][2])*100, 
           project(newCoordinate[i+12][1],newCoordinate[i+12][2])*100);
    }

    for (var i = 0; i < 8; i++) {
      line(project(newCoordinate[i][0],newCoordinate[i][2])*100, 
           project(newCoordinate[i][1],newCoordinate[i][2])*100,
           project(newCoordinate[i+8][0],newCoordinate[i+8][2])*100, 
           project(newCoordinate[i+8][1],newCoordinate[i+8][2])*100);
    }
    angle += 0.02

}