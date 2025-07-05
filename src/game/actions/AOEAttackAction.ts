import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Weapon } from './../../engine/weapons/Weapon.js';
import { AttackAction } from './AttackAction.js';

/**
 * An Action to attack all actors around an attacker.
 * Created by: Rvinder Sandhu
 */
export class AOEAttackAction extends Action {
    /**
     * Weapon used to attack with
     */
    private weapon?: Weapon;

    /**
     * Constructor for AOE attack action
     * @param weapon weapon used to attack
     */
    constructor(weapon?: Weapon) {
        super();
        this.weapon = weapon;
    }

    /**
     * Carries out an attack against all actors in the vicinity of the attacker
     * @param actor actor performing the aoe attack
     * @param map the map the actor performing the attack is in
     * @returns string representation of the interactions that occurred
     */
    execute(actor: Actor, map: GameMap): string {
        if (!this.weapon) {
            this.weapon = actor.getIntrinsicWeapon();
        }
        let results = `${actor} ${this.weapon.verb()} all around them `;
        for (const exit of map.locationOf(actor).getExits()) {
            const destination = exit.getDestination();
            if (destination.containsAnActor()) {
                const target = map.getActorAt(destination);
                if(target){
                    results += "\n" + new AttackAction(target, exit.getName(), this.weapon).execute(actor, map);
                }
            }
        }
        return results;
    }

    /**
     * Gets the menu description for performing the aoe attack
     * @param actor The actor performing the action.
     * @returns the menu description of the aoe action
     */
    menuDescription(actor: Actor): string {
        return `${actor} attacks all around with ${this.weapon ? this.weapon : "Intrinsic Weapon"}`;
    }
}