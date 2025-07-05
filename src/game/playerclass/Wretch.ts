import { PlayerClass } from './PlayerClass.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { Club } from '../weapons/Club.js';

/**
 * Class which implements the PlayerClass to represent a Wretch
 * Created by:
 * Caleb Smith
 */
export class Wretch implements PlayerClass {
    /**
     * HP player of Wretch Class starts with
     */
    private readonly startingHP: number = 414;

    /**
     * String representing class type
     */
    private readonly classType: string = "Wretch";

    /**
     * gets the starting hp of a Wretch
     * @return starting hp of a Wretch
     */
    getStartingHP(): number {
        return this.startingHP;
    }

    /**
     * gets the starting weapon of a Wretch
     * @return starting weapon of a Wretch
     */
    getStartingWeapon(): WeaponItem {
        return new Club();
    }

    /**
     * gets the name of the player class
     * @return the name of the player class
     */
    getClassType(): string {
        return this.classType;
    }
}