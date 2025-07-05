import { Actor } from './../../engine/actors/Actor.js';

/**
 * An interface that represents an item that can be sold to a trader
 * Created by:
 * Caleb Smith, Rvinder Sandhu
 */
export interface SellAble {
    /**
     * Gets the name of the sellable item
     * @return name as string
     */
    getItemName(): string;

    /**
     * Get the selling price of sellable item
     * @return integer representing selling price
     */
    getSellPrice(): number;

    /**
     * Removes the item from actor inventory
     * @param actor actor the item is being removed from
     */
    removeItem(actor: Actor): void;
}