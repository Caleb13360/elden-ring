import { Display } from './../../engine/displays/Display.js';
import { PlayerClass } from './PlayerClass.js';
import { Samurai } from './Samurai.js';
import { Bandit } from './Bandit.js';
import { Wretch } from './Wretch.js';

/**
 * A console used to get the user input to select what class the player will start as
 * Created by: Caleb Smith
 */
export class StartingConsole {
    /**
     * A display instance
     */
    private static display = new Display();

    /**
     * Gets the player class based on user input
     * @return selected player class
     */
    public static async getStartingClass(): Promise<PlayerClass> {
        this.display.println("Select your starting class:");
        this.display.println("1. Samurai");
        this.display.println("2. Bandit");
        this.display.println("3. Wretch");

        const choice = await this.readIntInRange(1, 3);

        switch (choice) {
            case 1:
                return new Samurai();
            case 2:
                return new Bandit();
            case 3:
                return new Wretch();
            default:
                throw new Error("Invalid starting class choice");
        }
    }

    /**
     * Gets an input based on a given int range, tries again until a valid int is given
     * @param min minimum value in range
     * @param max maximum value in range
     * @return int value from user within given range
     */
    private static async readIntInRange(min: number, max: number): Promise<number> {
        let choice: number;
        while (true) {
            try {
                const input = await this.display.readChar();
                choice = parseInt(input, 10);
                if (isNaN(choice)) {
                    this.display.println("Please enter a valid number");
                } else if (choice < min || choice > max) {
                    this.display.println(`Please enter a number between ${min} and ${max}`);
                } else {
                    return choice;
                }
            } catch (e) {
                this.display.println("Please enter a valid number");
            }
        }
    }
}