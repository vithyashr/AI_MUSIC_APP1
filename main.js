let rw_x = 0;
let rw_y = 0;
let lw_x = 0;
let lw_y = 0;
let score_wr = 0;
let score_lw = 0;
let song1_status = false;
let song2_status = false;
let song1, song2;

function preload() {
    song1 = loadSound("harrypotter song.mp3");
    song2 = loadSound("Peter Pan.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(460, 250);

    camera = createCapture(VIDEO);
    camera.hide();
    posenet = ml5.poseNet(camera, modelLoaded);
    posenet.on('pose', gotPoses);

    // Add event listener to the play button
   //  playButton = document.getElementById("playButton");
  //  playButton.addEventListener("click", startPlayback);
}

function modelLoaded() {
    console.log("Model loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        score_wr = results[0].pose.keypoints[10].score;
        score_lw = results[0].pose.keypoints[9].score;

        rw_x = results[0].pose.rightWrist.x;
        rw_y = results[0].pose.rightWrist.y;

        lw_x = results[0].pose.leftWrist.x;
        lw_y = results[0].pose.leftWrist.y;
    }
}

function draw() {
    image(camera, 0, 0, 600, 500);


    fill('red');
    stroke('orange');

    if (score_wr > 0.2) {
        circle(rw_x, rw_y, 20);
        song2.stop();
        song1.play()
       
            document.getElementById("harry").innerHTML = "Playing : Harry Potter Theme Song";
            document.getElementById("peter").innerHTML = "";
    
    }

    if (score_lw > 0.2) {
        circle(lw_x, lw_y, 20);
            song1.stop();
            song2.play()
            document.getElementById("peter").innerHTML = "Playing : Peter Pan Theme Song";
            document.getElementById("harry").innerHTML = "";
        }
    }


function startPlayback() {
    
    song1.rate(1)
    song2.rate(1)
    song1.play()
    song2.stop(); 
}
 function stopPlayback(){

    song1.stop()
    song2.stop()
}