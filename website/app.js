/* Global Variables */
const key = `,us&units=imperial&appid=fd9229a49d489baaef55a1b874f315d5`;
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



//UPDATE UI BY POSTDATA
const updateUserInterface = data => {
    document.getElementById("date").textContent = `Date: ${data.date}`;
    document.getElementById("content").textContent = `How I feel: ${data.userRes}`;
    document.getElementById("temp").textContent = `The temperature: ${data.temp}F`;
};

//GET DATA FROM API
const getData= async (url)=>{
    const res = await fetch(url);
    
    try {
        const data = await res.json();
        return data;
    }  catch(error) {
        console.log("error", error);
    }
};


// POST REQUEST
const postData = async (url = "", data = {}) => {
    //console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
  
    try {
        const newData = await response.json();
        //console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

//PERFORM GERNERATING ACTION
async function performAction(e){

    const inputZipCode =  document.getElementById('zip').value || 38017;
    const inputUserRes =  document.getElementById('feelings').value || "Good";

    const resultFromApi = await getData(baseURL + inputZipCode + key);
    console.log(resultFromApi);
    
    //send data to server
    const objToServer = {
        date: newDate,
        feel: inputUserRes,
        temp: resultFromApi.main.temp
    };
    const responseFromServer = await postData("/add", objToServer);
    console.log(responseFromServer);

    //get data from server
    const resultFromServer = await getData("/get");
    console.log(resultFromServer);

    updateUserInterface(resultFromServer);
};

document.getElementById('generate').addEventListener('click', performAction);
