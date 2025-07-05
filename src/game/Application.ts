import { Display } from './../engine/displays/Display.js';
import { FancyGroundFactory } from './../engine/positions/FancyGroundFactory.js';
import { GameMap } from './../engine/positions/GameMap.js';
import { World } from './../engine/positions/World.js';
import { Player } from './actors/Player.js';
import { Trader } from './actors/Trader.js';
import { GodrickTheGrafted } from './actors/enemies/GodrickTheGrafted.js';
import { StarscourgeRadahn } from './actors/enemies/StarscourgeRadahn.js';
import { Dirt } from './grounds/Dirt.js';
import { Wall } from './grounds/Wall.js';
import { Floor } from './grounds/Floor.js';
import { Cliff } from './grounds/Cliff.js';
import { PuddleOfWater } from './grounds/PuddleOfWater.js';
import { GustOfWind } from './grounds/GustOfWind.js';
import { Graveyard } from './grounds/Graveyard.js';
import { Cage } from './grounds/Cage.js';
import { Barrack } from './grounds/Barrack.js';
import { GoldenFogDoor } from './grounds/GoldenFogDoor.js';
import { SiteOfLostGrace } from './grounds/SiteOfLostGrace.js';

import { FallenHero } from './items/FallenHero.js';
import { GoldenRune } from './items/GoldenRune.js';
import { PlayerClass } from './playerclass/PlayerClass.js';
import { StartingConsole } from './playerclass/StartingConsole.js';
import { ResetManager } from './reset/ResetManager.js';
import { FancyMessage } from './utility/FancyMessage.js';
import { Club } from './weapons/Club.js';
import { Uchigatana } from './weapons/Uchigatana.js';
import { Scimitar } from './weapons/Scimitar.js';
import { GreatKnife } from './weapons/GreatKnife.js';
import { LostGraceManager } from './LostGraceManager.js';
import { Status } from './utility/Status.js';
import { StormveilCastleFactory } from './grounds/StormveilCastleFactory.js';
import { WestFactory } from './grounds/WestFactory.js';
import { EastFactory } from './grounds/EastFactory.js';
import { Grossmesser } from './weapons/Grossmesser.js';

export async function main() {
    // Setting up the world
    const world = new World(new Display());

    // Setting up the map
    const groundFactory = new FancyGroundFactory(
        new Dirt(), new Wall(), new Floor(), new Cliff()
    );

    // LIMGRAVE
    const mapBase = [
        "......................#.............#..........................+++.........",
        "......................#.............#.......................+++++..........",
        "......................#..___....____#.........................+++++........",
        "......................#...........__#............................++........",
        "......................#_____........#.............................+++......",
        "......................#............_#..............................+++.....",
        "......................######...######......................................",
        "...........................................................................",
        "...........................................................................",
        "........++++......................###___###................................",
        "........+++++++...................________#................................",
        "..........+++.....................#________................................",
        "............+++...................#_______#................................",
        ".............+....................###___###................................",
        "............++......................#___#..................................",
        "..............+............................................................",
        "..............++...........................................................",
        "..............................................++...........................",
        "..................++++......................+++...............######..##...",
        "#####___######....++...........................+++............#....____....",
        "_____________#.....++++..........................+..............__.....#...",
        "_____________#.....+....++........................++.........._.....__.#...",
        "_____________#.........+..+.....................+++...........###..__###...",
        "_____________#.............++.............................................."
    ];

    const map = [
        "..nnnn................................................~~~~~................",
        "......................#####....######.................~~~~~................",
        "..nnnn................#..___....____#.................~~~~~................",
        "..................................__#.................~~~~~................",
        "......................._____........#......................................",
        "......................#............_#......................................",
        "......................#...........###......................................",
        "...........................................................................",
        "...........................................................................",
        "..................................###___###................................",
        "..................................________#....nnnn........................",
        "..................................#________................................",
        "~~~~..............................#_______#....nnnn........................",
        "~~~~..............................###___###................................",
        "~~~~................................#___#..................................",
        "...........................................................................",
        "...........................................................................",
        "...........................................................................",
        "..####__##...........................................&&.......######..##...",
        "..#.....__...........................................&&.......#....____....",
        "..#___..............&&..........................................__.....#...",
        "..####__###.........&&........................................_.....__.#...",
        "..............................................................###..__###...",
        "..........................................................................."
    ];

    const limgraveGameMap = new GameMap(groundFactory, mapBase);
    world.addGameMap(limgraveGameMap);

    ResetManager.getInstance().setLastPlayerGrace(limgraveGameMap.at(36, 12));

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const currChar = map[y][x];
            if (currChar === '~') {
                limgraveGameMap.at(x, y).setGround(new PuddleOfWater(x < map[y].length / 2 ? new WestFactory() : new EastFactory()));
            } else if (currChar === '&') {
                limgraveGameMap.at(x, y).setGround(new GustOfWind(x < map[y].length / 2 ? new WestFactory() : new EastFactory()));
            } else if (currChar === 'n') {
                limgraveGameMap.at(x, y).setGround(new Graveyard(x < map[y].length / 2 ? new WestFactory() : new EastFactory()));
            } else if (currChar === '<') {
                limgraveGameMap.at(x, y).setGround(new Cage(new StormveilCastleFactory()));
            } else if (currChar === 'B') {
                limgraveGameMap.at(x, y).setGround(new Barrack(new StormveilCastleFactory()));
            }
        }
    }

    // STORMVEIL CASTLE
    const mapStormveilBase = [
        "...........................................................................",
        "...........................................................................",
        "...........................................................................",
        "##############################################...##########################",
        "............................#................#.............................",
        "............................#................#.............................",
        "...........................................................................",
        "............................#................#.............................",
        "............................#................#.............................",
        "#####################..#############...############.####..#########...#####",
        "...............#++++++++++++#................#++++++++++++#................",
        "...............#++++++++++++.................#++++++++++++#................",
        "...............#++++++++++++..................++++++++++++#................",
        "...............#++++++++++++#................#++++++++++++#................",
        "#####...##########.....#############...#############..#############...#####",
        ".._______..................................................................",
        "_____..._..____............................................................",
        ".........____..............................................................",
        "...._______................................................................",
        "#####....##...###..#####...##########___###############......##.....####...",
        "+++++++++++++++++++++++++++#...................#+++++++++++++++++++++++++++",
        "+++++++++++++++++++++++++++....................#+++++++++++++++++++++++++++",
        "+++++++++++++++++++++++++++#....................+++++++++++++++++++++++++++",
        "+++++++++++++++++++++++++++#...................#+++++++++++++++++++++++++++"
    ];

    const mapStormveil = [
        "...........................................................................",
        "..................<...............<........................................",
        "...........................................................................",
        "##############################################...##########################",
        "............................#................#.......B..............B......",
        ".....B...............B......#................#.............................",
        "...............................<.........<.................................",
        ".....B...............B......#................#.......B..............B......",
        "............................#................#.............................",
        "#####################..#############...############.####..#########...#####",
        "...............#++++++++++++#................#++++++++++++#................",
        "...............#++++++++++++...<.........<...#++++++++++++#................",
        "...............#++++++++++++..................++++++++++++#................",
        "...............#++++++++++++#................#++++++++++++#................",
        "#####...##########.....#############...#############..#############...#####",
        ".._______........................B......B........................B.....B...",
        "_____..._..____....&&........<..............<..............................",
        ".........____......&&......................................................",
        "...._______..................<..............<....................<.....<...",
        "#####....##...###..#####...##########___###############......##.....####...",
        "+++++++++++++++++++++++++++#...................#+++++++++++++++++++++++++++",
        "+++++++++++++++++++++++++++....................#+++++++++++++++++++++++++++",
        "+++++++++++++++++++++++++++#....................+++++++++++++++++++++++++++",
        "+++++++++++++++++++++++++++#...................#+++++++++++++++++++++++++++"
    ];

    const stormveilGameMap = new GameMap(groundFactory, mapStormveilBase);
    world.addGameMap(stormveilGameMap);

    for (let y = 0; y < mapStormveil.length; y++) {
        for (let x = 0; x < mapStormveil[y].length; x++) {
            const currChar = mapStormveil[y][x];
            if (currChar === '<') {
                stormveilGameMap.at(x, y).setGround(new Cage(new StormveilCastleFactory()));
            } else if (currChar === 'B') {
                stormveilGameMap.at(x, y).setGround(new Barrack(new StormveilCastleFactory()));
            } else if (currChar === '&') {
                stormveilGameMap.at(x, y).setGround(new GustOfWind(new WestFactory()));
            }
        }
    }

    // ROUNDTABLE HOLD
    const mapRoundTableBase = [
        "##################",
        "#________________#",
        "#________________#",
        "#________________#",
        "#________________#",
        "#________________#",
        "#________________#",
        "#________________#",
        "#________________#",
        "#________________#",
        "########___#######"
    ];

    const roundTableMap = new GameMap(groundFactory, mapRoundTableBase);
    world.addGameMap(roundTableMap);

    // GODRICK'S BOSS ROOM
    const mapGodricksRoom = [
        "+++++++++++++++++++++++++",
        ".........................",
        ".........................",
        ".........................",
        "_........................",
        ".........................",
        ".........................",
        ".........................",
        "+++++++++++++++++++++++++"
    ];

    const GodricksRoomMap = new GameMap(groundFactory, mapGodricksRoom);
    world.addGameMap(GodricksRoomMap);

    // WAILING DUNES
    const wailingDunes = [
        "........................_.........................",
        "..................................................",
        "..................................................",
        "..................................................",
        "..................................................",
        "..................................................",
        "..................................................",
        "..................................................",
        "..................................................",
        "++....................................._._......++",
        "+++++++...._.._........................._..+++++++",
        "++++++++++++._........................++++++++++++",
        "+++++++++++++++.................._.+++++++++++++++",
        "+++++++++++++++++..............._+++++++++++++++++",
        "+++++++++++++++++........_.......+++++++++++++++++"
    ];
    const wailingDunesGameMap = new GameMap(groundFactory, wailingDunes);
    world.addGameMap(wailingDunesGameMap);

    // scattering golden runes
    limgraveGameMap.at(26, 2).addItem(new GoldenRune());
    limgraveGameMap.at(3, 21).addItem(new GoldenRune());
    limgraveGameMap.at(38, 10).addItem(new GoldenRune());
    limgraveGameMap.at(73, 11).addItem(new GoldenRune());
    limgraveGameMap.at(69, 19).addItem(new GoldenRune());
    stormveilGameMap.at(38, 21).addItem(new GoldenRune());
    stormveilGameMap.at(74, 1).addItem(new GoldenRune());
    stormveilGameMap.at(0, 4).addItem(new GoldenRune());
    stormveilGameMap.at(74, 10).addItem(new GoldenRune());
    stormveilGameMap.at(8, 10).addItem(new GoldenRune());

    // adding traders
    const kale = new Trader("Kale", 'K');
    kale.addBuyAble(new Club());
    kale.addBuyAble(new Uchigatana());
    kale.addBuyAble(new Scimitar());
    kale.addBuyAble(new GreatKnife());
    limgraveGameMap.at(40, 12).addActor(kale);

    const enia = new Trader("Enia", 'E');
    enia.addCapability(Status.FINDER_READER);
    roundTableMap.at(9, 1).addActor(enia);

    // adding bosses
    GodricksRoomMap.at(14, 4).addActor(new GodrickTheGrafted(14, 4));
    wailingDunesGameMap.at(28, 10).addActor(new StarscourgeRadahn(24, 0));

    // adding fallen heroes
    wailingDunesGameMap.at(11, 10).addItem(new FallenHero("Patches", wailingDunesGameMap.at(11, 10), new Grossmesser()));
    wailingDunesGameMap.at(14, 10).addItem(new FallenHero("Okina", wailingDunesGameMap.at(14, 10), new Uchigatana()));
    wailingDunesGameMap.at(13, 11).addItem(new FallenHero("Lionel The Lionhearted", wailingDunesGameMap.at(13, 11), new Scimitar()));
    wailingDunesGameMap.at(39, 9).addItem(new FallenHero("Great Horned Tragoth", wailingDunesGameMap.at(39, 9), new Club()));
    wailingDunesGameMap.at(41, 9).addItem(new FallenHero("Castellan Jerren", wailingDunesGameMap.at(41, 9), new Scimitar()));
    wailingDunesGameMap.at(40, 10).addItem(new FallenHero("Finger Maiden Therolina", wailingDunesGameMap.at(40, 10), new GreatKnife()));
    wailingDunesGameMap.at(33, 12).addItem(new FallenHero("Alexander the Warrior Jar", wailingDunesGameMap.at(33, 12), new Club()));
    wailingDunesGameMap.at(32, 13).addItem(new FallenHero("Blaidd the Half-Wolf", wailingDunesGameMap.at(32, 13), new GreatKnife()));

    // adding map doors
    limgraveGameMap.at(30, 0).setGround(new GoldenFogDoor(stormveilGameMap.at(38, 23), "Stormveil Castle"));
    stormveilGameMap.at(38, 23).setGround(new GoldenFogDoor(limgraveGameMap.at(30, 0), "Limgrave"));
    limgraveGameMap.at(5, 23).setGround(new GoldenFogDoor(roundTableMap.at(9, 10), "Roundtable Hold"));
    roundTableMap.at(9, 10).setGround(new GoldenFogDoor(limgraveGameMap.at(5, 23), "Limgrave"));
    limgraveGameMap.at(69, 21).setGround(new GoldenFogDoor(wailingDunesGameMap.at(25, 14), "Wailing Dunes"));
    stormveilGameMap.at(5, 0).setGround(new GoldenFogDoor(GodricksRoomMap.at(0, 4), "Godrick's Room"));

    // adding lost sites of grace
    const firstSiteOfLostGrace = new SiteOfLostGrace("The First Step");
    limgraveGameMap.at(38, 11).setGround(firstSiteOfLostGrace);
    LostGraceManager.getInstance().addLostGrace(firstSiteOfLostGrace, limgraveGameMap.at(38, 11));
    ResetManager.getInstance().setLastPlayerGrace(limgraveGameMap.at(38, 11));
    roundTableMap.at(9, 5).setGround(new SiteOfLostGrace("Table of Lost Grace"));
    stormveilGameMap.at(38, 20).setGround(new SiteOfLostGrace("Stormveil Main Gate"));

    // setting up the player
    const playerClass = await StartingConsole.getStartingClass();
    const player = new Player("Tarnished", '@', playerClass);
    world.addPlayer(player, limgraveGameMap.at(36, 10));

    // BEHOLD, ELDEN RING
    FancyMessage.fancyPrint(FancyMessage.ELDEN_RING);

    // running the world
    await world.run();
}

// Entry point
// main();