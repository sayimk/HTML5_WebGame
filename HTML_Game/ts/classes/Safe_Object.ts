export class SafeObject {
    
    //using this class to hold multipliers and the animation icon names
    private multiplierVal:number;
    private iconAnimatorName:string;
    
    constructor(multiplier:number, iconName:string) {
        this.multiplierVal = multiplier;
        this.iconAnimatorName = iconName;
    }

    //standard getters
    getMultiplier(){
        return this.multiplierVal;
    }

    getIconName(){
        return this.iconAnimatorName;
    }
}