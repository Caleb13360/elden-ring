import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Remembrance } from '../items/Remembrance.js';
import { Tradeable } from '../weapons/Tradeable.js';

/**
 * An Action to trade a remembrance for a tradeable
 * Created by: Caleb Smith
 */
export class TradeRememberanceAction extends Action {
    /**
     * Trader completing transaction
     */
    private trader: Actor;
    /**
     * Remembrance being traded in
     */
    private tradeIn: Remembrance;
    /**
     * Tradeable being traded for
     */
    private tradeFor: Tradeable;

    /**
     * Constructor for the trade remembrance action
     * @param trader trader completing transaction
     * @param tradeIn remembrance being traded in
     * @param tradeFor tradeable being traded for
     */
    constructor(trader: Actor, tradeIn: Remembrance, tradeFor: Tradeable) {
        super();
        this.trader = trader;
        this.tradeIn = tradeIn;
        this.tradeFor = tradeFor;
    }

    /**
     * Remove the remembrance and add the tradeable
     * @param actorTrading The actor trading
     * @param map The map the actor is on.
     * @returns a string description of the trade
     */
    execute(actorTrading: Actor, map: GameMap): string {
        actorTrading.removeItemFromInventory(this.tradeIn);
        this.tradeFor.addTradeableToInventory(actorTrading);
        return `${actorTrading} traded ${this.tradeIn} to ${this.trader} for ${this.tradeFor}`;
    }

    /**
     * Describes which actor is trading what with who
     * @param actorTrading The actor completing the trade
     * @returns a description used for the menu UI
     */
    menuDescription(actorTrading: Actor): string {
        return `${actorTrading} trades ${this.tradeIn} to ${this.trader} for ${this.tradeFor}`;
    }
}