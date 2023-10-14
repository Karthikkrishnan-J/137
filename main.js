Status = "";
object = "";
text = "";
function preload(){

}
function setup(){
canvas = createCanvas(600, 500);
canvas.center();
camera = createCapture(VIDEO);
camera.hide();
}
function draw(){
image(camera, 0, 0, 600, 500);
if(Status != ""){
r = random(255);
g = random(255);
b = random(255);
    modal.detect(camera, gotResult);
for (i = 0; i < object.length; i++){
    x = object[i].x;
    y = object[i].y;
    width = object[i].width;
    height = object[i].height;
    label = object[i].label;
    confidence = object[i].confidence;
    noFill();
    stroke(r,g,b);
    rect(x, y, width, height);
    //text(label + " " + confidence, x, y);
    if (label == text) {
        camera.stop();
        objectDetector.detect(gotResult);
        synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(text);
        synth.speak(utterThis);
    }
    else{
        document.getElementById("status").innerHTML = "Status : Object Not Found";
    }
}
}
}
function start(){
modal = ml5.objectDetector('cocossd', loadmodal);
document.getElementById("status").innerHTML = "Status : Detecting Object";
text = document.getElementById("inputBox").value;
}
function loadmodal(){
    console.log("modal is loaded");
    Status = true;
}
function gotResult(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        object = result;
    }
}