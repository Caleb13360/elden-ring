/**
 * An interface for representing a collection of any kind of capability (usually enums).
 * A practical alternative to type introspection and other problems.
 */
export interface Capable {
    /**
     * Check if this instance has capability
     * @param capability enum value or string
     * @return true if it has the capability, false otherwise
     */
    hasCapability(capability: any): boolean;

    /**
     * Attach capability/status to the instance
     * @param capability enum value or string
     */
    addCapability(capability: any): void;

    /**
     * Detach capability/status from the instance
     * @param capability enum value or string
     */
    removeCapability(capability: any): void;

    /**
     * @return unmodifiable list of capabilities
     */
    capabilitiesList(): ReadonlyArray<any>;
}