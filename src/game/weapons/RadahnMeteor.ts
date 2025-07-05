import { WeaponItem } from './../../engine/weapons/WeaponItem.js';

/**
 * A simple weapon that represents Radahn's meteor attack.
 * Radahn uses himself as a weapon, and this is how it is represented.
 * Created by: Caleb Smith
 */
export class RadahnMeteor extends WeaponItem {
    /**
     * Radahn meteor constructor
     */
    constructor() {
        super("Radahn in meteor form", ' ', 800, "impacts", 100);
    }
}