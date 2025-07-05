import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { RuneManager } from '../runes/RuneManager.js';
import { SellAble } from '../weapons/SellAble.js';

/**
 * Class implementing sell action for weapons
 * Created by: Caleb Smith & Rvinder Sandhu
 */
export class SellAction extends Action {
    /**
     * To whom the item is sold
     */
    private trader: Actor;
    /**
     * Which item is sold
     */
    private item: SellAble;

    /**
     * Constructor for the sell action
     * @param trader buyer
     * @param item item to be sold
     */
    constructor(trader: Actor, item: SellAble) {
        super();
        this.trader = trader;
        this.item = item;
    }

    /**
     * Remove sold item from inventory and increase runes by amount the sold item is worth
     * @param seller The actor selling the item
     * @param map The map the actor is on.
     * @return a string description of the sale
     */
    execute(seller: Actor, map: GameMap): string {
        RuneManager.getInstance().addRunes(this.item.getSellPrice());
        this.item.removeItem(seller);
        return `${seller} sold ${this.item.getItemName()} to ${this.trader} for ${this.item.getSellPrice()} runes.`;
    }

    /**
     * Describes which actor is selling what item for what price
     * @param seller The actor selling the item
     * @return a description used for the menu UI
     */
    menuDescription(seller: Actor): string {
        return `${seller} sells ${this.item.getItemName()} for ${this.item.getSellPrice()} runes.`;
    }
}