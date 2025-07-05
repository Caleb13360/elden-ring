import { Actor } from './../../engine/actors/Actor.js';

/**
 * An interface that represents an item that can be bought from a trader
 * Created by:
 * Caleb Smith, Rvinder Sandhu
 */
export interface BuyAble {
    /**
     * Add item to actor inventory
     * @param actor add item to actor inventory
     */
    addItem(actor: Actor): void;

    /**
     * Get the price of buyable item
     * @return integer representing price
     */
    getBuyPrice(): number;

    /**
     * Get name of buyable item
     * @return string representing item
     */
    getItemName(): string;
}