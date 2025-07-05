import { Weapon } from './Weapon.js';

/**
 * Class that represents a weapon for an unarmed Actor (e.g. fists, claws, etc.)
 * @see Weapon
 */
export class IntrinsicWeapon implements Weapon {
    private readonly _damage: number;
    private readonly _verb: string;
    private readonly _hitRate: number;

    /**
     * Constructor
     * @param damage damage to health
     * @param verb a word that will be printed in the action
     * @param hitRate chance to hit (percentage, default 50)
     */
    constructor(damage: number, verb: string, hitRate: number = 50) {
        this._damage = damage;
        this._verb = verb;
        this._hitRate = hitRate;
    }

    /**
     * The amount of damage the Weapon will inflict
     * @return the damage, in hitpoints
     */
    damage(): number {
        return this._damage;
    }

    /**
     * A verb to use when displaying the results of attacking with this Weapon
     * @return String, e.g. "punches", "zaps"
     */
    verb(): string {
        return this._verb;
    }

    /**
     * An integer of how many percent (as dividend/100) the Actor can hit with this weapon.
     * @return a chance to hit.
     */
    chanceToHit(): number {
        return this._hitRate;
    }

    toString(): string {
        return "no weapon";
    }
}