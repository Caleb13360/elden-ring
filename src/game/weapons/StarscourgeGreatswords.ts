import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Location } from './../../engine/positions/Location.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { StarcallerCryAction } from '../actions/StarcallerCryAction.js';
import { SellAction } from '../actions/SellAction.js';
import { Tradeable } from './Tradeable.js';
import { SellAble } from './SellAble.js';
import { Status } from '../utility/Status.js';
import { Util } from '../utility/Util.js';
import { Weapon } from '../../engine/weapons/Weapon.js';

/**
 * Class representing the weapon Starscourge Greatswords used by Radahn
 * Created by: Caleb Smith
 */
export class StarscourgeGreatswords extends WeaponItem implements Tradeable, SellAble {
    private sellPrice: number = 100;

    constructor() {
        super("Starscourge Greatswords", 'V', 129, "slashes", 90);
    }

    /**
     * Returns skill of Starcaller Cry
     * @param target actor being attacked
     * @param direction direction of the actor being attacked
     * @return Starcaller Cry Action using this weapon
     */
    getSkill(target: Actor, direction: string): Action {
        return new StarcallerCryAction(this as WeaponItem as Weapon);
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
        if (actor) {
            const traders = Util.getNearbyStatusActor(currentLocation, Status.MERCHENT);
            for (const trader of traders) {
                this.addAction(new SellAction(trader, this));
            }
        }
    }

    /**
     * resets the actions for the weapon if it ticks on the ground as no actor should be using it unless it is in their inventory
     * @param currentLocation The location of the ground on which we lie.
     */
    tickOnGround(currentLocation: Location): void {
        this.resetActions();
    }

    /**
     * implementation of adding the tradeable to the actors inventory
     * @param traderInActor actor in which tradeable is being added to
     */
    addTradeableToInventory(traderInActor: Actor): void {
        traderInActor.addWeaponToInventory(new StarscourgeGreatswords());
    }

    /**
     * gets the item name
     * @return string of the items name
     */
    getItemName(): string {
        return this.toString();
    }

    /**
     * gets the sell price of the item
     * @return int for items sell price
     */
    getSellPrice(): number {
        return this.sellPrice;
    }

    /**
     * removes item from actor inventory
     * @param actor actor the item is being removed from
     */
    removeItem(actor: Actor): void {
        actor.removeWeaponFromInventory(this);
    }
}