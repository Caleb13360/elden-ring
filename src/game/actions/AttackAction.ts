import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Weapon } from './../../engine/weapons/Weapon.js';
import { DeathAction } from './DeathAction.js';

/**
 * An Action to attack another Actor.
 * Created by: Adrian Kristanto
 * Modified by: Rvinder Sandhu
 */
export class AttackAction extends Action {
    /**
     * The Actor that is to be attacked
     */
    private target: Actor;

    /**
     * The direction of incoming attack.
     */
    private direction: string;

    /**
     * Weapon used for the attack
     */
    private weapon?: Weapon;

    /**
     * Constructor.
     * @param target the Actor to attack
     * @param direction the direction where the attack should be performed (only used for display purposes)
     * @param weapon the weapon used for the attack (optional)
     */
    constructor(target: Actor, direction: string, weapon?: Weapon) {
        super();
        this.target = target;
        this.direction = direction;
        this.weapon = weapon;
    }

    /**
     * When executed, the chance to hit of the weapon that the Actor used is computed to determine whether
     * the actor will hit the target. If so, deal damage to the target and determine whether the target is killed.
     * @param actor The actor performing the attack action.
     * @param map The map the actor is on.
     * @returns the result of the attack, e.g. whether the target is killed, etc.
     */
    execute(actor: Actor, map: GameMap): string {
        let weapon = this.weapon;
        if (!weapon) {
            weapon = actor.getIntrinsicWeapon();
        }

        if (Math.floor(Math.random() * 100) > weapon.chanceToHit()) {
            return `${actor} misses ${this.target}.`;
        }

        const damage = weapon.damage();
        let result = `${actor} ${weapon.verb()} ${this.target} for ${damage} damage.`;
        this.target.hurt(damage);
        if (!this.target.isConscious()) {
            result += new DeathAction(actor).execute(this.target, map);
        }

        return result;
    }

    /**
     * Describes which target the actor is attacking with which weapon
     * @param actor The actor performing the action.
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `${actor} attacks ${this.target} at ${this.direction} with ${this.weapon ? this.weapon : "Intrinsic Weapon"}`;
    }
}