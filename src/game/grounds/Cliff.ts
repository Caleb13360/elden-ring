import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Ground } from './../../engine/positions/Ground.js';
import { Location } from './../../engine/positions/Location.js';
import { FallAction } from '../actions/FallAction.js';
import { Status } from '../utility/Status.js';

/**
 * Interface for grounds that can affect actors
 */
export interface ActorResponse {
    affectActor(): Action;
}

/**
 * Class representing Cliff ground type
 */
export class Cliff extends Ground implements ActorResponse {
    /**
     * Constructor for Cliff ground type
     */
    constructor() {
        super('+');
    }

    tick(location: Location): void {
        super.tick(location);
        if (location.getActor() != null) {
            this.affectActor().execute(location.getActor(), location.mapRef());
        }
    }

    canActorEnter(actor: Actor): boolean {
        return actor.hasCapability(Status.HOSTILE_TO_ENEMY);
    }

    affectActor(): Action {
        return new FallAction();
    }
}