export class Animator_Safe_Dial {

	//general Vars
	private dialCanvas: HTMLCanvasElement;
	private img: HTMLImageElement;
	private ct: CanvasRenderingContext2D;

	//number positions for rotations from default/initial rotation
	private numberRotations: number[] = [-315, -355, -395, -435, -475, -515, -555, -595, -635];
	private speed =-5; //speed and numberRotations are multiples
	

	//required digit => 2 digit rewind =>1 digit forward spin to required number
	//value holders for 2 digit rewind
	//value holders for normal spin
	private InitialSpinReqPos: number = 0;
	private InitialSpinCurrentPos: number = 0;

	private respinReqPos: number = 0;
	private respinCurrentPos: number = 0;

	//value holders for 1 digit forward spin
	private finalSpinReqPos: number = 0;
	private finalSpinCurrentPos: number = 0;


	//function holding var for executing function on completion of animation
	private executeOnComplete:Function;

	//positions on the different dials, count used for logging current dial selection
	private colorDialLocation: number[] = [0, 275, 550];
	private colorDialCount: number = 0;

	constructor(canvas: HTMLCanvasElement) {
		this.dialCanvas = canvas;
		this.img = new Image;
		this.img.src = './graphics/safe_dial_minigame.png';

		this.ct = this.dialCanvas.getContext('2d')!;
		this.dialCanvas.width = 275;
		this.dialCanvas.height = 275;

		this.executeOnComplete = ()=>{

		}
		this.loadImage();
	}	

	private loadImage = () => {
		let load: number = setInterval(() => {
			this.ct.clearRect(0, 0, 275, 275);
			this.ct.drawImage(this.img, 0, 0, 275, 275, 0, 0, 275, 275);
		}, 1);

		setTimeout(() => {
			clearInterval(load);
		}, 30);
    }

	//animates a single dial rotation frame at a certain speed/degree
	private animateRotateFrame = (speed: number) => {

		this.ct.clearRect(0, 0, 275, 275);
		this.ct.translate((this.dialCanvas.width / 2), (this.dialCanvas.height/2));
		this.ct.rotate(Math.PI / 180 * speed);
		this.ct.translate(-(this.dialCanvas.width / 2), -(this.dialCanvas.height / 2));
		this.ct.drawImage(this.img, 0, 0, 275, 275, 0, 0, 275, 275);
	}

	//main function caller rotates dial to the position on the dial
	startRotationAnimation = (desiredDialNumb: number, executeOnComplete?:Function) => {

		let reqNoPos: number = desiredDialNumb - 1;
		let noPosInfront:number;
		let noPosBehind:number

		//saves original transform for resetting back to reference positions
		this.ct.save();

		if(executeOnComplete!=undefined){
			this.executeOnComplete = executeOnComplete;
		} else{
			this.executeOnComplete = ()=>{
			}
		}

		//fetching position 1 step behind
		if(reqNoPos==0){
			noPosBehind = 8;
		}else{
			noPosBehind = reqNoPos-1;
		}

		//fetch position 1 step infront
		if(reqNoPos == 8){
			noPosInfront = 0;
		}else{
			noPosInfront = reqNoPos + 1;
		}

		this.InitialSpinCurrentPos = 0;
		this.InitialSpinReqPos = this.numberRotations[noPosInfront];

		//setting up backwards spin
		this.respinCurrentPos = this.numberRotations[noPosInfront];
		this.respinReqPos = this.numberRotations[noPosBehind];

		this.finalSpinCurrentPos = this.numberRotations[noPosBehind];
		this.finalSpinReqPos = this.numberRotations[reqNoPos];

		this.animateInitialSpin();
	}

	//animateInititalSpin and animateRotateCallback are similar 
	//because requestAnimationFrame doesnt let me pass unique vars
	private animateInitialSpin = () => {

		this.animateRotateFrame(this.speed);
		this.InitialSpinCurrentPos = this.InitialSpinCurrentPos + this.speed;

		if (this.InitialSpinReqPos <= this.InitialSpinCurrentPos) {
			window.requestAnimationFrame(this.animateInitialSpin);
		}else{
			this.animateRotateReverseCallback();
		}
	}

	private animateRotateCallback = () => {

		this.animateRotateFrame(this.speed);
		this.finalSpinCurrentPos = this.finalSpinCurrentPos + this.speed;

		if (this.finalSpinReqPos <= this.finalSpinCurrentPos) {
			window.requestAnimationFrame(this.animateRotateCallback);
		}else{
			this.animateRedFlash();
		}
	}

	private animateRotateReverseCallback = () => {

		this.animateRotateFrame((this.speed * -1));
		this.respinCurrentPos = this.respinCurrentPos + (this.speed * -1);

		if (this.respinReqPos >= this.respinCurrentPos) {
			window.requestAnimationFrame(this.animateRotateReverseCallback);
		}else{
			this.animateRotateCallback();
		}
	}

	private animateRedFlash = ()=> {

		let flashCount:number =0;

		let flashInterval = setInterval(() => {
				this.ct.clearRect(0, 0, 275, 275);
				this.ct.drawImage(this.img, this.colorDialLocation[this.colorDialCount], 0, 275, 275, 0, 0, 275, 275);

				if (this.colorDialCount < (this.colorDialLocation.length - 2)) {
					this.colorDialCount = this.colorDialCount + 1;

					if (flashCount < 4) {
						flashCount = flashCount + 1;
					} else {
						//ends flashing and resets canvas to reference save point, ready for next input
						clearInterval(flashInterval);
						this.ct.restore();
						this.executeOnComplete();
					}
				} else {
					this.colorDialCount = 0;
				}
		}, 200);
	}

	//animates a fast endless spin
	private gameEndSpinFrame = () => {
		this.ct.clearRect(0, 0, 275, 275);

		//rotate
		this.ct.translate((this.dialCanvas.width / 2), (this.dialCanvas.height / 2));
		this.ct.rotate(Math.PI / 180 * 10);
		this.ct.translate(-(this.dialCanvas.width / 2), -(this.dialCanvas.height / 2));

		//select dial
		this.ct.drawImage(this.img, this.colorDialLocation[this.colorDialCount], 0, 275, 275, 0, 0, 275, 275);
		requestAnimationFrame(this.gameEndSpinFrame);
	}

	//animates the color cycling grey =>red => green
	private gameEndFlashFrame = () => {
		this.ct.clearRect(0, 0, 275, 275);

		//select dial
		this.ct.drawImage(this.img, this.colorDialLocation[this.colorDialCount], 0, 275, 275, 0, 0, 275, 275);

		if (this.colorDialCount < (this.colorDialLocation.length - 1)) {
			this.colorDialCount = this.colorDialCount + 1;
		} else {
			this.colorDialCount = 0;
		}
	}

	gameEnd = () => {
		setInterval(this.gameEndFlashFrame, 200);
		this.gameEndSpinFrame();
		
	}

}


