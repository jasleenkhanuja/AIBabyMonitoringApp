objects = [];
status = "";
video = "";

function preload(){
    video = createVideo('https://youtube.com/shorts/n34feC8gDYw?si=ZEymIgSs7Hnrn7Iq');
    video.hide();
}
function setup() {
    canvas = createCanvas(480, 380)
    canvas.center();
}
function draw() {
    image(video, 0, 0, 480, 380)
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Person Detected";
            document.getElementById("baby_found").innerHTML = "Baby Found";
            
         fill('#ff0000');
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
         noFill();
         stroke('#ff0000');
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error, results) {
 if (error) {
    console.log(error);
    src='emergency_alert.mp3'
 }
 console.log(results)
 objects = results;
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}