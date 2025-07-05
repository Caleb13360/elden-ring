import { PlayerClass } from './PlayerClass.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { Uchigatana } from '../weapons/Uchigatana.js';

/**
 * Class which implements the PlayerClass to represent a Samurai
 * Created by:
 * Caleb Smith
 */
export class Samurai implements PlayerClass {
    /**
     * HP player of Samurai Class starts with
     */
    private readonly startingHP: number = 455;

    /**
     * String representing class type
     */
    private readonly classType: string = "Samurai";

    /**
     * gets the starting hp of a Samurai
     * @return starting hp of a Samurai
     */
    getStartingHP(): number {
        return this.startingHP;
    }

    /**
     * gets the starting weapon of a Samurai
     * @return starting weapon of a Samurai
     */
    getStartingWeapon(): WeaponItem {
        return new Uchigatana();
    }

    /**
     * gets the name of the player class
     * @return the name of the player class
     */
    getClassType(): string {
        return this.classType;
    }
}