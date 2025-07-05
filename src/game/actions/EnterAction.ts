import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Enterable } from '../grounds/Enterable.js';

/**
 * Class representing the action of entering a door
 */
export class EnterAction extends Action {
    /**
     * Door that will be entered
     */
    private door: Enterable;

    /**
     * Constructor for the Enter action
     * @param door door that will be entered
     */
    constructor(door: Enterable) {
        super();
        this.door = door;
    }

    /**
     * Executes the enter action, moving the actor to the door's destination
     * @param actor the actor performing the action
     * @param map the game map
     * @returns a string describing the result of the action
     */
    execute(actor: Actor, map: GameMap): string {
        map.moveActor(actor, this.door.getDestination());
        return `${actor} has travelled to ${this.door.getDestinationName()}`;
    }

    /**
     * Returns the menu description for this action
     * @param actor the actor performing the action
     * @returns a string for the menu
     */
    menuDescription(actor: Actor): string {
        return `${actor} travels to ${this.door.getDestinationName()}`;
    }
}