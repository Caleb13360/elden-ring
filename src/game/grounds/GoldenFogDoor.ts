import { ActionList } from './../../engine/actions/ActionList.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Ground } from './../../engine/positions/Ground.js';
import { Location } from './../../engine/positions/Location.js';
import { EnterAction } from '../actions/EnterAction.js';
import { Status } from '../utility/Status.js';
import { Enterable } from './Enterable.js';

/**
 * Class representing Golden Fog Door used to travel to other maps
 */
export class GoldenFogDoor extends Ground implements Enterable {
    /**
     * Destination of the door
     */
    private destination: Location;
    /**
     * Name of the destination
     */
    private destinationName: string;

    /**
     * Constructor for the golden fog door
     * @param destination Destination of the door
     * @param destinationName Name of the destination
     */
    constructor(destination: Location, destinationName: string) {
        super('D');
        this.destination = destination;
        this.destinationName = destinationName;
    }

    allowableActions(actor: Actor, location: Location, direction: string): ActionList {
        const actionList = new ActionList();
        if (actor.hasCapability(Status.HOSTILE_TO_ENEMY)) {
            actionList.add(new EnterAction(this));
        }
        return actionList;
    }

    getDestination(): Location {
        return this.destination;
    }

    getDestinationName(): string {
        return this.destinationName;
    }
}