import { Capable } from './Capable.js';

/**
 * A collection of Capability objects.
 * Any string, symbol, or enum value can be used as a capability.
 */
export class CapabilitySet implements Capable {
    /**
     * The set of capabilities (uniques only)
     */
    private capabilitySet: Set<any> = new Set();

    /**
     * Checks whether the current set has the input capability
     *
     * @param capability the capability to be checked against the set
     * @return boolean, whether the capability is found in the set
     */
    hasCapability(capability: any): boolean {
        return this.capabilitySet.has(capability);
    }

    /**
     * Adds a capability to the current set
     *
     * @param capability the capability to be added to the set
     */
    addCapability(capability: any): void {
        if (!this.hasCapability(capability)) {
            this.capabilitySet.add(capability);
        }
    }

    /**
     * Removes a capability from the current set
     *
     * @param capability the capability to be removed from the set
     */
    removeCapability(capability: any): void {
        if (this.hasCapability(capability)) {
            this.capabilitySet.delete(capability);
        }
    }

    /**
     * Converts the current set to a readonly array
     *
     * @return an unmodifiable list of capabilities found in the current set
     */
    capabilitiesList(): ReadonlyArray<any> {
        return Object.freeze(Array.from(this.capabilitySet));
    }

    /**
     * Returns a list of capabilities with a specific type, e.g. we can search for capabilities with type Status
     *
     * @param enumType the constructor function of the enum or class to filter by
     * @return a list of capabilities with the input type
     */
    findCapabilitiesByType<T>(enumType: { new (...args: any[]): T } | Object): T[] {
        return Array.from(this.capabilitySet).filter(
            c => c && c.constructor === enumType
        ) as T[];
    }
}