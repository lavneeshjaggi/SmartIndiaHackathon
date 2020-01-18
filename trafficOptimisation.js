let mobilenet;
let classifier;
let video;
let label = '';
let confidence;
let happyButton;
let sadButton;;
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

    happyButton = createButton('happy');
    happyButton.mousePressed(function(){
        classifier.addImage('happy');
    });

    sadButton = createButton('sad');
    sadButton.mousePressed(function(){
        classifier.addImage('sad');
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function(){
        classifier.train(whileTraining);
    });
}

function draw(){
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(32);
    text(label, 5, height, -20);
    text(confidence, 100, height, -20);
}