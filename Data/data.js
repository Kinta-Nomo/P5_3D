  
var original = []

function cuboid(x,y,z, w, h, d, color){
  // (color[0], color[1], color[2])

  // original.push([[x, y, z], [x+w, y, z], [x+w, y+h, z], [x, y+h, z],
  //  [x, y+h, z+d], [x+w, y+h, z+d], [x+w, y, z+d],
  //   [x, y, z+d], [255, 255, 0]])
  var r = color[0]
  var g = color[1]
  var b = color[2]
  var points = [[x, y, z], [x+w, y, z], [x+w, y+h, z], [x, y+h, z], [x, y+h, z+d], [x+w, y+h, z+d], [x+w, y, z+d]]
  var faces = [[[x, y, z], [x+w, y, z], [x+w, y+h, z], [x, y+h, z], [r, g, b]],
               [[x, y, z], [x+w, y, z], [x+w, y, z+d], [x, y, z+d], [r-30, g, b]],
               [[x, y, z], [x, y+h, z], [x, y+h, z+d], [x, y, z+d], [r-70, g, b]],

               [[x+w, y+h, z+d], [x, y+h, z+d], [x, y, z+d], [x+w, y, z+d], [r, g, b]],
               [[x+w, y+h, z+d], [x, y+h, z+d], [x, y+h, z], [x+w, y+h, z], [r-30, g, b]],
               [[x+w, y+h, z+d], [x+w, y, z+d], [x+w, y, z], [x+w, y+h, z], [r-70, g, b]]
               ]
  //   [x, y, z+d], [255, 255, 0]]]

  for (var f in faces){
    original.push(faces[f])
  }
}

//check
// for (var i = 0; i< 100; i++){
//   cuboid(0, 0, 0, 100, 100, 100, [255, 0, 0])
// }
// console.log(original)

// original.push([[-25, 0, 0], [25, 0, 0], [25, 0, 200], [-25, 0, 200], [255,0,0]])
cuboid(-50, -50, 0, 50, 50, 200, [255, 0, 0])
cuboid(-50, -100, 0, 100, 20, 1000, [255, 0, 0])
// cuboid(-50, -100, 0, 100, 20, 1000, [255, 0, 0])