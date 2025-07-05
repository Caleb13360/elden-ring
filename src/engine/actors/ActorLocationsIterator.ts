import { Actor } from './Actor.js';
import { Location } from '../positions/Location.js';

/**
 * Represents a bimap of locations and actors. Enforces the one actor per location rule.
 * Has an iterator that lets us modify the collection while iterating it.
 */
export class ActorLocationsIterator implements Iterable<Actor> {
    private locationToActor: Map<Location, Actor> = new Map();
    private actorToLocation: Map<Actor, Location> = new Map();
    private player?: Actor;

    /**
     * Adds an Actor and identifies it as the player.
     * The player always gets to go first in any turn.
     */
    setPlayer(player: Actor): void {
        this.player = player;
    }

    /**
     * Add a new Actor at the given Location.
     * @throws Error if the Actor is already placed or there is already an Actor at the target Location
     */
    add(actor: Actor, location: Location): void {
        if (this.actorToLocation.has(actor)) throw new Error('Actor already placed');
        if (this.locationToActor.has(location)) throw new Error('Location already occupied');
        this.actorToLocation.set(actor, location);
        this.locationToActor.set(location, actor);
    }

    /**
     * Remove an Actor from the system.
     */
    remove(actor: Actor): void {
        const location = this.actorToLocation.get(actor);
        this.actorToLocation.delete(actor);
        if (location) this.locationToActor.delete(location);
    }

    /**
     * Moves an existing Actor to a new Location.
     * @throws Error if another Actor is already at that Location
     */
    move(actor: Actor, newLocation: Location): void {
        if (this.isAnActorAt(newLocation)) throw new Error("Can't move to another actor");
        const oldLocation = this.actorToLocation.get(actor);
        this.actorToLocation.set(actor, newLocation);
        if (oldLocation) this.locationToActor.delete(oldLocation);
        this.locationToActor.set(newLocation, actor);
    }

    /**
     * Returns true if actor exists in the system.
     */
    contains(actor: Actor): boolean {
        return this.actorToLocation.has(actor);
    }

    /**
     * Returns true if an Actor is at the given Location.
     */
    isAnActorAt(location: Location): boolean {
        return this.locationToActor.has(location);
    }

    /**
     * Returns a reference to the Actor at the given location, if there is one.
     */
    getActorAt(location: Location): Actor | null {
        return this.locationToActor.get(location) ?? null;
    }

    /**
     * Returns a reference to the Location containing the given Actor.
     */
    locationOf(actor: Actor): Location {
        return this.actorToLocation.get(actor)!;
    }

    /**
     * Iterator for all Actors in the system, player first.
     */
    [Symbol.iterator](): Iterator<Actor> {
        const actorLocations = this.actorToLocation;
        const actors: Actor[] = Array.from(actorLocations.keys());
        // Make sure the player is first.
        if (this.player && actors.includes(this.player)) {
            actors.splice(actors.indexOf(this.player), 1);
            actors.unshift(this.player);
        }
        return {
            next: (): IteratorResult<Actor> => {
                while (actors.length > 0) {
                    const actor = actors.shift()!;
                    if (actorLocations.has(actor)) {
                        return { value: actor, done: false };
                    }
                }
                return { value: undefined as any, done: true };
            }
        };
    }
}