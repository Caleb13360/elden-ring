import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Item } from './../../engine/items/Item.js';
import { Location } from './../../engine/positions/Location.js';
import { SellAction } from '../actions/SellAction.js';
import { TradeRememberanceAction } from '../actions/TradeRememberanceAction.js';
import { Status } from '../utility/Status.js';
import { Util } from '../utility/Util.js';
import { SellAble } from '../weapons/SellAble.js';
import { Tradeable } from '../weapons/Tradeable.js';

/**
 * Remembrance that is dropped by bosses, valuable and can be traded with finger readers for that boss's weapons
 * Created by: Caleb Smith
 */
export class Remembrance extends Item implements SellAble {
    /**
     * List of tradables that the remembrance can be traded for
     */
    private tradeables: Tradeable[] = [];
    /**
     * Amount of runes it can be sold for
     */
    private sellPrice: number;

    /**
     * Remembrance constructor
     * @param name name of remembrance
     * @param sellPrice sell price of remembrance
     */
    constructor(name: string, sellPrice: number) {
        super(name, 'O', true);
        this.sellPrice = sellPrice;
    }

    /**
     * Used to clear the allowable actions before next turn
     */
    private resetActions(): void {
        const allowableActions = this.getAllowableActions();
        for (const action of allowableActions) {
            this.removeAction(action);
        }
    }

    /**
     * Add the tradeable to be traded in by this remembrance
     * @param tradeable item the remembrance can be traded for
     */
    public addTradeable(tradeable: Tradeable): void {
        this.tradeables.push(tradeable);
    }

    /**
     * Allows the remembrance to find any nearby merchants or finger readers to sell/trade to
     * @param currentLocation The location of the actor carrying this Item.
     * @param actor The actor carrying this Item.
     */
    tick(currentLocation: Location, actor?: Actor): void {
        this.resetActions();
        const traders = Util.getNearbyStatusActor(currentLocation, Status.MERCHENT);
        for (const trader of traders) {
            this.addAction(new SellAction(trader, this));
        }
        const fingerReaders = Util.getNearbyStatusActor(currentLocation, Status.FINDER_READER);
        for (const fingerReader of fingerReaders) {
            for (const tradeable of this.tradeables) {
                this.addAction(new TradeRememberanceAction(fingerReader, this, tradeable));
            }
        }
    }

    /**
     * Gets the name of the remembrance
     * @return name of remembrance
     */
    getItemName(): string {
        return this.toString();
    }

    /**
     * Gets the sell price of the remembrance
     * @return sell price of remembrance
     */
    getSellPrice(): number {
        return this.sellPrice;
    }

    /**
     * Removes this item from the inventory of an actor
     * @param actor the actor holding the remembrance
     */
    removeItem(actor: Actor): void {
        actor.removeItemFromInventory(this);
    }
}