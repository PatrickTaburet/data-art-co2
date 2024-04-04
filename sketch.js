let table;
let countryNamesObj = {};
let dataObj ={};
let circleDiam;

function preload(){
    table = loadTable("/historical_emissions.csv", "csv", "header")
}

function setup(){
    createCanvas(800, 800);
    console.log(width);
    
    // width = 800 - (800 - 600) / 2; // Set the width to 600 pixels with padding on each side
    // height = 800 - (800 - 600) / 2;
    // width = width-(width/3);
    // height = height-(height/3);
    colorMode(HSB);
    background(0, 0, 50);
    frameRate(60);
    let countries = table.rows;
    for (let i=0 ; i < countries.length ; i++){
        let countriesName = countries[i].arr[1];
        co2Data = Object.values(countries[i].obj)
        dataObj[countriesName]= co2Data;

    }
    for (const key in dataObj) {
        if (Object.hasOwnProperty.call(dataObj, key)) {
            const element = dataObj[key];
            dataObj[key] = averageValues (dataObj[key])          
        }
    }
    // console.log(dataObj["China"]);
    // CHIcircleDiam = dataObj["Chine"];

    // console.log(circleDiam);

}
// ------- - - - - - - - - - - - - - - - - - -
// 30 ans de data
let i = 1;
function draw(){
    // ------ Offset between 1 et 2000 -------
    drawData("Brazil", i, 100, "top")
    drawData("South Korea", i, 300, "top")
    
    drawData("Saudi Arabia", i, 600, "top")
    drawData("Australia", i, 1000, "bottom")
    drawData("China", i, 800, "left")
    drawData("Ghana", i, 80, "top")

    drawData("Indonesia", i, 50, "right")
     drawData("Nigeria", i, 50, "right")
     drawData("Japan", i, 150, "left")
    drawData("Russia", i, 200, "bottom")
    i++
    if (i == 250){
        noLoop();
    }
    // console.log(FRcircleDiam[0] + "  +  " +  FRcircleDiam[240]);
    // console.log(color);
   
  
   
    // ------ LOOPING ------ :
    // if (i == 240){
    //     i=0;
    // }
   

}

function drawData(country, i, offset, origin){
    let x;
    let y;
    let txtX;
    let txtY;
    let posOffset = map(offset, 0, 1000, 0, 500)
    console.log("--->" + posOffset); 
    switch (origin) {
        case "left":
            x = 0 + width*(i/250);
            y = map(noise(posOffset + 0.01*i), 0, 1, 0, height)
            txtX = x + 25;
            txtY = y-40 ;
            console.log("left : " + y);
            break;
        case "right":
            x = width - width*(i/250);
            y = map(noise( posOffset +0.01*i) , 0, 1, 0, height)
            txtX = x-150 ;
            txtY = y -50 ;
            // console.log(txtY)
            break;
        case "bottom":
            y = height - height*(i/250);
            x = map(noise(posOffset + 0.01*i), 0, 1, 0, width)
            txtX = x + 25 ;
            txtY = y -40 ;
            break;
        case "top":
            y = 0 + height*(i/250);
            x = map(noise(posOffset + 0.01*i), 0, 1, 0, width)
            txtX = x + 25 ;
            txtY = y +40 ;
            break;
        default:
            console.log("Invalid origin.");
            break;
    }
    let colorOffset = map(offset, 0, 2000, 0, 360)
    circleDiam = dataObj[country];
    let color = map(circleDiam[i], -50, 10297, 100 + colorOffset , 360 )
    fill(color, 100, 100)
    console.log(frameCount )
    setTimeout(() => {
        if(frameCount<56){
            push()
            fill(color, 100, 100)
            strokeWeight(4);
            stroke(0);
            text(country, txtX, txtY);
            pop()
        }
    }, 900);

  
    stroke(255)
    textSize(35)
    countryNamesObj[country] = origin; // Get the origin of the choosen countries to display on the html
    // console.log(country);
 
    circle(x,y,circleDiam[i]/60) // MAP SCALE ON SLIDER (diam/scale)

    //------ Data number flag / banner -------
  
        // push()
        // fill(color-random(0, 70), 100, 100)
        // strokeWeight(2);
        // textSize(20);
        // text(dataObj[country], x+offset/4-150, y+offset/3-150);
        // pop()

   
    //---------------------------
}


function averageValues (array){
    let newArray = [];
    let secondArray = [];
    let finalArray = [];
    doubleArray (array, newArray, 6);
    doubleArray (newArray, secondArray, 1);
    doubleArray (secondArray, finalArray, 1);
    // console.log(finalArray);
    return finalArray;
}
function doubleArray (array, newArray, minus) {
    for (let h = 0; h < array.length -minus; h++) {
        let current = parseFloat(array[h]);
        let next = parseFloat(array[h + 1]);
        let average = (current + next) / 2;
        newArray.push(current);
        newArray.push(average);
    } 
    return newArray;
}