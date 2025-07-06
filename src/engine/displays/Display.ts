import { Printable } from './Printable.js';
// import { Buffer } from 'buffer';

/**
 * Class that manages I/O for the system
 */
export class Display {
    /**
     * Display a displayable object.
     *
     * @param printable the object to display
     */
    renderMap(printable: Printable[][]): void {
        const container: HTMLElement = document.getElementById('game-map')!;
        container.innerHTML = '';
        
        if (!printable || printable.length === 0) return;
        const rows: number = printable.length;
        const cols: number = printable[0].length;
        
        // Set Tailwind classes for the grid container
        container.className = 'inline-grid gap-0 font-mono text-sm';
        container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        
        // Add cells
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell: HTMLDivElement = document.createElement('div');
                cell.className = 'flex items-center justify-center w-5 h-5 text-green-400';
                
                const displayChar = printable[row][col].getDisplayChar();
                
                // Check if we have an image mapping for this character
                if (imageMap[displayChar]) {
                    const img: HTMLImageElement = document.createElement('img');
                    img.src = 'images/'+imageMap[displayChar];
                    img.alt = displayChar;
                    img.className = 'w-full h-full object-cover';
                    cell.appendChild(img);
                } else {
                    // Fall back to displaying the character as text
                    cell.textContent = displayChar;
                }
                
                container.appendChild(cell);
            }
        }
    }

    
    // Function to render runes as currency
    renderRunes(runeAmount: number): void {
        const runesContainer: HTMLElement = document.getElementById('runes-display')!;
        runesContainer.textContent = `Runes: ${runeAmount}`;
    }


    // Function to render health bar as text
    renderHealthBar(currentHitPoints: number, maxHitPoints: number): void {
        const healthContainer: HTMLElement = document.getElementById('health-display')!;
        
        const healthPercentage = Math.round((currentHitPoints / maxHitPoints) * 100);
        const healthText = `Health: ${currentHitPoints}/${maxHitPoints} (${healthPercentage}%)`;
        
        // Optional: Add visual bar using text characters
        const barLength = 20;
        const filledBars = Math.round((currentHitPoints / maxHitPoints) * barLength);
        const emptyBars = barLength - filledBars;
        const visualBar = '█'.repeat(filledBars) + '░'.repeat(emptyBars);
        
        healthContainer.innerHTML = `
            <div>${healthText}</div>
            <div class="font-mono">[${visualBar}]</div>
        `;
    }
    
    /**
     * Prints a String and then terminates the line.
     * @param s the string to print
     */
    // println(s: string): void {
    //     console.log(s);
    // }
    println(s: string): void {
        // Add timestamp to message
        const timestamp = new Date().toLocaleTimeString();
        const messageWithTime = `[${timestamp}] ${s}`;
        
        // Add to messages array
        gameMessages.push(messageWithTime);
        
        // Keep only the last 20 messages
        if (gameMessages.length > 20) {
            gameMessages.shift(); // Remove the oldest message
        }
        
        // Update the display
        this.renderMessages();
    }

    // Function to render messages in the container
    renderMessages(): void {
        const messagesContainer: HTMLElement = document.getElementById('messages-container')!;
        
        // Clear existing messages
        messagesContainer.innerHTML = '';
        
        // Add each message as a div
        gameMessages.forEach(message => {
            const messageDiv: HTMLDivElement = document.createElement('div');
            messageDiv.className = 'py-1 border-b border-gray-700 last:border-b-0';
            messageDiv.textContent = message;
            messagesContainer.appendChild(messageDiv);
        });
        
        // Auto-scroll to bottom to show latest messages
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Terminates the line.
     */
    endLine(): void {
        console.log('');
    }

    /**
     * Read a char from the keyboard.
     * 
     * @return the first char of the next entered string.
     */
     async readChar(): Promise<string> {
        return new Promise<string>((resolve) => {
            const handleKeydown = (event: KeyboardEvent) => {
                event.preventDefault();
                document.removeEventListener('keydown', handleKeydown);
                resolve(event.key);
            };
            
            document.addEventListener('keydown', handleKeydown, { once: true });
        });
    }
}

let imageMap: Record<string, string> = {
  "_": "dirt.png",
  "#": "stone_wall.png",
  "D": "stone_door.png",
  ".": "grass.png",
};

let gameMessages: string[] = [];