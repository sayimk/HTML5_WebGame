export class SafeObject {
    constructor(multiplier, iconName) {
        this.multiplierVal = multiplier;
        this.iconAnimatorName = iconName;
    }
    //standard getters
    getMultiplier() {
        return this.multiplierVal;
    }
    getIconName() {
        return this.iconAnimatorName;
    }
}
