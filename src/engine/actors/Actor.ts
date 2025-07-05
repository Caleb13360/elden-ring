import { Action } from '../actions/Action.js';
import { ActionList } from '../actions/ActionList.js';
import { CapabilitySet } from '../capabilities/CapabilitySet.js';
import { Capable } from '../capabilities/Capable.js';
import { Display } from '../displays/Display.js';
import { Printable } from '../displays/Printable.js';
import { IntrinsicWeapon } from '../weapons/IntrinsicWeapon.js';
import { Item } from '../items/Item.js';
import { Weapon } from '../weapons/Weapon.js';
import { GameMap } from '../positions/GameMap.js';
import { WeaponItem } from '../weapons/WeaponItem.js';

/**
 * An entity that is alive by having hit points. It also holds inventory that stores items.
 */
export abstract class Actor implements Capable, Printable {
    protected readonly name: string;
    protected hitPoints: number;
    protected maxHitPoints: number;
    private displayChar: string;
    private itemInventory: Item[] = [];
    private capabilitySet: CapabilitySet = new CapabilitySet();
    private weaponInventory: WeaponItem[] = [];

    /**
     * Constructor.
     * @param name the name of the Actor
     * @param displayChar the character that will represent the Actor in the display
     * @param hitPoints the Actor's starting hit points
     */
    constructor(name: string, displayChar: string, hitPoints: number) {
        this.name = name;
        this.displayChar = displayChar;
        this.maxHitPoints = hitPoints;
        this.hitPoints = hitPoints;
    }

    toString(): string {
        return this.name;
    }

    getDisplayChar(): string {
        return this.displayChar;
    }

    /**
     * Replace current display character
     * @param displayChar one character that will be displayed in the terminal/console
     */
    protected setDisplayChar(displayChar: string): void {
        this.displayChar = displayChar;
    }

    /**
     * @return Maximum hit points of this actor
     */
    protected getMaxHp(): number {
        return this.maxHitPoints;
    }

    /**
     * @return (hitpoints and maximum hitpoints)
     */
    protected printHp(): string {
        return `(${this.hitPoints}/${this.maxHitPoints})`;
    }

    /**
     * Add an item to this Actor's inventory.
     * @param item The Item to add.
     */
    addItemToInventory(item: Item): void {
        this.itemInventory.push(item);
    }

    /**
     * Remove an item from this Actor's inventory.
     * @param item The Item to remove.
     */
    removeItemFromInventory(item: Item): void {
        const idx = this.itemInventory.indexOf(item);
        if (idx !== -1) this.itemInventory.splice(idx, 1);
    }

    /**
     * Get a copy of this Actor's inventory list.
     * @return An unmodifiable wrapper of the inventory.
     */
    getItemInventory(): ReadonlyArray<Item> {
        return Object.freeze([...this.itemInventory]);
    }

    /**
     * Add a weapon to this Actor's inventory
     * @param weapon The weapon to be added
     */
    addWeaponToInventory(weapon: WeaponItem): void {
        this.weaponInventory.push(weapon);
    }

    /**
     * Remove a weapon from this Actor's inventory
     * @param weapon The weapon to be removed
     */
    removeWeaponFromInventory(weapon: WeaponItem): void {
        const idx = this.weaponInventory.indexOf(weapon);
        if (idx !== -1) this.weaponInventory.splice(idx, 1);
    }

    /**
     * Get a copy of this Actor's weapon list
     * @return An unmodifiable wrapper of the weapon inventory
     */
    getWeaponInventory(): ReadonlyArray<WeaponItem> {
        return Object.freeze([...this.weaponInventory]);
    }

    /**
     * Select and return an action to perform on the current turn.
     */
    abstract playTurn(
        actions: ActionList,
        lastAction: Action,
        map: GameMap,
        display: Display
    ): Promise<Action>;

    /**
     * Returns a new collection of the Actions that the otherActor can do to the current Actor.
     */
    allowableActions(otherActor: Actor, direction: string, map: GameMap): ActionList {
        return new ActionList();
    }

    /**
     * Is this Actor conscious?
     */
    isConscious(): boolean {
        return this.hitPoints > 0;
    }

    /**
     * Increases maximum hit points and set current hit points to that new maximum hit points.
     */
    increaseMaxHp(points: number): void {
        this.maxHitPoints += points;
        this.hitPoints = this.maxHitPoints;
    }

    /**
     * reset maximum hit points and set current hit points to that new max hit points.
     */
    resetMaxHp(hitPoints: number): void {
        this.maxHitPoints = hitPoints;
        this.hitPoints = hitPoints;
    }

    /**
     * Add points to the current Actor's hitpoint total.
     */
    heal(points: number): void {
        this.hitPoints += points;
        this.hitPoints = Math.min(this.hitPoints, this.maxHitPoints);
    }

    /**
     * Do some damage to the current Actor.
     */
    hurt(points: number): void {
        this.hitPoints -= points;
    }

    /**
     * Creates and returns an intrinsic weapon.
     */
    getIntrinsicWeapon(): IntrinsicWeapon {
        return new IntrinsicWeapon(5, "punches");
    }

    /**
     * Returns true if and only if the current Actor has the required capability.
     */
    hasCapability(capability: any): boolean {
        for (const item of this.itemInventory) {
            if (item.hasCapability(capability)) {
                return true;
            }
        }
        for (const weapon of this.weaponInventory) {
            if (weapon.hasCapability(capability)) {
                return true;
            }
        }
        return this.capabilitySet.hasCapability(capability);
    }

    /**
     * Add a capability to this Actor.
     */
    addCapability(capability: any): void {
        this.capabilitySet.addCapability(capability);
    }

    /**
     * Remove a capability from this Actor.
     */
    removeCapability(capability: any): void {
        this.capabilitySet.removeCapability(capability);
    }

    /**
     * Get unmodifiable capabilities
     */
    capabilitiesList(): ReadonlyArray<any> {
        return this.capabilitySet.capabilitiesList();
    }

    /**
     * Get unmodifiable capabilities by a specific enum type
     */
    findCapabilitiesByType<T>(enumType: any): T[] {
        return this.capabilitySet.findCapabilitiesByType(enumType);
    }
}