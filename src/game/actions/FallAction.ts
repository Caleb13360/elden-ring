import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';

/**
 * Class representing action for falling off of cliff
 */
export class FallAction extends Action {
    /**
     * Kill player when falling
     * @param actor The actor falling
     * @param map The map the actor is on
     * @returns a string describing the result of the fall
     */
    execute(actor: Actor, map: GameMap): string {
        actor.hurt(Number.MAX_SAFE_INTEGER);
        return `${actor} fell off of the map`;
    }

    /**
     * Returns the menu description for this action
     * @param actor The actor performing the action
     * @returns a string for the menu
     */
    menuDescription(actor: Actor): string {
        return "Step off the map";
    }
}