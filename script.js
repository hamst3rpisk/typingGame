/*OBJECTS*/
const playbutton = document.querySelector("#playbutton"); /* Main Play button */
const rainY = document.querySelector("#rain"); /*Y Axis rain anim */
const rainX = document.querySelector("#rainside"); /*X Axis rain anim */
const title = document.querySelector("#main"); /* main title text */
const maingamediv = document.querySelector("#maingamediv");
const scorediv = document.querySelector("#scorediv");
const scorep = document.querySelector("#score");
const textDisplayed = document.querySelector("#textDisplayed");
const writeField = document.querySelector("#writeField");
const timep = document.querySelector("#time");
const wpmp = document.querySelector("#wpm");
const letterSlider = document.querySelector("#letterSlider");
const wordSlider = document.querySelector("#wordSlider");
let score = 0;

/*EVENT LISTENERS*/
playbutton.addEventListener("click",startgame);
writeField.addEventListener("input",checkText);

/*FUNCTIONS*/

const numOfWords = 4;
let text2Display = "";

const url = "https://random-word-api.herokuapp.com/word?number="+numOfWords;
async function apiRandomWords() {
    text2Display="";
    const result = await fetch (url)
    json = await result.json();
    for (let i=0;i<numOfWords;i++) {
        text2Display += json[i] + " ";
    }
    textDisplayed.innerHTML = text2Display;
}


function startgame() {
    maingamediv.classList.remove("hidden");
    scorediv.classList.remove("hidden");
    title.style.animation="fadeAway 1s";
    rainX.classList.add("hidden");
    rainY.classList.add("hidden");
    playbutton.style.animation="fadeAway 1s";
    maingamediv.style.animation="fadeInto 1s";
    scorediv.style.animation="fadeInto 1s";
    let dateStart = Date.now();
    setInterval(() => {
        let secondsPassed = (Date.now() - dateStart)/1000;
        timep.innerHTML = Math.floor(secondsPassed/3600) + "h:" + Math.floor(secondsPassed/60)%60 + "m:" + Math.floor(secondsPassed%60)+"s";
        wpmp.innerHTML = Math.round(score*numOfWords / (secondsPassed/60)) + "wpm";
    },10);

    setTimeout(function() {
        title.classList.add("hidden");
        rainX.classList.add("hidden");
        rainY.classList.add("hidden");
        playbutton.classList.add("hidden");
        playbutton.disabled="true";
        maingamediv.style.opacity="100%";
        scorediv.style.opacity="100%";
        
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
    else if (writeText.trim() == displayedText.trim()) {
        writeField.style.color="green";
        score++;
        scorep.innerHTML = "Score: " + score;
        writeField.innerHTML = "";
        apiRandomWords();
    }
    else {
        writeField.style.color="white";
    }

}
