import { Location } from './../../engine/positions/Location.js';

/**
 * Interface for grounds that can be entered and lead to another location.
 */
export interface Enterable {
    /**
     * Getter for the destination
     * @return Location where the actor will end up
     */
    getDestination(): Location;

    /**
     * Getter for the destination name
     * @return String representing the destination name
     */
    getDestinationName(): string;
}