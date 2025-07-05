import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { RuneManager } from '../runes/RuneManager.js';
import { BuyAble } from '../weapons/BuyAble.js';

/**
 * The action for an item being bought from a trader by an actor using runes as currency
 * Created by: Caleb Smith
 */
export class BuyAction extends Action {
    /**
     * The trader the item is being bought from
     */
    private trader: Actor;
    /**
     * The item being bought from the trader
     */
    private item: BuyAble;

    /**
     * Constructor
     * @param trader trader the item is being bought from
     * @param item the item being bought
     */
    constructor(trader: Actor, item: BuyAble) {
        super();
        this.trader = trader;
        this.item = item;
    }

    /**
     * Runs the buy action which purchases the item if there are enough runes in the rune manager
     * @param actor The actor buying the item
     * @param map The map the actor is on
     * @returns a string describing what interactions occurred
     */
    execute(actor: Actor, map: GameMap): string {
        const runeManager = RuneManager.getInstance();
        const validPurchase = runeManager.makePurchase(this.item.getBuyPrice());
        if (validPurchase) {
            this.item.addItem(actor);
            return `${actor} purchased ${this.item.getItemName()} from ${this.trader} for ${this.item.getBuyPrice()} runes.`;
        }
        return "Purchase failed: not enough runes";
    }

    /**
     * Describes which actor is buying what item from what trader for what price
     * @param actor The actor buying the item
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `Purchase ${this.item.getItemName()} from ${this.trader} for ${this.item.getBuyPrice()} runes.`;
    }
}