import { DropAction } from './DropAction.js';
import { Item } from './Item.js';
import { Actor } from '../actors/Actor.js';
import { GameMap } from '../positions/GameMap.js';

/**
 * Special Action that allows Actors to drop items.
 */
export class DropItemAction extends DropAction {
    protected item: Item;

    /**
     * Constructor.
     *
     * @param item the item to drop
     */
    constructor(item: Item) {
        super(item);
        this.item = item;
    }

    /**
     * Drop the item.
     *
     * @param actor The actor performing the action
     * @param map The map the actor is on
     * @return a description of the action suitable for feedback in the UI
     */
    execute(actor: Actor, map: GameMap): string {
        actor.removeItemFromInventory(this.item);
        return super.execute(actor, map);
    }
}