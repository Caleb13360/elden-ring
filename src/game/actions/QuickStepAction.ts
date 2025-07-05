import { Action } from './../../engine/actions/Action.js';
import { MoveActorAction } from './../../engine/actions/MoveActorAction.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Exit } from './../../engine/positions/Exit.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { DeathAction } from './DeathAction.js';

/**
 * Action that represents the quickstep skill.
 * Uses multiple actions to hit an enemy and then move to an adjacent available tile.
 * Created by: Caleb Smith
 */
export class QuickStepAction extends Action {
    private target: Actor;
    private direction: string;
    private weapon: WeaponItem;

    /**
     * Quickstep constructor
     * @param target target being attacked
     * @param direction direction attacking
     * @param weapon weapon used for attack
     */
    constructor(target: Actor, direction: string, weapon: WeaponItem) {
        super();
        this.target = target;
        this.direction = direction;
        this.weapon = weapon;
    }

    /**
     * Performs the quickstep action: attack enemy and move away to an available adjacent tile.
     * @param actor The actor performing quickstep
     * @param map The map the actor is on.
     * @returns a string description of the quickstep action that was performed
     */
    execute(actor: Actor, map: GameMap): string {
        const damage = this.weapon.damage();
        let result = `${actor} quick steps at ${this.target} for ${damage} damage.`;
        this.target.hurt(damage);
        if (!this.target.isConscious()) {
            result += new DeathAction(actor).execute(this.target, map);
        }
        const actorLocation = map.locationOf(actor);
        result += "\n";
        for (const exit of actorLocation.getExits()) {
            const destination = exit.getDestination();
            if (!destination.containsAnActor()) {
                result += new MoveActorAction(destination, exit.getName()).execute(actor, map);
                return result;
            }
        }
        result += `${actor} was unable to quickstep away from enemy`;
        return result;
    }

    /**
     * Describes which target the actor is attacking with quickstep
     * @param actor The actor performing the action.
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `${actor} Quick steps against ${this.target} at ${this.direction} with ${this.weapon ? this.weapon : "Intrinsic Weapon"}`;
    }
}