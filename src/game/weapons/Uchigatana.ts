import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Location } from './../../engine/positions/Location.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { BuyAble } from './BuyAble.js';
import { SellAble } from './SellAble.js';
import { BuyAction } from '../actions/BuyAction.js';
import { SellAction } from '../actions/SellAction.js';
import { UnsheatheAction } from '../actions/UnsheatheAction.js';
import { Trader } from '../actors/Trader.js';
import { Status } from '../utility/Status.js';
import { Util } from '../utility/Util.js';
import { Club } from './Club.js';

/**
 * Class representing Uchigatana weapon
 * Created by:
 * @author Caleb Smith
 */
export class Uchigatana extends WeaponItem implements BuyAble, SellAble {
    private sellPrice: number = 500;
    private buyPrice: number = 5000;

    /**
     * Constructor for Uchigatana
     */
    constructor() {
        super("Uchigatana", ')', 115, "slashes", 80);
    }

    /**
     * Returns UnsheatheAction as special skill for the Uchigatana
     * @param target actor being attacked
     * @param direction direction of the actor being attacked
     * @return Unsheathe action
     */
    getSkill(target: Actor, direction: string): Action {
        return new UnsheatheAction(target, direction, this);
    }

    /**
     * Clear the actions an item can carry out
     */
    private resetActions(): void {
        const allowableActions = this.getAllowableActions();
        for (const action of allowableActions) {
            this.removeAction(action);
        }
    }

    /**
     * Inform the weapon of the passage of time.
     * Allows the weapon to be sold to nearby traders
     * This method is called once per turn, if the Item is being carried.
     * @param currentLocation The location of the actor carrying this Item.
     * @param actor The actor carrying this Item.
     */
    tick(currentLocation: Location, actor?: Actor): void {
        this.resetActions();
        const traders = Util.getNearbyStatusActor(currentLocation, Status.MERCHENT);
        for (const trader of traders) {
            this.addAction(new SellAction(trader, this));
        }
    }

    addItem(actor: Actor): void {
        actor.addWeaponToInventory(new Club());
    }

    getBuyPrice(): number {
        return this.buyPrice;
    }

    getItemName(): string {
        return this.toString();
    }

    getSellPrice(): number {
        return this.sellPrice;
    }

    removeItem(actor: Actor): void {
        actor.removeWeaponFromInventory(this);
    }
}