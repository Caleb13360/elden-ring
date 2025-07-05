import { Action } from '../actions/Action.js';
import { ActionList } from '../actions/ActionList.js';
import { Actor } from '../actors/Actor.js';
import { Display } from './Display.js';

/**
 * A menu GUI implementation.
 */
export class Menu {
    /**
     * Display a menu to the user and have them select an option.
     * Ignores more than 52 options. Go on, write a better one.
     *
     * @param actor the Actor representing the player
     * @param actions the Actions that the user can choose from
     * @param display the I/O object that will display the map
     * @return the Action selected by the user
     */
    async showMenu(actor: Actor, actions: ActionList, display: Display): Promise<Action> {
        const freeChars: string[] = [];
        const keyToActionMap: Map<string, Action> = new Map();

        for (let i = 97; i <= 122; i++) { // 'a' to 'z'
            freeChars.push(String.fromCharCode(i));
        }
        for (let i = 65; i <= 90; i++) { // 'A' to 'Z'
            freeChars.push(String.fromCharCode(i));
        }

        // Show the actions with hotkeys first
        for (const action of actions.sorted((a, b) => new SortHotkeysFirst().compare(a, b))) {
            const hotKey = action.hotkey();
            let c: string;
            if (!hotKey || hotKey === "") {
                if (freeChars.length === 0) break; // we've run out of characters to pick from.
                c = freeChars[0];
            } else {
                c = hotKey.charAt(0);
            }
            // Remove the used character from freeChars
            const idx = freeChars.indexOf(c);
            if (idx !== -1) freeChars.splice(idx, 1);
            keyToActionMap.set(c, action);
            display.println(`${c}: ${action.menuDescription(actor)}`);
        }

        let key: string;
        do {
            key = await display.readChar();
        } while (!keyToActionMap.has(key));

        return keyToActionMap.get(key)!;
    }
}

/**
 * Comparator to sort Actions with hotkeys first.
 */
class SortHotkeysFirst {
    compare(a: Action, b: Action): number {
        if (a.hotkey() != null && b.hotkey() == null) return -1;
        if (a.hotkey() == null && b.hotkey() != null) return 1;
        return 0;
    }
}