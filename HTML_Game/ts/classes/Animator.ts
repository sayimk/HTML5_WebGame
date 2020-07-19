export class Animator {

    //vars
    private canvas: HTMLCanvasElement;
     srcImg: HTMLImageElement;
    private lc: CanvasRenderingContext2D;
    private nextFrameLoc: number[];
    private currentPos: number;
    private animationHandle: number;

    //image selector options
    static readonly Coin_Selector: string = "coins.png";
    static readonly Diamond_Selector: string = "diamond.png";
    static readonly Gold_Selector: string = "gold.png";
    static readonly Ring_Selector: string = "ring.png";
    static readonly Notes_Selector: string = "notes.png";
    static readonly Safe_LEDs_Selector: string = "leds_safe_dial_minigame.png";
    static readonly Marker: string = "marker.png"

    //image properties
    private selectedProperties = {
        imgSrc: [],
        cropStartX: undefined,
        cropStartY: undefined,
        cropStartWidth: undefined,
        cropStartHeight: undefined,
        canvasStartX: undefined,
        canvasStartY: undefined,
        scalingWidth: undefined,
        scalingHeight: undefined
    }

    private DiamondProps = {
        imgSrc: ['./graphics/diamond.png'],
        cropStartX: [15, 215],
        cropStartY: 15,
        cropStartWidth: 180,
        cropStartHeight: 150,
        canvasStartX: 0,
        canvasStartY: 0,
        scalingWidth: 185,
        scalingHeight:155
    }

    private CoinsProps = {
        imgSrc: ['./graphics/coins.png'],
        cropStartX: [15, 215],
        cropStartY: 15,
        cropStartWidth: 180,
        cropStartHeight: 150,
        canvasStartX: 0,
        canvasStartY: 0,
        scalingWidth: 185,
        scalingHeight: 155
    }

    private GoldProps = {
        imgSrc: ['./graphics/gold.png'],
        cropStartX: [15, 215],
        cropStartY: 15,
        cropStartWidth: 180,
        cropStartHeight: 150,
        canvasStartX: 0,
        canvasStartY: 0,
        scalingWidth: 185,
        scalingHeight: 155
    }

    private NotesProps = {
        imgSrc: ['./graphics/notes.png'],
        cropStartX: [15, 215],
        cropStartY: 15,
        cropStartWidth: 180,
        cropStartHeight: 150,
        canvasStartX: 0,
        canvasStartY: 0,
        scalingWidth: 185,
        scalingHeight: 155
    }

    private RingProps = {
        imgSrc: ['./graphics/ring.png'],
        cropStartX: [15, 215],
        cropStartY: 15,
        cropStartWidth: 180,
        cropStartHeight: 150,
        canvasStartX: 0,
        canvasStartY: 0,
        scalingWidth: 185,
        scalingHeight: 155
    }

    private LEDProps = {
        imgSrc: ['./graphics/leds_safe_dial_minigame.png'],
        cropStartX: [0, 118, 236],
        cropStartY: 0,
        cropStartWidth: 119,
        cropStartHeight: 40,
        canvasStartX: 0,
        canvasStartY: 0,
        scalingWidth: 119,
        scalingHeight: 40
    }

    private MarkerProps = {
        imgSrc: ['./graphics/marker.png'],
        cropStartX: [0,38],
        cropStartY: 0,
        cropStartWidth: 34,
        cropStartHeight: 65,
        canvasStartX: 0,
        canvasStartY: 0,
        scalingWidth: 34,
        scalingHeight: 65
    }

    //imgStartPos allows a different sequence
    constructor(canvas: HTMLCanvasElement, classPropertiesSelector: string, imgStartPos: number = 0) {

        if (classPropertiesSelector == Animator.Diamond_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.DiamondProps));

        } else if (classPropertiesSelector == Animator.Coin_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.CoinsProps));

        } else if (classPropertiesSelector == Animator.Gold_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.GoldProps));

        } else if (classPropertiesSelector == Animator.Ring_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.RingProps));

        } else if (classPropertiesSelector == Animator.Notes_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.NotesProps));

        } else if (classPropertiesSelector == Animator.Safe_LEDs_Selector) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.LEDProps));

        } else if (classPropertiesSelector == Animator.Marker) {
            this.selectedProperties = (Object.assign(this.selectedProperties, this.MarkerProps));

        }//add additional clauses here

        //selecting the animation image and the required properties via the selector keyword static var
        this.srcImg = new Image();
        this.canvas = canvas;

        //grabbing default location for the image must be 'leds_safe_dial_minigame.png'
        this.lc = this.canvas.getContext('2d')!;
        this.currentPos = imgStartPos;
        this.animationHandle = -1;
        this.nextFrameLoc = this.selectedProperties.cropStartX!;
        this.srcImg.src = this.selectedProperties.imgSrc[0]!;
                
        //sizing canvas to match image frame
        this.canvas.width = this.selectedProperties.scalingWidth! + 5;
        this.canvas.height = this.selectedProperties.scalingHeight!+5;

        this.loadImage();
    }

    public loadImage = () => {
		let load: number = setInterval(() => {
            this.lc.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
			this.lc.drawImage(this.srcImg, this.nextFrameLoc[this.currentPos], this.selectedProperties.cropStartY!, this.selectedProperties.cropStartWidth!,
                this.selectedProperties.cropStartHeight!, this.selectedProperties.canvasStartX!, this.selectedProperties.canvasStartY!, this.selectedProperties.scalingWidth!,
                this.selectedProperties.scalingHeight!);
		}, 1);

		setTimeout(() => {
			clearInterval(load);
		}, 50);
    }

    public hideImage = ()=>{
        this.lc.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //arrow function due to scope
    animate = () => {
        //clearing and redrawing image
        this.lc.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.lc.drawImage(this.srcImg, this.nextFrameLoc[this.currentPos], this.selectedProperties.cropStartY!, this.selectedProperties.cropStartWidth!,
            this.selectedProperties.cropStartHeight!, this.selectedProperties.canvasStartX!, this.selectedProperties.canvasStartY!, this.selectedProperties.scalingWidth!,
            this.selectedProperties.scalingHeight!);

        //incrementing the frame counter
        if (this.currentPos < this.nextFrameLoc.length - 1) {
            this.currentPos += 1;
        } else {
            this.currentPos = 0;
        }
    }

    startAnimation(FPS_in_ms: number): void {
        if (this.animationHandle == -1) {
            this.animationHandle = setInterval(this.animate, FPS_in_ms);
        } else {
            this.stopAnimation();
            this.animationHandle = setInterval(this.animate, FPS_in_ms);
        }
    }

    stopAnimation(): void {
        clearInterval(this.animationHandle);
    }
}

