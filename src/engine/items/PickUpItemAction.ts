import { PickUpAction } from './PickUpAction.js';
import { Item } from './Item.js';
import { Actor } from '../actors/Actor.js';
import { GameMap } from '../positions/GameMap.js';

/**
 * Action to allow items to be picked up.
 */
export class PickUpItemAction extends PickUpAction {
    public item: Item;

    /**
     * Constructor.
     *
     * @param item the item to pick up
     */
    constructor(item: Item) {
        super(item);
        this.item = item;
    }

    /**
     * Add the item to the actor's inventory.
     *
     * @param actor The actor performing the action.
     * @param map The map the actor is on.
     * @return a suitable description to display in the UI
     */
    execute(actor: Actor, map: GameMap): string {
        actor.addItemToInventory(this.item);
        return super.execute(actor, map);
    }
}