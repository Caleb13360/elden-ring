import { RegularEnemy } from './RegularEnemy.js';
import { Faction } from './Faction.js';

/**
 * Abstract class for enemies that are Canine in nature
 * Created by:
 * Rvinder Sandhu
 */
export abstract class Canine extends RegularEnemy {
    /**
     * Constructor for a canine type regular enemy that utilises a specific intrinsic weapon
     * @param name name of the enemy
     * @param displayChar its display character
     * @param hitPoints its hit points
     * @param minRunes minimum amount of runes the enemy drops
     * @param maxRunes maximum amount of runes the enemy drops
     * @param intrinsicWeaponDamage its intrinsic weapon damage
     * @param intrinsicAttackVerb its intrinsic attack verb
     * @param intrinsicWeaponAccuracy its intrinsic attack accuracy
     */
    constructor(
        name: string,
        displayChar: string,
        hitPoints: number,
        minRunes: number,
        maxRunes: number,
        intrinsicWeaponDamage: number,
        intrinsicAttackVerb: string,
        intrinsicWeaponAccuracy: number
    ) {
        super(
            name,
            displayChar,
            hitPoints,
            minRunes,
            maxRunes,
            intrinsicWeaponDamage,
            intrinsicAttackVerb,
            intrinsicWeaponAccuracy
        );
        this.addCapability(Faction.CANINE_FRIENDLY);
    }
}