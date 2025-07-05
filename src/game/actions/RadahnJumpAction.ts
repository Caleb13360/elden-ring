import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';

/**
 * An Action to show Radahn jumping into the sky
 * Created by: Caleb Smith
 */
export class RadahnJumpAction extends Action {
    /**
     * Radahn jump constructor
     */
    constructor() {
        super();
    }

    /**
     * Completes the jumping action, nothing occurs as the string representation change must occur within the class as
     * it is protected
     * @param actor The actor performing the action.
     * @param map The map the actor is on.
     * @return the menu description
     */
    execute(actor: Actor, map: GameMap): string {
        return this.menuDescription(actor);
    }

    /**
     * Describes which actor is jumping into the sky
     * @param actor The actor jumping into the sky
     * @return a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `${actor} leaps into the sky and vanishes`;
    }
}