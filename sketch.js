let table;

function preload(){
    table = loadTable("/historical_emissions.csv", "csv", "header")
}
let dataObj ={};
let circleDiam;
function setup(){
    createCanvas(800, 800);
    // colorMode(HSB);
    background(220);
    
    let countries = table.rows;
    for (let i=0 ; i < countries.length ; i++){
        let countriesName = countries[i].arr[1];
        co2Data = Object.values(countries[i].obj)
        // console.log(co2Data);
        dataObj[countriesName]= co2Data;

    }
    for (const key in dataObj) {
        if (Object.hasOwnProperty.call(dataObj, key)) {
            const element = dataObj[key];
            dataObj[key] = averageValues (dataObj[key])          
        }
    }
    console.log(dataObj["China"]);
    circleDiam = dataObj["France"];
    // circleDiam = averageValues (dataObj["China"]);
    // console.log(circleDiam);


    // console.log(circleDiam);

//    for (let j = 0; j < 31; j++) {
//     circleDiam.push()
//     // console.log(circleDiam);
//    }

}

// 30 ans de data
let i = 0;
function draw(){
    fill(255, 55, 255)
    stroke(255)
    i=i+1
    let x = 0 + width*(i/150);
    let y = height/2
    // y = y*noise(0.01*i);
    // console.log(y)
    y = map(noise(0.01*i), 0, 1, 0, height)

    //------ Data number flag / banner -------
    // text(dataObj.China, x+200, y+100)
    //---------------------------
    circle(x,y,circleDiam[i]/30)
      if (i == 250){
        noLoop();
    }
    // ------ LOOPING ------ :
    // if (i == 127){
    //     i=0;
    // }
   

}
function averageValues (array){
    let newArray = [];
    // let secondArray = [];
    let finalArray = [];
    doubleArray (array, newArray, 6);
    doubleArray (newArray, finalArray, 1);
    // doubleArray (secondArray, finalArray, 1);
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