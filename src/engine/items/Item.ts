import { Actor } from '../actors/Actor.js';
import { Action } from '../actions/Action.js';
import { ActionList } from '../actions/ActionList.js';
import { CapabilitySet } from '../capabilities/CapabilitySet.js';
import { Capable } from '../capabilities/Capable.js';
import { Printable } from '../displays/Printable.js';
import { Location } from '../positions/Location.js';
import { PickUpAction } from './PickUpAction.js';
import { PickUpItemAction } from './PickUpItemAction.js';
import { DropAction } from './DropAction.js';
import { DropItemAction } from './DropItemAction.js';

/**
 * Abstract base class representing a physical object in the game world.
 */
export abstract class Item implements Printable, Capable {
    private readonly name: string;
    private displayChar: string;
    protected portable: boolean;
    private allowableActions: ActionList;
    private readonly capabilitySet = new CapabilitySet();

    /**
     * Constructor.
     * @param name the name of this Item
     * @param displayChar the character to use to represent this item if it is on the ground
     * @param portable true if and only if the Item can be picked up
     */
    constructor(name: string, displayChar: string, portable: boolean) {
        this.name = name;
        this.displayChar = displayChar;
        this.portable = portable;
        this.allowableActions = new ActionList();
    }

    /**
     * Inform a carried Item of the passage of time.
     * This method is called once per turn, if the Item is being carried.
     * @param currentLocation The location of the actor carrying this Item.
     * @param actor The actor carrying this Item.
     */
    tick(currentLocation: Location, actor?: Actor): void {
        // Default: do nothing
    }

    /**
     * Inform an Item on the ground of the passage of time.
     * This method is called once per turn, if the item rests upon the ground.
     * @param currentLocation The location of the ground on which we lie.
     */
    tickOnGround(currentLocation: Location): void {
        // Default: do nothing
    }

    toString(): string {
        return this.name;
    }

    getDisplayChar(): string {
        return this.displayChar;
    }

    protected setDisplayChar(displayChar: string): void {
        this.displayChar = displayChar;
    }

    /**
     * Create and return an action to pick this Item up.
     * If this Item is not portable, returns null.
     * @return a new PickUpItemAction if this Item is portable, null otherwise.
     */
    getPickUpAction(actor: Actor): PickUpAction | null {
        if (this.portable) {}
            return new PickUpItemAction(this);
        return null;
    }

    /**
     * Create and return an action to drop this Item.
     * If this Item is not portable, returns null.
     * @return a new DropItemAction if this Item is portable, null otherwise.
     */
    getDropAction(actor: Actor): DropAction | null {
        if (this.portable)
            return new DropItemAction(this);
        return null;
    }

    togglePortability(): void {
        this.portable = !this.portable;
    }

    /**
     * Returns an unmodifiable copy of the actions list so that calling methods won't
     * be able to change what this Item can do without the Item checking.
     * @return an unmodifiable list of Actions
     */
    getAllowableActions(): ReadonlyArray<Action> {
        return this.allowableActions.getUnmodifiableActionList();
    }

    /**
     * Allow subclasses to add an action.
     * @param action a new action to be added to the actions list.
     */
    protected addAction(action: Action): void {
        if (action == null) {
            throw new Error("Unable to add a null action!");
        }
        this.allowableActions.add(action);
    }

    /**
     * Allow subclasses to remove an action.
     * @param action a new action to be removed from the actions list.
     */
    protected removeAction(action: Action): void {
        if (action == null) {
            throw new Error("Unable to add a null action!");
        }
        this.allowableActions.remove(action);
    }

    /**
     * Does this Item have the given Capability?
     * @return true if and only if this Item has the given Capability
     */
    hasCapability(capability: any): boolean {
        return this.capabilitySet.hasCapability(capability);
    }

    /**
     * Add a Capability to this Item.
     * @param capability the Capability to add
     */
    addCapability(capability: any): void {
        this.capabilitySet.addCapability(capability);
    }

    /**
     * Remove a Capability from this Item.
     * @param capability the Capability to remove
     */
    removeCapability(capability: any): void {
        this.capabilitySet.removeCapability(capability);
    }

    /**
     * Get unmodifiable capabilities
     * @return a list of unmodifiable capabilities
     */
    capabilitiesList(): ReadonlyArray<any> {
        return this.capabilitySet.capabilitiesList();
    }
}