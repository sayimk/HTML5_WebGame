export class Game_Logic {
    constructor() {
        this.safeMultipliers = [];
        this.rolledNumbers = [];
        //value getters
        this.getSafeMultiplier = () => {
            return this.safeMultipliers;
        };
        this.getMultiplier_1 = () => {
            return this.multi_1;
        };
        this.getMultiplier_2 = () => {
            return this.multi_2;
        };
        this.getMultiplier_3 = () => {
            return this.multi_3;
        };
        //returns 1 by default, 1 = no match
        //will check if the existing multipliers rolled match
        this.getIsMatch = () => {
            let matchCheck = [];
            for (let index = 0; index < this.rolledNumbers.length; index++) {
                if (!matchCheck.includes(this.safeMultipliers[this.rolledNumbers[index] - 1])) {
                    matchCheck.push(this.safeMultipliers[this.rolledNumbers[index] - 1]);
                }
                else {
                    return this.safeMultipliers[this.rolledNumbers[index] - 1];
                }
            }
            return 1;
        };
        this.getRolledNumbers = () => {
            return this.rolledNumbers;
        };
        //used to get a number before spinning the dial
        this.getRandomSafeNumb = () => {
            let rolledNumb = -1;
            let newNumb = false;
            while (!newNumb) {
                rolledNumb = 1 + Math.floor(Math.random() * 8);
                if (!this.rolledNumbers.includes(rolledNumb)) {
                    newNumb = true;
                    this.rolledNumbers.push(rolledNumb);
                    return rolledNumb;
                }
            }
            return rolledNumb;
        };
        //selecting random safes
        let safeOrder = [];
        //selecting random multipliers
        let avalMultipliers = [15, 16, 17, 18, 19, 20];
        let filled = false;
        let multiplierSelector = [];
        //final safe multipliers
        while (!filled) {
            //selecting multipliers at random
            let selectedNumber = Math.floor(Math.random() * 6);
            if (!multiplierSelector.includes(selectedNumber)) {
                multiplierSelector.push(selectedNumber);
                if (multiplierSelector.length == 3) {
                    filled = true;
                }
            }
        }
        //randomly selecting safe/multiplier allocation
        while (safeOrder.length <= 8) {
            let selectedNumber = (Math.floor(Math.random() * 9));
            if (!safeOrder.includes(selectedNumber)) {
                safeOrder.push(selectedNumber);
            }
        }
        //assigning multipliers to reference public vars
        this.multi_1 = avalMultipliers[multiplierSelector[0]];
        this.multi_2 = avalMultipliers[multiplierSelector[1]];
        this.multi_3 = avalMultipliers[multiplierSelector[2]];
        let tempMulti = [this.multi_1, this.multi_1, this.multi_1,
            this.multi_2, this.multi_2, this.multi_2,
            this.multi_3, this.multi_3, this.multi_3];
        //adding multipliers to the output list that will be accessible to public 
        for (let index = 0; index < safeOrder.length; index++) {
            this.safeMultipliers.push(tempMulti[safeOrder[index]]);
        }
    }
}
