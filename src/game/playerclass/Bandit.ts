import { PlayerClass } from './PlayerClass.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { GreatKnife } from '../weapons/GreatKnife.js';

/**
 * Class which implements the PlayerClass to represent a Bandit
 * Created by:
 * Caleb Smith
 */
export class Bandit implements PlayerClass {
    /**
     * HP player of Bandit Class starts with
     */
    private readonly startingHP: number = 414;

    /**
     * String representing class type
     */
    private readonly classType: string = "Bandit";

    /**
     * gets the starting hp of a bandit
     * @return starting hp of a bandit
     */
    getStartingHP(): number {
        return this.startingHP;
    }

    /**
     * gets the starting weapon of a bandit
     * @return starting weapon of a bandit
     */
    getStartingWeapon(): WeaponItem {
        return new GreatKnife();
    }

    /**
     * gets the name of the player class
     * @return the name of the player class
     */
    getClassType(): string {
        return this.classType;
    }
}