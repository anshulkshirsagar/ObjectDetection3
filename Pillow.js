img = "";
var status = "";
objects = [];

function setup(){
    canvas = createCanvas(1500, 800);
    canvas.position(1, 200);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function preload(){
    img = loadImage("pillowImage.jpeg");
}
function modelLoaded(){
    status = true;
    objectDetector.detect(img, gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(img, 0, 0, 1500, 800);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}