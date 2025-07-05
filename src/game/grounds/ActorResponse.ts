import { Action } from './../../engine/actions/Action.js';

/**
 * Interface for grounds that react to actor presence
 */
export interface ActorResponse {
    /**
     * Method which returns action actor is subject to while on Ground
     * @return Action to be performed on the actor
     */
    affectActor(): Action;
}