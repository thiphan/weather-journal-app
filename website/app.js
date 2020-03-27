/* Global Variables */
const apiKey = 'fd9229a49d489baaef55a1b874f315d5';

//const feeling = document.getElementById('feeling').value;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// console.log(inputElement);

const zip = "38017";
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';//${zip},us&appid=${api_key}`;

//get request to the temperature info API
//

document.getElementById('generate').addEventListener('click', performAction);
function performAction(e){
    //const inputZipCode = 38017;
    const inputZipCode =  document.getElementById('zip').value;
    const inputUserRes =  document.getElementById('feelings').value;

    getAnimal(baseURL,inputZipCode, apiKey).then (function(data){
        //console.log(data, )
        // const testData = {temp: data.main.temp, date: newDate, userRes: inputUserRes};
        // console.log(testData);
        postData('/addData', {temp: `${data.main.temp}F`, date: newDate, userRes: inputUserRes})
    });
};

const getAnimal = async (baseURL,zipCode,key)=>{
    const res = await fetch(baseURL+zipCode+',us&units=imperial&appid='+key)
    
    try {
        const data = await res.json();
        //console.log(data)
        //const requiredData = data.main.temp;
        //console.log(requiredData);
        return data;
    }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


// post request
const postData = async ( url = '', data = {})=>{
    //console.log(data);
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
  }
//postData('/addData', {temp: "75F", date: "03-36-2020", userRes: "Hi"});