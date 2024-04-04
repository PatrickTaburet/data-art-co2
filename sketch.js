let table;
let countryNamesObj = {};
let dataObj ={};
let circleDiam;

function preload(){
    table = loadTable("/historical_emissions.csv", "csv", "header")
}

function setup(){
    createCanvas(600, 600);
    colorMode(HSB);
    background(0, 0, 70);
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
    // let color = map(circleDiam[i], -50, 10297, 150 , 360 )
    drawData("China", i, 10, "left")
    drawData("France", i, 50, "left")
    drawData("Russia", i, 100, "right")
    drawData("Mexico", i, 150, "right")
    drawData("India", i, 200, "right")
    drawData("Ghana", i, 80, "right")

    // drawData("Germany", i, 50, "right")
    // drawData("Japan", i, 150, "left")
    // drawData("Russia", i, 200, "left")
    i++
    if (i == 250){
        noLoop();
    }
    // console.log(FRcircleDiam[0] + "  +  " +  FRcircleDiam[240]);
    // console.log(color);
   
  
   
    // ------ LOOPING ------ :
    // if (i == 127){
    //     i=0;
    // }
   

}

function drawData(country, i, offset, origin){
    let x;
    let y;
    let txtX;
    let txtY;
    switch (origin) {
        case "left":
            x = 0 + width*(i/250);
            y = height/2
            y = map(noise(offset + 0.01*i), 0, 1, 0, height)
            // console.log(y); 
            txtX = x;
            txtY = y-40 ;
            break;
        case "right":
            x = width - width*(i/250);
            y = height/2
            y = map(noise(offset + 0.01*i), 0, 1, 0, height)
            txtX = x-100 ;
            txtY = y -50 ;
            // console.log(txtY)
            break;
        case "top":
            y = height - height*(i/250);
            x = width/2
            x = map(noise(offset + 0.01*i), 0, 1, 0, width)
            break;
        case "bottom":
            y = 0 + height*(i/250);
            x = width/2
            x = map(noise(offset + 0.01*i), 0, 1, 0, width)
            break;
        default:
            console.log("Invalid origin.");
            break;
    }

    circleDiam = dataObj[country];
    let color = map(circleDiam[i], -50, 10297, 100+offset , 360 )
    fill(color, 100, 100)
    console.log(frameCount )
    setTimeout(() => {
        if(frameCount<56){
            fill(color, 100, 100)
            stroke(0);
            text(country, txtX, txtY);
         
        }
    }, 900);

  
    stroke(255)
    textSize(35)
    countryNamesObj[country] = origin; // Get the origin of the choosen countries to display on the html
    // console.log(country);
 
    circle(x,y,circleDiam[i]/30)



    //------ Data number flag / banner -------
    //   text(dataObj[country], x+200, y+100+offset);
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