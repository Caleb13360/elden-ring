import { Actor } from './../../engine/actors/Actor.js';
import { Item } from './../../engine/items/Item.js';
import { PickUpAction } from './../../engine/items/PickUpAction.js';
import { PickUpRunesAction } from '../actions/PickUpRunesAction.js';

/**
 * Class that extends Item to make a set of Runes
 * Created by: Caleb Smith, Rvinder Sandhu
 */
export class Runes extends Item {
    /**
     * Number of Runes contained 
     */
    private runes: number = 0;

    /**
     * Constructor for Runes instance
     * @param runes number of runes the item will hold
     */
    constructor(runes: number) {
        super("Runes", '$', false);
        this.runes = runes;
    }

    /**
     * Return how many runes are held in the Runes instance
     * @return how many runes are in this rune instance
     */
    getRunes(): number {
        return this.runes;
    }

    /**
     * Gets the pickup action of the rune item
     * @param actor the actor picking up the runes
     * @return the action to pick up the runes
     */
    getPickUpAction(actor: Actor): PickUpAction {
        return new PickUpRunesAction(this);
    }
}