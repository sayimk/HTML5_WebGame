console.log("loaded Game Main");
//loading classes
import { Animator } from './classes/Animator.js';
import { Animator_Safe_Dial } from './classes/Animator_Safe_Dial.js';
import { Game_Logic } from './classes/Game_Logic.js';
import { SafeObject } from './classes/Safe_Object.js';
//INITIAL BET AMOUnt
let initialBet = 5.00;
//loading Safe Dial
let dial = document.getElementById('dial');
let safeDial = new Animator_Safe_Dial(dial);
//loading Safe Dial BG
let dialBGCan = document.getElementById('dialBG');
//assigning safes
let safe1 = document.getElementById('safe_1');
let safe2 = document.getElementById('safe_2');
let safe3 = document.getElementById('safe_3');
let safe4 = document.getElementById('safe_4');
let safe5 = document.getElementById('safe_5');
let safe6 = document.getElementById('safe_6');
let safe7 = document.getElementById('safe_7');
let safe8 = document.getElementById('safe_8');
let safe9 = document.getElementById('safe_9');
let safeCans = [safe1, safe2, safe3, safe4, safe5, safe6, safe7, safe8, safe9];
//assigning items
let item_1 = document.getElementById('item_1');
let item_2 = document.getElementById('item_2');
let item_3 = document.getElementById('item_3');
let item_4 = document.getElementById('item_4');
let item_5 = document.getElementById('item_5');
let item_6 = document.getElementById('item_6');
let item_7 = document.getElementById('item_7');
let item_8 = document.getElementById('item_8');
let item_9 = document.getElementById('item_9');
let items = [item_1, item_2, item_3, item_4, item_5, item_6, item_7, item_8, item_9];
let itemInstances = [];
//assigning LED Arrays
let LED1Can = document.getElementById('LEDArray1');
let LED2Can = document.getElementById('LEDArray2');
let LEDArray1 = new Animator(LED1Can, Animator.Safe_LEDs_Selector, 0);
let LEDArray2 = new Animator(LED2Can, Animator.Safe_LEDs_Selector, 1);
//assigning screen canvas
let screenCan = document.getElementById('screen');
let screenBGCan = document.getElementById('screenBG');
//assigning background
let bg_body = document.getElementById('Safe_Body');
//assigning spin button
let spinButton = document.getElementById('spin_button');
//loading Texts
let instructionCanvas = document.getElementById('instructions');
let instructionText = "Match a pair of symbols for a safe busting multipler! <br/> TOUCH THE DIAL TO SPIN YOUR 4 DIGIT COMBINATION";
let screenTextCan = document.getElementById('screenText');
let screenText = "- - - -";
let mainTextCanvas = document.getElementById('mainText');
let spinningText = "&nbsp&nbsp&nbsp&nbsp&nbspSPINNING!";
const safeOpenPrefix = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSAFE ";
//safeText
let safeText1 = document.getElementById('item1_text');
let safeText2 = document.getElementById('item2_text');
let safeText3 = document.getElementById('item3_text');
let safeText4 = document.getElementById('item4_text');
let safeText5 = document.getElementById('item5_text');
let safeText6 = document.getElementById('item6_text');
let safeText7 = document.getElementById('item7_text');
let safeText8 = document.getElementById('item8_text');
let safeText9 = document.getElementById('item9_text');
let safeTexts = [safeText1, safeText2, safeText3, safeText4,
    safeText5, safeText6, safeText7, safeText8, safeText9];
//getting background images
let bgImg = new Image();
bgImg.src = './graphics/background_safe_minigame.png';
//dialBG image
let dialBG = new Image();
dialBG.src = './graphics/support_safe_dial_minigame.png';
//getting safe open/close images
let safeCloseImg = new Image();
safeCloseImg.src = './graphics/safe_minigame.png';
let safeOpenImg = new Image();
safeOpenImg.src = './graphics/safe_open_minigame.png';
//loading screen images
let screenBGImg = new Image();
screenBGImg.src = './graphics/screen_safe_minigame.png';
let screenNormalImg = new Image();
screenNormalImg.src = './graphics/screen_safe_background.png';
let screenWinImg = new Image();
screenWinImg.src = './graphics/screen_safe_win.png';
//getting context
let c = bg_body.getContext('2d');
let sc1 = safe1.getContext('2d');
let sc2 = safe2.getContext('2d');
let sc3 = safe3.getContext('2d');
let sc4 = safe4.getContext('2d');
let sc5 = safe5.getContext('2d');
let sc6 = safe6.getContext('2d');
let sc7 = safe7.getContext('2d');
let sc8 = safe8.getContext('2d');
let sc9 = safe9.getContext('2d');
let dialBGC = dialBGCan.getContext('2d');
let screenC = screenCan.getContext('2d');
let screenBGC = screenBGCan.getContext('2d');
//setting sizing
bg_body.width = 920;
bg_body.height = 625;
safe1.width = 193;
safe1.height = 170;
safe2.width = 193;
safe2.height = 170;
safe3.width = 193;
safe3.height = 170;
safe4.width = 193;
safe4.height = 170;
safe5.width = 193;
safe5.height = 170;
safe6.width = 193;
safe6.height = 170;
safe7.width = 193;
safe7.height = 170;
safe8.width = 193;
safe8.height = 170;
safe9.width = 193;
safe9.height = 170;
dialBGCan.width = 300;
dialBGCan.height = 340;
screenBGCan.height = 85;
screenBGCan.width = 325;
//loading safe body (doesnt load in one frame)
let loadSafe = setInterval(() => {
    c.clearRect(0, 0, 920, 625);
    c.drawImage(bgImg, 0, 0, 920, 625, 0, 0, 920, 625);
    sc1.drawImage(safeCloseImg, 0, 0, 193, 170, 40, 28, 193, 170);
    sc2.drawImage(safeCloseImg, 0, 0, 193, 170, 40, 28, 193, 170);
    sc3.drawImage(safeCloseImg, 0, 0, 193, 170, 40, 28, 193, 170);
    sc4.drawImage(safeCloseImg, 0, 0, 193, 170, 40, 28, 193, 170);
    sc5.drawImage(safeCloseImg, 0, 0, 193, 170, 40, 28, 193, 170);
    sc6.drawImage(safeCloseImg, 0, 0, 193, 170, 40, 28, 193, 170);
    sc7.drawImage(safeCloseImg, 0, 0, 193, 170, 40, 28, 193, 170);
    sc8.drawImage(safeCloseImg, 0, 0, 193, 170, 40, 28, 193, 170);
    sc9.drawImage(safeCloseImg, 0, 0, 193, 170, 40, 28, 193, 170);
    dialBGC.drawImage(dialBG, 0, 0, 300, 340, 0, 0, 300, 340);
    screenBGC.drawImage(screenBGImg, 0, 0, 325, 85, 0, 0, 324, 84);
    screenC.drawImage(screenNormalImg, 0, 0, 280, 85, 0, 0, 278, 83);
}, 1);
setTimeout(() => {
    clearInterval(loadSafe);
}, 40);
//method used for opening a safe
let openSafe = (safeNumber) => {
    let openSafeRenderNo = setInterval(() => {
        var _a, _b;
        (_a = safeCans[(safeNumber - 1)].getContext('2d')) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, 186, 174);
        (_b = safeCans[(safeNumber - 1)].getContext('2d')) === null || _b === void 0 ? void 0 : _b.drawImage(safeOpenImg, 0, 0, 185, 170, 0, 0, 186, 174);
    }, 1);
    setTimeout(() => {
        clearInterval(openSafeRenderNo);
        mainTextCanvas.innerHTML = safeOpenPrefix + safeNumber;
        instructionCanvas.innerHTML = "";
    }, 50);
};
let avenger_Endgame = (multiplier) => {
    //refreshing screen
    let screenRefresh = setInterval(() => {
        screenC.drawImage(screenWinImg, 0, 0, 280, 85, -4, -4, 280, 85);
        mainTextCanvas.innerHTML = "YOU WON £" + (initialBet * multiplier);
        screenTextCan.innerHTML = "W I N";
    }, 1);
    setTimeout(() => {
        clearInterval(screenRefresh);
    }, 100);
    //spinning and flashing dial
    safeDial.gameEnd();
};
//starting ongoing animations
LEDArray1.startAnimation(300);
LEDArray2.startAnimation(300);
//spin button event handler
spinButton.onclick = () => {
    let spunNumb = game.getRandomSafeNumb();
    //setting up displays and button
    mainTextCanvas.innerHTML = spinningText;
    instructionCanvas.innerHTML = "";
    spinButton.disabled = true;
    //starting a spin for the generated number
    safeDial.startRotationAnimation(spunNumb, () => {
        openSafe(spunNumb);
        //output numbers rolled
        let outString = "";
        for (let index = 0; index < game.getRolledNumbers().length; index++) {
            outString = outString + game.getRolledNumbers()[index] + " ";
        }
        //fill remaining spaces with '-'
        for (let index = 0; index < (4 - game.getRolledNumbers().length); index++) {
            outString = outString + "- ";
        }
        screenTextCan.innerHTML = outString;
        //opening the selected safe and outputting the multiplier
        let newItem = new Animator(items[(spunNumb - 1)], safeObjs[(spunNumb - 1)].getIconName());
        itemInstances.push(newItem);
        itemInstances[(itemInstances.length - 1)].startAnimation(200);
        safeTexts[(spunNumb - 1)].innerHTML = "X" + safeObjs[(spunNumb - 1)].getMultiplier();
        //checking if matched multiplier and ending game or re-enabling button
        //and continuing
        let multi = game.getIsMatch();
        if (multi != 1) {
            avenger_Endgame(multi);
        }
        else {
            spinButton.disabled = false;
        }
    });
};
//setting initial text
instructionCanvas.innerHTML = instructionText;
screenTextCan.innerHTML = screenText;
//Getting Game Logic
let game = new Game_Logic();
let safeObjs = [];
//assigning safe Objects
for (let index = 0; index < game.getSafeMultiplier().length; index++) {
    let multiVal = game.getSafeMultiplier()[index];
    let iconAniName = "";
    //assign icons
    if (multiVal == game.getMultiplier_1()) {
        iconAniName = Animator.Ring_Selector;
    }
    else if (multiVal == game.getMultiplier_2()) {
        iconAniName = Animator.Diamond_Selector;
    }
    else if (multiVal == game.getMultiplier_3()) {
        iconAniName = Animator.Gold_Selector;
    }
    safeObjs.push(new SafeObject(multiVal, iconAniName));
}
