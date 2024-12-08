/*OBJECTS*/
const playbutton = document.querySelector("#playbutton"); /* Main Play button */
const rainY = document.querySelector("#rain"); /*Y Axis rain anim */
const rainX = document.querySelector("#rainside"); /*X Axis rain anim */
const title = document.querySelector("#main"); /* main title text */
const maingamediv = document.querySelector("#maingamediv");

const textDisplayed = document.querySelector("#textDisplayed");
const writeField = document.querySelector("#writeField");


/*EVENT LISTENERS*/
playbutton.addEventListener("click",startgame);
writeField.addEventListener("input",checkText);

/*FUNCTIONS*/

const numOfWords = 10;
let text2Display = "";

const url = "https://random-word-api.herokuapp.com/word?number="+numOfWords;
async function apiRandomWords() {
    const result = await fetch (url)
    json = await result.json();
    for (let i=0;i<numOfWords;i++) {
        text2Display += json[i] + " ";
    }
    textDisplayed.innerHTML = text2Display;
}


function startgame() {
    maingamediv.classList.remove("hidden");
    title.style.animation="fadeAway 1s";
    rainX.classList.add("hidden");
    rainY.classList.add("hidden");
    playbutton.style.animation="fadeAway 1s";
    maingamediv.style.animation="fadeInto 1s";
    
    setTimeout(function() {
        title.classList.add("hidden");
        rainX.classList.add("hidden");
        rainY.classList.add("hidden");
        playbutton.classList.add("hidden");
        playbutton.disabled="true";
        maingamediv.style.opacity="100%";
        
    }, 1000);
    writeField.focus();
    apiRandomWords();
}

function checkText() {
    let writeText = writeField.textContent;
    let displayedText = textDisplayed.innerHTML;
    console.log(writeText.substring(writeText.length -1));
    let writeTextLength = writeText.length;
    if(writeText.substring(writeText.length -1) == " ") console.log("its empty");
    if (writeText.substring(0,writeTextLength).trim() != displayedText.substring(0,writeTextLength).trim() && writeText != displayedText) {
        writeField.style.color="rgb(239, 31, 69)"
    }
    else if (writeText == displayedText) {
        writeField.style.color="green";
    }
    else {
        writeField.style.color="white";
    }

}
