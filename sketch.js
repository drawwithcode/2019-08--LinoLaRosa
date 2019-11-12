let myMap;
let canvas;
let position;
var song;

const mappa = new Mappa('MapboxGL', "pk.eyJ1IjoibGlubzgwOCIsImEiOiJjazJuMTVkNnMwbHdsM2h4NWx1bXZocXJlIn0.gcEb28ljvQalIqX23MUUDA");

var triesteLat = 45.6522988;
var triesteLon = 13.7136222;

const options = {
    lat: triesteLat,
    lng: triesteLon,
    zoom: 6,
    studio: true,
    style: "mapbox://styles/lino808/ck2vyizkm15uk1cmk6xd55r24"
}

function preload() {

    position = getCurrentPosition();
    song = loadSound("./assets/tantiauguri.mp3");
    carrà = loadImage("./assets/carrà.png");

}

function setup() {

    canvas = createCanvas(windowWidth, windowHeight);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);

}

function suona() {

    if (!song.isPlaying()) {
        song.play();
    } else {
        song.pause();
    }

}


function draw() {

    clear();

    var point = myMap.latLngToPixel(position.latitude, position.longitude);
    var triestePoint = myMap.latLngToPixel(triesteLat, triesteLon);

    noFill();
    stroke(0);
    image(carrà, point.x, point.y, 70, 90);

    noFill();
    stroke("red");
    ellipse(triestePoint.x, triestePoint.y, myMap.zoom() * 5);

    line(0, triestePoint.y, windowWidth, triestePoint.y);

    button = createButton("Play the song I'm talking about"); //ho messo la base karaoke per non avere problemi di copyright (e perchè fa morire dal ridere)
    button.position(windowWidth / 2 - 50, windowHeight - 100);
    button.size(100, 50);
    button.mousePressed(suona);
    button.style('background-color', "white")
    button.style("color", "#AB8EC4")
    button.style("border-color", "#AB8EC4")

    if (point.x < triestePoint.x) {
        textAlign(CENTER);
        textSize(28);
        strokeWeight(4);
        stroke("white");
        fill(171, 142, 196);
        text("CONGRATULATIONS! YOU ARE CURRENTLY SOUTH OF TRIESTE.", windowWidth / 2, 200);
        text("This means you'll be able to enjoy making love with your partner. Raffaella would be proud.", windowWidth / 2, 230);

    } else {
        textAlign(CENTER);
        textSize(28);
        strokeWeight(4);
        stroke("white");
        fill(171, 142, 196);
        text("SORRY :( YOU ARE NORTH OF TRIESTE", windowWidth / 2, 200);
        text("Sex is going to be an awful experience for you. Raffaella told me so.", windowWidth / 2, 230);
    }

}
