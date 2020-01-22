let mobilenet;
let classifier;
let video;
let label = '';
let confidence;
let set1Button;
let set2Button;;
let trainButton;

function modelReady(){
    console.log('model is ready!!!');
}

function videoReady(){
    console.log("Video is ready!!!");
}

function whileTraining(loss){
    if(loss === null){
        console.log('Traing Complete');
        classifier.classify(gotResults);
    } else {
        console.log(loss);
    }
}

function gotResults(error, results){
    if(error){
        console.error(error);
    } else{
        label = results[0].label;
        confidence = results[0].confidence;
        classifier.classify(gotResults);
    }
}

// function imageReady(){
//     image(puffin, 0, 0, width, height);
// }

function setup(){
    createCanvas(640, 550);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('Mobilenet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    set1Button = createButton('SET 1');
    set1Button.mousePressed(function(){
        classifier.addImage('SET-1');
    });

    set2Button = createButton('SET 2');
    set2Button.mousePressed(function(){
        classifier.addImage('SET-2');
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function(){
        classifier.train(whileTraining);
    });

    saveButton = createButton('save');
    saveButton.mousePressed(function(){
        classifier.save();
    });
}

function draw(){
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(32);
    text(label, 5, height, -20);
    text(confidence, 150, height, -20);
}