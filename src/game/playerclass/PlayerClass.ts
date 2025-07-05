import { WeaponItem } from './../../engine/weapons/WeaponItem.js';

/**
 * An interface for a player class ensuring they give the starting hp, weapon and class type
 * Created by:
 * Caleb Smith
 */
export interface PlayerClass {
    /**
     * gets the starting hp of the player class
     * @return starting hp of the player class
     */
    getStartingHP(): number;

    /**
     * gets the starting weapon of the player class
     * @return starting weapon of the player class
     */
    getStartingWeapon(): WeaponItem;

    /**
     * gets the name of the player class
     * @return the name of the player class
     */
    getClassType(): string;
}