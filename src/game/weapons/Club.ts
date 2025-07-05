import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Location } from './../../engine/positions/Location.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { BuyAction } from '../actions/BuyAction.js';
import { SellAction } from '../actions/SellAction.js';
import { Status } from '../utility/Status.js';
import { Util } from '../utility/Util.js';
import { BuyAble } from './BuyAble.js';
import { SellAble } from './SellAble.js';

/**
 * A simple weapon that can be used to attack the enemy.
 * It deals 103 damage with 80% hit rate
 * Created by: Adrian Kristanto
 * Modified by: Caleb Smith, Rvinder Sandhu
 */
export class Club extends WeaponItem implements BuyAble, SellAble {
    private sellPrice: number = 100;
    private buyPrice: number = 600;

    constructor() {
        super("Club", '!', 103, "bonks", 80);
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