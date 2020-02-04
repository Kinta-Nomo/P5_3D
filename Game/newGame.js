<!DOCTYPE html>
<html>
<head>
<title>HTML5 canvas rectangles</title>
<script>
    function draw() {
        
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'gray';
        ctx.fillRect(10, 10, 60, 60);
        ctx.fillRect(100, 10, 100, 60);
    }
</script>
</head>

<body onload="draw();">
    <canvas id="myCanvas" width="350" height="250">
    </canvas>
</body>
</html> 