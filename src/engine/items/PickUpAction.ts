import { Action } from '../actions/Action.js';
import { Actor } from '../actors/Actor.js';
import { GameMap } from '../positions/GameMap.js';
import { Item } from './Item.js';

/**
 * An abstract pick up action class
 */
export abstract class PickUpAction extends Action {
    protected item: Item;

    constructor(item: Item) {
        super();
        this.item = item;
    }

    /**
     * When executed, remove the item from the location in the game map where the actor is currently standing on
     *
     * @param actor The actor performing the action.
     * @param map The map the actor is on.
     * @return a description of the action suitable for feedback in the UI
     */
    execute(actor: Actor, map: GameMap): string {
        map.locationOf(actor).removeItem(this.item);
        return this.menuDescription(actor);
    }

    /**
     * Describe the action in a format suitable for displaying in the menu.
     *
     * @param actor The actor performing the action.
     * @return a string, e.g. "Player picks up the rock"
     */
    menuDescription(actor: Actor): string {
        return `${actor} picks up the ${this.item}`;
    }
}