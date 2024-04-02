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
    // valeur en fonction de la date : countries[i].obj[date]
    for (let i=0 ; i < countries.length ; i++){
        let countriesName = countries[i].arr[1];
        dataObj[countriesName]= countries[i].obj;
       
    }
    console.log("-->  " + dataObj.China[1995]);
    for (let i=1990; i<2020; i++){
        console.log(dataObj.Mexico[i]);

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