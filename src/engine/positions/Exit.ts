import { Location } from './Location.js';

/**
 * Class that represents a route from one Location to another.
 */
export class Exit {
    private name: string;
    private destination: Location;
    private hotKey: string;

    /**
     * @param name name of the exit
     * @param destination Location of the endpoint of the exit
     * @param hotKey key to use in the menu to represent the Action to go to this Location
     */
    constructor(name: string, destination: Location, hotKey: string) {
        this.name = name;
        this.destination = destination;
        this.hotKey = hotKey;
    }

    /**
     * The name of the exit. Might be a direction, or the name of the destination. e.g. "North", or "to Mars".
     * @return the name of the exit
     */
    getName(): string {
        return this.name;
    }

    /**
     * Where you go if you take this exit.
     * @return the other side of the exit
     */
    getDestination(): Location {
        return this.destination;
    }

    /**
     * The preferred hotkey to use for a MoveAction. Lets the game always use the same keys for movement, and makes marking so much easier. 
     * @return the hotkey
     */
    getHotKey(): string {
        return this.hotKey;
    }
}