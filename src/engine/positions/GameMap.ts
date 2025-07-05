import { Actor } from '../actors/Actor.js';
import { ActorLocationsIterator } from '../actors/ActorLocationsIterator.js';
import { Display } from '../displays/Display.js';
import { Item } from '../items/Item.js';
import { WeaponItem } from '../weapons/WeaponItem.js';
import { NumberRange } from './NumberRange.js';
import { Location } from './Location.js';
import { GroundFactory } from './GroundFactory.js';
import { Exit } from './Exit.js';
import { Printable } from '../displays/Printable.js';
// import * as fs from 'fs';

/**
 * Class representing one map within the system.
 */
export class GameMap {
    protected heights!: NumberRange;
    protected widths!: NumberRange;
    protected map!: Location[][];
    public actorLocations!: ActorLocationsIterator;
    protected groundFactory!: GroundFactory;

    /**
     * Constructor.
     */
    constructor(groundFactory: GroundFactory, groundChar: string, width: number, height: number);
    constructor(groundFactory: GroundFactory, lines: string[]);
    constructor(groundFactory: GroundFactory, mapFile: string);
    constructor(groundFactory: GroundFactory, arg2: any, arg3?: number, arg4?: number) {
        if (typeof arg2 === 'string' && typeof arg3 === 'number' && typeof arg4 === 'number') {
            // (groundFactory, groundChar, width, height)
            if (!groundFactory || !arg2 || arg3 <= 0 || arg4 <= 0) throw new Error('Invalid arguments');
            this.groundFactory = groundFactory;
            this.initMap(arg3, arg4);
            for (const x of this.widths) {
                for (const y of this.heights) {
                    this.at(x, y).setGround(groundFactory.newGround(arg2));
                }
            }
        } else if (Array.isArray(arg2)) {
            // (groundFactory, lines)
            if (!groundFactory || !arg2) throw new Error('Invalid arguments');
            this.groundFactory = groundFactory;
            this.createMapFromStrings(groundFactory, arg2);
        } else if (typeof arg2 === 'string') {
            // (groundFactory, mapFile)
            // Synchronous file reading for simplicity; replace with async if needed
            // const lines = fs.readFileSync(arg2, 'utf-8').split(/\r?\n/);
            // this.groundFactory = groundFactory;
            // this.createMapFromStrings(groundFactory, lines);
            console.log('AHHH FUCK, I thought we no need this');
        } else {
            throw new Error('Invalid constructor arguments for GameMap');
        }
    }

    /**
     * Create a map from a sequence of ASCII strings.
     */
    private createMapFromStrings(groundFactory: GroundFactory, lines: string[]): void {
        const width = lines[0].length;
        const height = lines.length;
        this.initMap(width, height);
        for (const x of this.widths) {
            for (const y of this.heights) {
                const groundChar = lines[y][x];
                this.at(x, y).setGround(groundFactory.newGround(groundChar));
            }
        }
    }

    /**
     * Initialize the map.
     */
    protected initMap(width: number, height: number): void {
        this.widths = new NumberRange(0, width);
        this.heights = new NumberRange(0, height);
        this.map = Array.from({ length: width }, (_, x) =>
            Array.from({ length: height }, (_, y) => this.makeNewLocation(x, y))
        );
        for (const x of this.widths) {
            for (const y of this.heights) {
                const here = this.at(x, y);
                this.addExitFromHere(here, x, y - 1, "North", "8");
                this.addExitFromHere(here, x + 1, y - 1, "North-East", "9");
                this.addExitFromHere(here, x + 1, y, "East", "6");
                this.addExitFromHere(here, x + 1, y + 1, "South-East", "3");
                this.addExitFromHere(here, x, y + 1, "South", "2");
                this.addExitFromHere(here, x - 1, y + 1, "South-West", "1");
                this.addExitFromHere(here, x - 1, y, "West", "4");
                this.addExitFromHere(here, x - 1, y - 1, "North-West", "7");
            }
        }
    }

    /**
     * Builder method for making Exits.
     */
    protected addExitFromHere(here: Location, x: number, y: number, name: string, hotKey: string): void {
        if (this.widths.contains(x) && this.heights.contains(y)) {
            here.addExit(new Exit(name, this.at(x, y), hotKey));
        }
    }

    /**
     * Creates a new Location.
     */
    protected makeNewLocation(x: number, y: number): Location {
        return new Location(this, x, y);
    }

    /**
     * Display the current GameMap.
     */
    public draw(display: Display): void {
        const mapValues: Printable[][] = [];
        for (const y of this.heights) {
            const buffer: Printable[] = [];
            for (const x of this.widths) {
                buffer.push(this.at(x, y));
            }
            mapValues.push(buffer);
        }
        display.renderMap(mapValues);
    }

    /**
     * Returns the Location at these coordinates.
     */
    public at(x: number, y: number): Location {
        return this.map[x][y];
    }

    /**
     * Set the Ground type in a rectangle
     */
    public add(groundChar: string, xs: NumberRange, ys: NumberRange): void {
        for (const x of xs) {
            for (const y of ys) {
                this.at(x, y).setGround(this.groundFactory.newGround(groundChar));
            }
        }
    }

    /**
     * Returns an enumerable NumberRange representing the valid X values of the game map.
     */
    public getXRange(): NumberRange {
        return this.widths;
    }

    /**
     * Returns an enumerable NumberRange representing the valid Y values of the game map.
     */
    public getYRange(): NumberRange {
        return this.heights;
    }

    /**
     * Called once per turn, so that maps can experience the passage of time.
     */
    public tick(): void {
        // Tick over all the items in inventories.
        for (const actor of this.actorLocations) {
            if (this.contains(actor)) {
                for (const item of [...actor.getItemInventory()]) {
                    item.tick(this.actorLocations.locationOf(actor), actor);
                }
                for (const weapon of [...actor.getWeaponInventory()]) {
                    weapon.tick(this.actorLocations.locationOf(actor), actor);
                }
            }
        }
        for (const y of this.heights) {
            for (const x of this.widths) {
                this.at(x, y).tick();
            }
        }
    }

    /**
     * Returns a reference to the Actor at the given location, if there is one.
     */
    public getActorAt(location: Location): Actor | null {
        return this.actorLocations.getActorAt(location);
    }

    /**
     * Add a new Actor at the given Location.
     */
    public addActor(actor: Actor, location: Location): void {
        if (!actor) throw new Error('Actor cannot be null');
        this.actorLocations.add(actor, location);
    }

    /**
     * Remove an Actor from the system.
     */
    public removeActor(actor: Actor): void {
        if (!actor) throw new Error('Actor cannot be null');
        this.actorLocations.remove(actor);
    }

    /**
     * Move an existing Actor to a new Location.
     */
    public moveActor(actor: Actor, newLocation: Location): void {
        if (!actor) throw new Error('Actor cannot be null');
        this.actorLocations.move(actor, newLocation);
    }

    /**
     * Return a reference to the Location containing the given Actor.
     */
    public locationOf(actor: Actor): Location {
        return this.actorLocations.locationOf(actor);
    }

    /**
     * Is there an Actor at the given Location?
     */
    public isAnActorAt(location: Location): boolean {
        return this.actorLocations.isAnActorAt(location);
    }

    /**
     * Is the given Actor on this GameMap?
     */
    public contains(actor: Actor): boolean {
        return this.actorLocations.contains(actor) && this.actorLocations.locationOf(actor).mapRef() === this;
    }

    public hashCode(): number {
        // Use a unique property or generate a unique number for each GameMap
        // Example: use a static counter
        if (!(this as any)._hashCode) {
            (this as any)._hashCode = Math.floor(Math.random() * 1e9);
        }
        return (this as any)._hashCode;
    }
}