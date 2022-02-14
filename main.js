bruno_song="";
let_it_go_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_bruno = "";
song_let_it_go = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Bruno_song = loadSound("music.mp32.mp3");
    let_it_go_song = loadSound("music.mp31.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_bruno_ = bruno_song.isPlaying();
    console.log(song_bruno);

    song_let_it_go = let_it_go_song.isPlaying();
    console.log(song_let_it_go);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        let_it_go_song.stop();
        if(song_bruno == false){
        bruno_song.play();
        }
        else{
            console.log("Song Name: bruno song");
            document.getElementById("song_id").innerHTML = "Song Name: bruno song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        bruno_song.stop();
        if(song_let_it_go == false){
            let_it_go_song.play();
        }
        else{
            console.log("Song Name: let it go Song");
            document.getElementById("song_id").innerHTML = "Song Name: let it go Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}