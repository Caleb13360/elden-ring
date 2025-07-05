import { Action } from '../actions/Action.js';
import { Actor } from '../actors/Actor.js';
import { DoNothingAction } from '../actions/DoNothingAction.js';

/**
 * Interface for weapon items.
 *
 * As well as providing methods needed by weapons, this interface is used in Item to
 * determine whether an item can be used as a weapon.
 */
export interface Weapon {
    /**
     * The amount of damage the Weapon will inflict
     *
     * @return the damage, in hitpoints
     */
    damage(): number;

    /**
     * A verb to use when displaying the results of attacking with this Weapon
     *
     * @return String, e.g. "punches", "zaps"
     */
    verb(): string;

    /**
     * A chance to hit the target (this is the dividend of percentage)
     *
     * @return the chance, in integer for probability with nextInt()
     */
    chanceToHit(): number;

    /**
     * Get an active skill action from the weapon. Use this method if you want to use a weapon skill
     * against one targeted Actor (i.e, special attack, heal, stun, etc.).
     * @param target target actor
     * @param direction direction of the attack
     * @return a special Action that can be performed by this weapon (perform special attack on the enemy, etc.)
     */
    getSkill?(target: Actor, direction: string): Action;

    /**
     * Get an active skill action from the weapon. This should be used for weapon skills that do not involve a target actor
     * For instance, healing the holder of the weapon, switching current weapon's attack, e.g. from normal attack to fire attack
     * @param holder weapon holder
     * @return a special Action that can be performed by this weapon (heal the player, etc.)
     */
    getSkill?(holder: Actor): Action | null;
}

/**
 * Default implementation for getSkill methods.
 * You can use this helper in your Weapon classes if you want default behavior.
 */
export const WeaponDefaults = {
    getSkill(target: Actor, direction: string): Action {
        return new DoNothingAction();
    },
    getSkillNoTarget(holder: Actor): Action | null {
        return null;
    }
};