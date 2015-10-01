var canvas = document.querySelector('#canvas'),
    context = canvas.getContext('2d'),
    mouse = {x: 0, y: 0},
    color = (new window.RColor()).get(false, 0.8, 0.94),
    circles = [],
    radius = 5,
    circleRadius = 300,
    pointsNo = 4,
    center = {x: 0, y: 0},
    matrix = [],
    startAngle = 0;

canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

center.x = canvas.width/2;
center.y = canvas.height/2;


canvas.addEventListener('mousemove', canvasMouseMove);
canvas.addEventListener('click', canvasOnClick);

updateCanvas();

function canvasMouseMove() {
//    startAngle = (startAngle + 1) % 360;
//    updateCanvas();
}

function canvasOnClick() {
    pointsNo++;
    updateCanvas();
}

function updateCanvas() {
    clearCanvas();
    circles = [];
    matrix = [];
//    drawCircleGuideLines();

    var angle = 360 / pointsNo;

    for(var i = 0; i < pointsNo; i++) {
        var coords = window.tb.getCoordsOnCircle(startAngle + angle * i, circleRadius, center);
        coords.color = color;
        coords.radius = radius;
        circles.push(coords);
        matrix.push(new Array(pointsNo));
    }

    connectTheDots();
}

function connectTheDots() {
    for(var i = 0; i < circles.length; i++) {
        var from = circles[i];
        var i_before = i-1;

        if(i_before < 0){
            i_before = circles.length - 1;
        }
        var before = circles[i_before];

        for (var j = 0; j < circles.length; j++) {
            var to = circles[j];

            if(i != j && matrix[i][j] == undefined && matrix[i][j] == undefined) {
                var sliceColor = (new window.RColor()).get(false, 0.79, 0.93);
                context.strokeStyle = 'rgba('+ 0 + ',' + 0 + ',' + 0 + ',' + 0.5 + ')';
                context.beginPath();
                context.moveTo(from.x, from.y);
                context.lineTo(to.x, to.y);
                context.lineTo(before.x, before.y);
                context.lineTo(from.x, from.y);
//                context.stroke();
                context.fillStyle = 'rgba(' + sliceColor[0] + ',' + sliceColor[1] + ',' + sliceColor[2] + ',' + 0.2 + ')';
                context.fill();
                context.closePath();

                matrix[i][j] = 1;
                matrix[j][i] = 1;

                matrix[i_before][j] = 1;
                matrix[j][i_before] = 1;

                matrix[i][i_before] = 1;
                matrix[i_before][i] = 1;
            }
        }
    }
}

function addCircle(point) {
    var tempCircles = [];
    var dfx = window.tb.distAB({x:0, y: 0}, point);
    point.radius = radius;
    point.dfx = dfx;
    point.color = color;
    circles.push(point);
}


function drawCircleGuideLines() {
    context.lineWidth = 1;
    context.strokeStyle = 'rgba('+ 0 + ',' + 0 + ',' + 0 + ',' + 0.5 + ')';
    context.beginPath();
    context.arc(center.x, center.y, circleRadius, 0, Math.PI * 2, true);
    context.stroke();
    context.closePath();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(point, alpha) {
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(' + point.color[0] + ',' + point.color[1] + ',' + point.color[2] + ',' + alpha + ')';
    context.beginPath();
    context.arc(point.x, point.y, point.radius, 0, Math.PI * 2, true);
    context.stroke();
    context.fillStyle = 'rgba(' + point.color[0] + ',' + point.color[1] + ',' + point.color[2] + ',' + alpha + ')';
    context.fill();
    context.closePath();
}