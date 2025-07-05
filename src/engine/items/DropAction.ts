import { Action } from '../actions/Action.js';
import { Actor } from '../actors/Actor.js';
import { GameMap } from '../positions/GameMap.js';
import { Item } from './Item.js';

/**
 * An abstract drop action class
 */
export abstract class DropAction extends Action {
    protected item: Item;

    /**
     * Constructor.
     *
     * @param item the item to drop
     */
    constructor(item: Item) {
        super();
        this.item = item;
    }

    /**
     * When executed, add the dropped item to the game map
     *
     * @param actor The actor performing the action.
     * @param map The map the actor is on.
     * @return a description of the action suitable for feedback in the UI
     */
    execute(actor: Actor, map: GameMap): string {
        map.locationOf(actor).addItem(this.item);
        return this.menuDescription(actor);
    }

    /**
     * A string describing the action suitable for displaying in the UI menu.
     *
     * @param actor The actor performing the action.
     * @return a string, e.g. "Player drops the potato"
     */
    menuDescription(actor: Actor): string {
        return `${actor} drops the ${this.item}`;
    }
}