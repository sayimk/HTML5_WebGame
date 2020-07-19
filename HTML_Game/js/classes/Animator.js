export class Animator {
    //imgStartPos allows a different sequence
    constructor(canvas, classPropertiesSelector, imgStartPos = 0) {
        //image properties
        this.selectedProperties = {
            imgSrc: [],
            cropStartX: undefined,
            cropStartY: undefined,
            cropStartWidth: undefined,
            cropStartHeight: undefined,
            canvasStartX: undefined,
            canvasStartY: undefined,
            scalingWidth: undefined,
            scalingHeight: undefined
        };
        this.DiamondProps = {
            imgSrc: ['./graphics/diamond.png'],
            cropStartX: [15, 215],
            cropStartY: 15,
            cropStartWidth: 180,
            cropStartHeight: 150,
            canvasStartX: 0,
            canvasStartY: 0,
            scalingWidth: 185,
            scalingHeight: 155
        };
        this.CoinsProps = {
            imgSrc: ['./graphics/coins.png'],
            cropStartX: [15, 215],
            cropStartY: 15,
            cropStartWidth: 180,
            cropStartHeight: 150,
            canvasStartX: 0,
            canvasStartY: 0,
            scalingWidth: 185,
            scalingHeight: 155
        };
        this.GoldProps = {
            imgSrc: ['./graphics/gold.png'],
            cropStartX: [15, 215],
            cropStartY: 15,
            cropStartWidth: 180,
            cropStartHeight: 150,
            canvasStartX: 0,
            canvasStartY: 0,
            scalingWidth: 185,
            scalingHeight: 155
        };
        this.NotesProps = {
            imgSrc: ['./graphics/notes.png'],
            cropStartX: [15, 215],
            cropStartY: 15,
            cropStartWidth: 180,
            cropStartHeight: 150,
            canvasStartX: 0,
            canvasStartY: 0,
            scalingWidth: 185,
            scalingHeight: 155
        };
        this.RingProps = {
            imgSrc: ['./graphics/ring.png'],
            cropStartX: [15, 215],
            cropStartY: 15,
            cropStartWidth: 180,
            cropStartHeight: 150,
            canvasStartX: 0,
            canvasStartY: 0,
            scalingWidth: 185,
            scalingHeight: 155
        };
        this.LEDProps = {
            imgSrc: ['./graphics/leds_safe_dial_minigame.png'],
            cropStartX: [0, 118, 236],
            cropStartY: 0,
            cropStartWidth: 119,
            cropStartHeight: 40,
            canvasStartX: 0,
            canvasStartY: 0,
            scalingWidth: 119,
            scalingHeight: 40
        };
        this.MarkerProps = {
            imgSrc: ['./graphics/marker.png'],
            cropStartX: [0, 38],
            cropStartY: 0,
            cropStartWidth: 34,
            cropStartHeight: 65,
            canvasStartX: 0,
            canvasStartY: 0,
            scalingWidth: 34,
            scalingHeight: 65
        };
        this.loadImage = () => {
            let load = setInterval(() => {
                this.lc.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.lc.drawImage(this.srcImg, this.nextFrameLoc[this.currentPos], this.selectedProperties.cropStartY, this.selectedProperties.cropStartWidth, this.selectedProperties.cropStartHeight, this.selectedProperties.canvasStartX, this.selectedProperties.canvasStartY, this.selectedProperties.scalingWidth, this.selectedProperties.scalingHeight);
            }, 1);
            setTimeout(() => {
                clearInterval(load);
            }, 50);
        };
        this.hideImage = () => {
            this.lc.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        //arrow function due to scope
        this.animate = () => {
            //clearing and redrawing image
            this.lc.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.lc.drawImage(this.srcImg, this.nextFrameLoc[this.currentPos], this.selectedProperties.cropStartY, this.selectedProperties.cropStartWidth, this.selectedProperties.cropStartHeight, this.selectedProperties.canvasStartX, this.selectedProperties.canvasStartY, this.selectedProperties.scalingWidth, this.selectedProperties.scalingHeight);
            //incrementing the frame counter
            if (this.currentPos < this.nextFrameLoc.length - 1) {
                this.currentPos += 1;
            }
            else {
                this.currentPos = 0;
            }
        };
        if (classPropertiesSelector == Animator.Diamond_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.DiamondProps));
        }
        else if (classPropertiesSelector == Animator.Coin_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.CoinsProps));
        }
        else if (classPropertiesSelector == Animator.Gold_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.GoldProps));
        }
        else if (classPropertiesSelector == Animator.Ring_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.RingProps));
        }
        else if (classPropertiesSelector == Animator.Notes_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.NotesProps));
        }
        else if (classPropertiesSelector == Animator.Safe_LEDs_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.LEDProps));
        }
        else if (classPropertiesSelector == Animator.Marker) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.MarkerProps));
        } //add additional clauses here
        //selecting the animation image and the required properties via the selector keyword static var
        this.srcImg = new Image();
        this.canvas = canvas;
        //grabbing default location for the image must be 'leds_safe_dial_minigame.png'
        this.lc = this.canvas.getContext('2d');
        this.currentPos = imgStartPos;
        this.animationHandle = -1;
        this.nextFrameLoc = this.selectedProperties.cropStartX;
        this.srcImg.src = this.selectedProperties.imgSrc[0];
        //sizing canvas to match image frame
        this.canvas.width = this.selectedProperties.scalingWidth + 5;
        this.canvas.height = this.selectedProperties.scalingHeight + 5;
        this.loadImage();
    }
    startAnimation(FPS_in_ms) {
        if (this.animationHandle == -1) {
            this.animationHandle = setInterval(this.animate, FPS_in_ms);
        }
        else {
            this.stopAnimation();
            this.animationHandle = setInterval(this.animate, FPS_in_ms);
        }
    }
    stopAnimation() {
        clearInterval(this.animationHandle);
    }
}
//image selector options
Animator.Coin_Selector = "coins.png";
Animator.Diamond_Selector = "diamond.png";
Animator.Gold_Selector = "gold.png";
Animator.Ring_Selector = "ring.png";
Animator.Notes_Selector = "notes.png";
Animator.Safe_LEDs_Selector = "leds_safe_dial_minigame.png";
Animator.Marker = "marker.png";
