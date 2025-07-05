import { Actor } from '../actors/Actor.js';
import { DoNothingAction } from '../actions/DoNothingAction.js';
import { Action } from '../actions/Action.js';
import { ActionList } from '../actions/ActionList.js';
import { ActorLocationsIterator } from '../actors/ActorLocationsIterator.js';
import { Display } from '../displays/Display.js';
import { Item } from '../items/Item.js';
import { WeaponItem } from '../weapons/WeaponItem.js';
import { GameMap } from './GameMap.js';
import { Location } from './Location.js';
import { Exit } from './Exit.js';

/**
 * Class representing the game world, including the locations of all Actors, the player, and the playing grid.
 */
export class World {
    protected display: Display;
    protected gameMaps: GameMap[] = [];
    protected actorLocations: ActorLocationsIterator = new ActorLocationsIterator();
    protected player!: Actor; // We only draw the particular map this actor is on.
    protected lastActionMap: Map<Actor, Action> = new Map();

    /**
     * Constructor.
     * @param display the Display that will display this World.
     */
    constructor(display: Display) {
        if (!display) throw new Error("Display cannot be null");
        this.display = display;
    }

    /**
     * Add a GameMap to the World.
     * @param gameMap the GameMap to add
     */
    addGameMap(gameMap: GameMap): void {
        if (!gameMap) throw new Error("GameMap cannot be null");
        this.gameMaps.push(gameMap);
        gameMap.actorLocations = this.actorLocations;
    }

    /**
     * Set an actor as the player. The map is drawn just before this Actor's turn
     * @param player the player to add
     * @param location the Location where the player is to be added
     */
    addPlayer(player: Actor, location: Location): void {
        this.player = player;
        this.actorLocations.add(player, location.mapRef().at(location.xCoord(), location.yCoord()));
        this.actorLocations.setPlayer(player);
    }

    /**
     * Run the game.
     */
    async run(): Promise<void> {
        if (!this.player) throw new Error("Player does not exist");

        // initialize the last action map to nothing actions;
        for (const actor of this.actorLocations) {
            this.lastActionMap.set(actor, new DoNothingAction());
        }

        // This loop is basically the whole game
        while (this.stillRunning()) {
            const playersMap = this.actorLocations.locationOf(this.player).mapRef();
            playersMap.draw(this.display);

            // Process all the actors.
            for (const actor of this.actorLocations) {
                if (this.stillRunning())
                    await this.processActorTurn(actor);
            }

            // Tick over all the maps. For the map stuff.
            for (const gameMap of this.gameMaps) {
                gameMap.tick();
            }
        }
        this.display.println(this.endGameMessage());
    }

    /**
     * Gives an Actor its turn.
     */
    protected async processActorTurn(actor: Actor): Promise<void> {
        const here = this.actorLocations.locationOf(actor);
        const map = here.mapRef();

        const actions = new ActionList();
        for (const item of actor.getItemInventory()) {
            actions.add([...item.getAllowableActions()]);
            const dropAction = item.getDropAction(actor);
            if (dropAction) actions.add(dropAction);
        }

        for (const weapon of actor.getWeaponInventory()) {
            actions.add([...weapon.getAllowableActions()]);
            const dropAction = weapon.getDropAction(actor);
            if (dropAction) actions.add(dropAction);
        }

        actions.add(here.getGround().allowableActions(actor, here, ""));

        for (const exit of here.getExits()) {
            const destination = exit.getDestination();

            if (this.actorLocations.isAnActorAt(destination)) {
                actions.add(this.actorLocations.getActorAt(destination)!.allowableActions(actor, exit.getName(), map));
            } else {
                actions.add(destination.getGround().allowableActions(actor, destination, exit.getName()));
            }
            const moveAction = destination.getMoveAction(actor, exit.getName(), exit.getHotKey());
            if (moveAction) actions.add(moveAction);
        }

        for (const item of here.getItems()) {
            actions.add([...item.getAllowableActions()]);
            const pickUpAction = item.getPickUpAction(actor);
            if (pickUpAction) actions.add(pickUpAction);
        }
        actions.add(new DoNothingAction());

        const lastAction = this.lastActionMap.get(actor) ?? new DoNothingAction();
        const action = await actor.playTurn(actions, lastAction, map, this.display);
        this.lastActionMap.set(actor, action);

        const result = action.execute(actor, map);
        this.display.println(result);
    }

    /**
     * Returns true if the game is still running.
     */
    protected stillRunning(): boolean {
        return this.actorLocations.contains(this.player);
    }

    /**
     * Return a string that can be displayed when the game ends.
     */
    protected endGameMessage(): string {
        return "Game Over";
    }
}