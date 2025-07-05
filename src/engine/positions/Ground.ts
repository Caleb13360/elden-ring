import { Actor } from '../actors/Actor.js';
import { ActionList } from '../actions/ActionList.js';
import { CapabilitySet } from '../capabilities/CapabilitySet.js';
import { Capable } from '../capabilities/Capable.js';
import { Printable } from '../displays/Printable.js';
import { Location } from './Location.js';

/**
 * Class representing terrain type
 */
export abstract class Ground implements Capable, Printable {
    private readonly capabilitySet = new CapabilitySet();
    private displayChar: string;

    /**
     * Constructor.
     *
     * @param displayChar character to display for this type of terrain
     */
    constructor(displayChar: string) {
        this.displayChar = displayChar;
    }

    getDisplayChar(): string {
        return this.displayChar;
    }
    
    protected setDisplayChar(displayChar: string): void {
        this.displayChar = displayChar;
    }

    /**
     * Returns an empty Action list.
     *
     * @param actor the Actor acting
     * @param location the current Location
     * @param direction the direction of the Ground from the Actor
     * @return a new, empty collection of Actions
     */
    allowableActions(actor: Actor, location: Location, direction: string): ActionList {
        return new ActionList();
    }

    /**
     * Override this to implement impassable terrain, or terrain that is only passable if conditions are met.
     *
     * @param actor the Actor to check
     * @return true
     */
    canActorEnter(actor: Actor): boolean {
        return true;
    }

    /**
     * Ground can also experience the joy of time.
     * @param location The location of the Ground 
     */
    tick(location: Location): void {
        // Default: do nothing
    }

    /**
     * Override this to implement terrain that blocks thrown objects but not movement, or vice versa
     * @return true
     */
    blocksThrownObjects(): boolean {
        return false;
    }

    /**
     * Check whether this Ground type has the given Capability.
     * 
     * @param capability the Capability to check
     * @return true if and only if this Ground has the given capability.
     */
    hasCapability(capability: any): boolean {
        return this.capabilitySet.hasCapability(capability);
    }

    /**
     * Add the given Capability to this Ground.
     * 
     * @param capability the Capability to add
     */
    addCapability(capability: any): void {
        this.capabilitySet.addCapability(capability);
    }

    /**
     * Remove the given Capability from this Ground.
     * 
     * @param capability the Capability to remove.
     */
    removeCapability(capability: any): void {
        this.capabilitySet.removeCapability(capability);
    }

    /**
     * Get unmodifiable capabilities
     *
     * @return a list of unmodifiable capabilities
     */
    capabilitiesList(): ReadonlyArray<any> {
        return this.capabilitySet.capabilitiesList();
    }
}