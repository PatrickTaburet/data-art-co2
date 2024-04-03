let table;

function preload(){
    table = loadTable("/historical_emissions.csv", "csv", "header")
}
let dataObj ={};
let FRcircleDiam;
function setup(){
    createCanvas(800, 800);
    colorMode(HSB);
    background(0, 0, 70);
    
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
    console.log(dataObj["China"]);
    CHIcircleDiam = dataObj["Chine"];

    // console.log(circleDiam);

}
// ------- - - - - - - - - - - - - - - - - - -
// 30 ans de data
let i = 1;
function draw(){
    // let color = map(circleDiam[i], -50, 10297, 150 , 360 )
    drawData("China", i, 10)
    drawData("Mexico", i, 100)
    drawData("Germany", i, 50)
    drawData("Japan", i, 150)
    drawData("Russia", i, 200)
    i++
    if (i == 250){
        noLoop();
    }
    // console.log(FRcircleDiam[0] + "  +  " +  FRcircleDiam[240]);
    // console.log(color);
   
     //------ Data number flag / banner -------
    // text(dataObj.China, x+200, y+100)
    //---------------------------
   
    // ------ LOOPING ------ :
    // if (i == 127){
    //     i=0;
    // }
   

}

function drawData(country, i, offset){
    FRcircleDiam = dataObj[country];
    let color = map(FRcircleDiam[i], -50, 10297, 100+offset , 360 )
    fill(color, 100, 100)
    stroke(255)
   
    let x = 0 + width*(i/250);
    let y = height/2
    // y = y*noise(0.01*i);
    // console.log(y)
    y = map(noise(offset + 0.01*i), 0, 1, 0, height)
    
   
    circle(x,y,FRcircleDiam[i]/30)
   
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