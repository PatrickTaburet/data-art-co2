let table;

function preload(){
    table = loadTable("/historical_emissions.csv", "csv", "header")
}
let dataObj ={};
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
   console.log(dataObj);
   for (let i = 0; i < 31; i++) {
    x = 0 + width*(i/31);
    y = height/2
    text(dataObj.China[i], x, y)
    console.log(dataObj.China[i]);
    circle(x,y,dataObj.China[i]/50)
   }

    // console.log( dataObj["China"][1995]);
    // for (const key in dataObj) {
    //     if (dataObj.hasOwnProperty(key)) {
    //         console.log(key + " - " + dataObj[key]);
            
    //     }
     
    // }

    function containsOnlyNumbers(str) {
        const regex = /^\d+$/;
        return regex.test(str);
      }
}

// 30 ans de data
let dataX = 0;
function draw(){
    fill(255, 55, 255)
    noStroke()
    ellipse(dataX, height/2, 30, 30)
    dataX++
  

}