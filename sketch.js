function preload(){
    table = loadTable("/historical_emissions.csv", "csv", "header")
}
let isAnimated = false;
let table;
let countryNamesObj = {};
let dataObj ={};
let circleDiam;
let i = 1;
let countriesArray = []
let originArray = ["top", "top", "right", "right", "bottom", "bottom", "left", "left"]
let offset;
let submitButton = document.querySelector('#submitButton');
let reloadButton = document.querySelector('#reloadButton');

// "France", "Ghana", "Spain", "Russia", "Mexico", "China", "Australia", "Japan"
function setup(){
    createCanvas(800, 800);
    // console.log(width);
    
    // width = 800 - (800 - 600) / 2; // Set the width to 600 pixels with padding on each side
    // height = 800 - (800 - 600) / 2;
    // width = width-(width/3);
    // height = height-(height/3);
    colorMode(HSB);
    background(0, 0, 50);
    frameRate(60);
    submitButton.addEventListener('click', function() {
        countriesArray = [];
        document.querySelectorAll('.country').forEach(function(select) {
          countriesArray.push(select.value);
        });
        runAnimation();
      console.log(isAnimated + "  -  " + countriesArray);
      
    });
    reloadButton.addEventListener('click', function() {
        window.location.reload();
    });
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
function draw(){
    // ------ Offset between 1 et 2000 -------
    // chooseDisplay(countriesArray, originArray)
    console.log(isAnimated);

    if (isAnimated){
        countriesArray[0] != "" ? drawData(countriesArray[0], i, 100, originArray[0]) : null;
        countriesArray[1] != "" ? drawData(countriesArray[1], i, 300, originArray[1]): null;
        countriesArray[2] != "" ? drawData(countriesArray[2], i, 500, originArray[2]): null;
        countriesArray[3] != "" ? drawData(countriesArray[3], i, 700, originArray[3]): null;
        countriesArray[4] != "" ? drawData(countriesArray[4], i, 900, originArray[4]): null;
        countriesArray[5] != "" ? drawData(countriesArray[5], i, 1100, originArray[5]): null;
        countriesArray[6] != "" ? drawData(countriesArray[6], i, 1300, originArray[6]): null;
        countriesArray[7] != "" ? drawData(countriesArray[7], i, 1500, originArray[7]): null;
    
        // drawData("South Korea", i, 200, "top")
        
        // drawData("Saudi Arabia", i, 300, "top")
        // drawData("Australia", i, 500, "bottom")
        // drawData("China", i, 800, "left")
        // drawData("Ghana", i, 1000, "top")

        // drawData("Indonesia", i, 1200, "right")
        //  drawData("Japan", i, 1500, "right")
        //  drawData("Nigeria", i, 1700, "left")
        // drawData("Russia", i, 2000, "bottom")
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
    
}
function runAnimation() {
    isAnimated = !isAnimated;
}
  


function handleSubmit(){
    for (let i = 0; i < 8; i++) {
        countriesArray.push(select('#country' + i).value());
      }
}
function drawData(country, i, offset, origin){
    let x;
    let y;
    let txtX;
    let txtY;
    let posOffset = map(offset, 0, 2000, 0, 4000)
    // console.log("--->" + posOffset); 
    switch (origin) {
        case "left":
            x = 0 + width*(i/250);
            y = map(noise(posOffset + 0.01*i), 0, 1, 0, height)
            txtX = x + 25;
            txtY = y-40 ;
            // console.log("left : " + y);
            break;
        case "right":
            x = width - width*(i/250);
            y = map(noise( posOffset +0.01*i) , 0, 1, 0, height)
            txtX = x-110 ;
            txtY = y -40 ;
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
    setTimeout(() => {
        if(i<2){
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