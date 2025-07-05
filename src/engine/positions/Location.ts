import { Actor } from '../actors/Actor.js';
import { MoveActorAction } from '../actions/MoveActorAction.js';
import { Printable } from '../displays/Printable.js';
import { Item } from '../items/Item.js';
import { GameMap } from './GameMap.js';
import { Ground } from './Ground.js';
import { Exit } from './Exit.js';

/**
 * Class representing a location in the game map.  This includes keeping track of exits,
 * character representation, terrain type, and other game data.
 */
export class Location implements Printable {
    private map: GameMap;
    private x: number;
    private y: number;

    private items: Item[] = [];
    private ground!: Ground;
    private exits: Exit[] = [];

    /**
     * Constructor.
     *
     * Locations know which map they are part of, and where.
     *
     * @param map the map that contains this location
     * @param x x coordinate of this location within the map
     * @param y y coordinate of this location within the map
     */
    constructor(map: GameMap, x: number, y: number) {
        this.map = map;
        this.x = x;
        this.y = y;
    }

    /**
     * Accessor for the Location's map.
     */
    mapRef(): GameMap {
        return this.map;
    }

    /**
     * Accessor for the x coordinate.
     */
    xCoord(): number {
        return this.x;
    }

    /**
     * Accessor for the y coordinate.
     */
    yCoord(): number {
        return this.y;
    }

    /**
     * Returns a list of items at this location.
     */
    getItems(): ReadonlyArray<Item> {
        return Object.freeze([...this.items]);
    }

    /** Add an item to this location. */
    addItem(item: Item): void {
        if (!item) throw new Error("Item cannot be null");
        this.items.push(item);
    }

    /**
     * Remove an item from this location, if it is here.
     */
    removeItem(item: Item): void {
        if (!item) throw new Error("Item cannot be null");
        const idx = this.items.indexOf(item);
        if (idx !== -1) this.items.splice(idx, 1);
    }

    /**
     * Accessor for the ground at this location.
     */
    getGround(): Ground {
        return this.ground;
    }

    /**
     * Set the Ground type at the given Location
     */
    setGround(ground: Ground): void {
        this.ground = ground;
    }

    /**
     * Called once per turn, so that Locations can experience the passage time.
     */
    tick(): void {
        this.ground.tick(this);
        for (const item of [...this.items]) {
            item.tick(this);
        }
    }

    /**
     * Accessor to determine whether there is an Actor at this location.
     */
    containsAnActor(): boolean {
        return this.map.isAnActorAt(this);
    }

    /**
     * Accessor to retrieve the Actor at this location.
     */
    getActor(): Actor {
        return this.map.getActorAt(this)!;
    }

    /**
     * Add an Actor to the Location.
     */
    addActor(actor: Actor): void {
        if (!actor) throw new Error("Actor cannot be null");
        this.map.addActor(actor, this);
    }

    /**
     * Returns a MoveActorAction that will move actor to location if the terrain type allows.
     */
    getMoveAction(actor: Actor, direction: string, hotKey: string): MoveActorAction | null {
        if (this.canActorEnter(actor))
            return new MoveActorAction(this, direction, hotKey);
        return null;
    }

    /**
     * Returns true if an Actor can enter this location.
     */
    canActorEnter(actor: Actor): boolean {
        return !this.map.isAnActorAt(this) && this.ground.canActorEnter(actor);
    }

    /**
     * Returns the character to display for this location.
     */
    getDisplayChar(): string {
        let thing: Printable;
        if (this.containsAnActor())
            thing = this.getActor();
        else if (this.items.length > 0)
            thing = this.items[this.items.length - 1];
        else
            thing = this.ground;
        return thing.getDisplayChar();
    }

    /**
     * Compare two Locations for equality.
     */
    equals(obj: any): boolean {
        if (obj == null) return false;
        if (!(obj instanceof Location)) return false;
        if (obj === this) return true;
        return this.map === obj.map && this.yCoord() === obj.yCoord() && this.xCoord() === obj.xCoord();
    }

    /**
     * Computes a hash for the current Location.
     */
    hashCode(): number {
        // Simple hash combining map, y, and x
        return (this.map.hashCode?.() ?? 0) ^ (this.yCoord() << 16) ^ this.xCoord();
    }

    /**
     * Returns an unmodifiable list of exits.
     */
    getExits(): ReadonlyArray<Exit> {
        return Object.freeze([...this.exits]);
    }

    /**
     * Add an exit to this Location.
     */
    addExit(exit: Exit): void {
        this.exits.push(exit);
    }

    /**
     * Remove an exit from this Location.
     */
    removeExit(exit: Exit): void {
        const idx = this.exits.indexOf(exit);
        if (idx !== -1) this.exits.splice(idx, 1);
    }
}