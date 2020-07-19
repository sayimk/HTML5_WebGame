console.log("loaded Game Main");

//loading classes
import { Animator } from './classes/Animator.js'
import { Animator_Safe_Dial } from './classes/Animator_Safe_Dial.js'
import { Game_Logic } from './classes/Game_Logic.js'
import { SafeObject } from './classes/Safe_Object.js';

//INITIAL BET AMOUnt
let initialBet:number = 5.00;

//loading Safe Dial
let dial = document.getElementById('dial') as HTMLCanvasElement;
let safeDial:Animator_Safe_Dial = new Animator_Safe_Dial(dial);

//loading Safe Dial BG
let dialBGCan = document.getElementById('dialBG') as HTMLCanvasElement;

//assigning safes
let safe1 = document.getElementById('safe_1') as HTMLCanvasElement;
let safe2 = document.getElementById('safe_2') as HTMLCanvasElement;
let safe3 = document.getElementById('safe_3') as HTMLCanvasElement;
let safe4 = document.getElementById('safe_4') as HTMLCanvasElement;
let safe5 = document.getElementById('safe_5') as HTMLCanvasElement;
let safe6 = document.getElementById('safe_6') as HTMLCanvasElement;
let safe7 = document.getElementById('safe_7') as HTMLCanvasElement;
let safe8 = document.getElementById('safe_8') as HTMLCanvasElement;
let safe9 = document.getElementById('safe_9') as HTMLCanvasElement;
let safeCans: HTMLCanvasElement[] = [safe1, safe2, safe3, safe4, safe5, safe6, safe7, safe8, safe9];

//assigning items
let item_1 = document.getElementById('item_1') as HTMLCanvasElement
let item_2 = document.getElementById('item_2') as HTMLCanvasElement
let item_3 = document.getElementById('item_3') as HTMLCanvasElement
let item_4 = document.getElementById('item_4') as HTMLCanvasElement
let item_5 = document.getElementById('item_5') as HTMLCanvasElement
let item_6 = document.getElementById('item_6') as HTMLCanvasElement
let item_7 = document.getElementById('item_7') as HTMLCanvasElement
let item_8 = document.getElementById('item_8') as HTMLCanvasElement
let item_9 = document.getElementById('item_9') as HTMLCanvasElement

let items:HTMLCanvasElement[] = [item_1, item_2, item_3, item_4, item_5, item_6, item_7, item_8, item_9];
let itemInstances:Animator[] = [];

//assigning LED Arrays
let LED1Can = document.getElementById('LEDArray1') as HTMLCanvasElement;
let LED2Can = document.getElementById('LEDArray2') as HTMLCanvasElement;

let LEDArray1: Animator = new Animator(LED1Can,Animator.Safe_LEDs_Selector,0);
let LEDArray2: Animator = new Animator(LED2Can,Animator.Safe_LEDs_Selector,1);

//assigning screen canvas
let screenCan = document.getElementById('screen') as HTMLCanvasElement;
let screenBGCan = document.getElementById('screenBG') as HTMLCanvasElement;


//assigning background
let bg_body = document.getElementById('Safe_Body') as HTMLCanvasElement;

//assigning spin button
let spinButton = document.getElementById('spin_button') as HTMLButtonElement;

//loading Texts
let instructionCanvas = document.getElementById('instructions') as HTMLHeadingElement;
let instructionText:string = "Match a pair of symbols for a safe busting multipler! <br/> TOUCH THE DIAL TO SPIN YOUR 4 DIGIT COMBINATION";

let screenTextCan = document.getElementById('screenText') as HTMLParagraphElement;
let screenText: string = "- - - -";

let mainTextCanvas = document.getElementById('mainText') as HTMLHeadingElement;
let spinningText:string = "&nbsp&nbsp&nbsp&nbsp&nbspSPINNING!";
const safeOpenPrefix:string = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSAFE ";

//safeText
let safeText1:HTMLHeadingElement = document.getElementById('item1_text') as HTMLHeadingElement;
let safeText2:HTMLHeadingElement = document.getElementById('item2_text') as HTMLHeadingElement;
let safeText3:HTMLHeadingElement = document.getElementById('item3_text') as HTMLHeadingElement;
let safeText4:HTMLHeadingElement = document.getElementById('item4_text') as HTMLHeadingElement;
let safeText5:HTMLHeadingElement = document.getElementById('item5_text') as HTMLHeadingElement;
let safeText6:HTMLHeadingElement = document.getElementById('item6_text') as HTMLHeadingElement;
let safeText7:HTMLHeadingElement = document.getElementById('item7_text') as HTMLHeadingElement;
let safeText8:HTMLHeadingElement = document.getElementById('item8_text') as HTMLHeadingElement;
let safeText9:HTMLHeadingElement = document.getElementById('item9_text') as HTMLHeadingElement;

let safeTexts:HTMLHeadingElement[] = [safeText1, safeText2, safeText3, safeText4,
safeText5, safeText6, safeText7, safeText8, safeText9];

//getting background images
let bgImg: HTMLImageElement = new Image();
bgImg.src = './graphics/background_safe_minigame.png';

//dialBG image
let dialBG: HTMLImageElement = new Image();
dialBG.src = './graphics/support_safe_dial_minigame.png';

//getting safe open/close images
let safeCloseImg: HTMLImageElement = new Image();
safeCloseImg.src = './graphics/safe_minigame.png';

let safeOpenImg: HTMLImageElement = new Image();
safeOpenImg.src = './graphics/safe_open_minigame.png';

//loading screen images
let screenBGImg:HTMLImageElement = new Image();
screenBGImg.src = './graphics/screen_safe_minigame.png';

let screenNormalImg:HTMLImageElement = new Image();
screenNormalImg.src = './graphics/screen_safe_background.png';

let screenWinImg:HTMLImageElement = new Image();
screenWinImg.src = './graphics/screen_safe_win.png';

//getting context
let c = bg_body.getContext('2d')!;
let sc1 = safe1.getContext('2d')!;
let sc2 = safe2.getContext('2d')!;
let sc3 = safe3.getContext('2d')!;
let sc4 = safe4.getContext('2d')!;
let sc5 = safe5.getContext('2d')!;
let sc6 = safe6.getContext('2d')!;
let sc7 = safe7.getContext('2d')!;
let sc8 = safe8.getContext('2d')!;
let sc9 = safe9.getContext('2d')!;

let dialBGC = dialBGCan.getContext('2d')!;
let screenC = screenCan.getContext('2d')!;
let screenBGC = screenBGCan.getContext('2d')!;

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
let loadSafe: number = setInterval(() => {
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
let openSafe= (safeNumber: number)=>{

    let openSafeRenderNo: number = setInterval(()=>{
        safeCans[(safeNumber-1)].getContext('2d')?.clearRect(0,0,186,174);
        safeCans[(safeNumber-1)].getContext('2d')?.drawImage(safeOpenImg, 0, 0, 185, 170, 0, 0, 186, 174);
    },1);

    setTimeout(()=>{
        clearInterval(openSafeRenderNo);
        mainTextCanvas.innerHTML = safeOpenPrefix+safeNumber;
        instructionCanvas.innerHTML="";

    },50);

}

let avenger_Endgame = (multiplier:number) =>{
    
    //refreshing screen
    let screenRefresh: number = setInterval(() => {
        screenC.drawImage(screenWinImg, 0, 0, 280, 85, -4, -4, 280, 85);
        mainTextCanvas.innerHTML ="YOU WON £"+(initialBet*multiplier);
        screenTextCan.innerHTML = "W I N";

    }, 1);
    
    setTimeout(() => {
        clearInterval(screenRefresh);
    }, 100);

    //spinning and flashing dial
    safeDial.gameEnd();
}

//starting ongoing animations
LEDArray1.startAnimation(300);
LEDArray2.startAnimation(300);

//spin button event handler
spinButton.onclick = () =>{
    let spunNumb:number = game.getRandomSafeNumb();

    //setting up displays and button
    mainTextCanvas.innerHTML=spinningText;
    instructionCanvas.innerHTML ="";
    spinButton.disabled=true;

    //starting a spin for the generated number
    safeDial.startRotationAnimation(spunNumb, ()=>{
        openSafe(spunNumb);

        //output numbers rolled
        let outString:string ="";
        for (let index = 0; index < game.getRolledNumbers().length; index++) {
            outString = outString+game.getRolledNumbers()[index]+" ";
        }

        //fill remaining spaces with '-'
        for (let index = 0; index < (4 -game.getRolledNumbers().length); index++) {
            outString = outString+"- ";
        }
        screenTextCan.innerHTML=outString;

        //opening the selected safe and outputting the multiplier
        let newItem:Animator = new Animator(items[(spunNumb-1)],safeObjs[(spunNumb-1)].getIconName());
        itemInstances.push(newItem);
        itemInstances[(itemInstances.length-1)].startAnimation(200);
        safeTexts[(spunNumb-1)].innerHTML = "X"+safeObjs[(spunNumb-1)].getMultiplier();
    
    
        //checking if matched multiplier and ending game or re-enabling button
        //and continuing
        let multi:number = game.getIsMatch();
        if(multi!=1){
            avenger_Endgame(multi);
        }else{
            spinButton.disabled=false;
        }
    });
}

//setting initial text
instructionCanvas.innerHTML = instructionText;
screenTextCan.innerHTML = screenText;

//Getting Game Logic
let game:Game_Logic = new Game_Logic();
let safeObjs:SafeObject[] = []; 

//assigning safe Objects
for (let index = 0; index < game.getSafeMultiplier().length; index++) {

    let multiVal:number = game.getSafeMultiplier()[index];
    let iconAniName:string ="";

    //assign icons
    if (multiVal == game.getMultiplier_1()){
        iconAniName = Animator.Ring_Selector;
    }else if (multiVal == game.getMultiplier_2()){
        iconAniName = Animator.Diamond_Selector;
    }else if (multiVal == game.getMultiplier_3()){
        iconAniName = Animator.Gold_Selector;
    }
    safeObjs.push(new SafeObject(multiVal,iconAniName));
}


