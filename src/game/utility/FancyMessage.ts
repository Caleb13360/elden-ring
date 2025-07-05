import { Display } from './../../engine/displays/Display.js';

/**
 * Fancy messages used to print the game title
 * Font obtained from: https://patorjk.com/software/taag/#p=display&f=Georgia11&t=
 * Font: Georgia11
 * Created by: Adrian Kristanto
 * Modified by: Rvinder Sandhu
 */
export class FancyMessage {
    public static readonly DEMIGOD_FELLED = `
                                                                                                                                                             
                                                                                                                                                             
\`7MM\"\"\"Yb. \`7MM\"\"\"YMM  \`7MMM.     ,MMF'\`7MMF' .g8\"\"\"bgd    .g8\"\"8q. \`7MM\"\"\"Yb.       \`7MM\"\"\"YMM \`7MM\"\"\"YMM  \`7MMF'      \`7MMF'      \`7MM\"\"\"YMM  \`7MM\"\"\"Yb.   
  MM    \`Yb. MM    \`7    MMMb    dPMM    MM .dP'     \`M  .dP'    \`YM. MM    \`Yb.       MM    \`7   MM    \`7    MM          MM          MM    \`7    MM    \`Yb. 
  MM     \`Mb MM   d      M YM   ,M MM    MM dM'       \`  dM'      \`MM MM     \`Mb       MM   d     MM   d      MM          MM          MM   d      MM     \`Mb 
  MM      MM MMmmMM      M  Mb  M' MM    MM MM           MM        MM MM      MM       MM\"\"MM     MMmmMM      MM          MM          MMmmMM      MM      MM 
  MM     ,MP MM   Y  ,   M  YM.P'  MM    MM MM.    \`7MMF'MM.      ,MP MM     ,MP       MM   Y     MM   Y  ,   MM      ,   MM      ,   MM   Y  ,   MM     ,MP 
  MM    ,dP' MM     ,M   M  \`YM'   MM    MM \`Mb.     MM  \`Mb.    ,dP' MM    ,dP'       MM         MM     ,M   MM     ,M   MM     ,M   MM     ,M   MM    ,dP' 
.JMMmmmdP' .JMMmmmmMMM .JML. \`'  .JMML..JMML. \`\"bmmmdPY    \`\"bmmd\"' .JMMmmmdP'       .JMML.     .JMMmmmmMMM .JMMmmmmMMM .JMMmmmmMMM .JMMmmmmMMM .JMMmmmdP'   
                                                                                                                                                             
                                                                                                                                                             
`;

    /**
     * Fancy string to display 'ELDEN RING'
     */
    public static readonly ELDEN_RING = `
\`7MM\"\"\"YMM  \`7MMF'      \`7MM\"\"\"Yb. \`7MM\"\"\"YMM  \`7MN.   \`7MF'    \`7MM\"\"\"Mq.  \`7MMF'\`7MN.   \`7MF' .g8\"\"\"bgd  
  MM    \`7    MM          MM    \`Yb. MM    \`7    MMN.    M        MM   \`MM.   MM    MMN.    M .dP'     \`M  
  MM   d      MM          MM     \`Mb MM   d      M YMb   M        MM   ,M9    MM    M YMb   M dM'       \`  
  MMmmMM      MM          MM      MM MMmmMM      M  \`MN. M        MMmmdM9     MM    M  \`MN. M MM           
  MM   Y  ,   MM      ,   MM     ,MP MM   Y  ,   M   \`MM.M        MM  YM.     MM    M   \`MM.M MM.    \`7MMF'
  MM     ,M   MM     ,M   MM    ,dP' MM     ,M   M     YMM        MM   \`Mb.   MM    M     YMM \`Mb.     MM  
.JMMmmmmMMM .JMMmmmmMMM .JMMmmmdP' .JMMmmmmMMM .JML.    YM      .JMML. .JMM..JMML..JML.    YM   \`\"bmmmdPY  
`;

    /**
     * Fancy string to display 'YOU DIED'
     */
    public static readonly YOU_DIED = `
\`YMM'   \`MM' .g8\"\"8q. \`7MMF'   \`7MF'    \`7MM\"\"\"Yb. \`7MMF'\`7MM\"\"\"YMM  \`7MM\"\"\"Yb.   
  VMA   ,V .dP'    \`YM. MM       M        MM    \`Yb. MM    MM    \`7    MM    \`Yb. 
   VMA ,V  dM'      \`MM MM       M        MM     \`Mb MM    MM   d      MM     \`Mb 
    VMMP   MM        MM MM       M        MM      MM MM    MMmmMM      MM      MM 
     MM    MM.      ,MP MM       M        MM     ,MP MM    MM   Y  ,   MM     ,MP 
     MM    \`Mb.    ,dP' YM.     ,M        MM    ,dP' MM    MM     ,M   MM    ,dP' 
   .JMML.    \`\"bmmd\"'    \`bmmmmd\"'      .JMMmmmdP' .JMML..JMMmmmmMMM .JMMmmmdP'   
`;

    /**
     * Fancy string displaying lost site activated
     */
    public static readonly LOST_SITE_ACTIVATED = `
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                    
\`7MMF'        .g8\"\"8q.    .M\"\"\"bgd MMP\"\"MM\"\"YMM       .g8\"\"\"bgd \`7MM\"\"\"Mq.        db       .g8\"\"\"bgd \`7MM\"\"\"YMM      \`7MM\"\"\"Yb. \`7MMF' .M\"\"\"bgd   .g8\"\"\"bgd   .g8\"\"8q.\`7MMF'   \`7MF'\`7MM\"\"\"YMM  \`7MM\"\"\"Mq.  \`7MM\"\"\"YMM  \`7MM\"\"\"Yb.   
  MM        .dP'    \`YM. ,MI    \"Y P'   MM   \`7     .dP'     \`M   MM   \`MM.      ;MM:    .dP'     \`M   MM    \`7        MM    \`Yb. MM  ,MI    \"Y .dP'     \`M .dP'    \`YM.\`MA     ,V    MM    \`7    MM   \`MM.   MM    \`7    MM    \`Yb. 
  MM        dM'      \`MM \`MMb.          MM          dM'       \`   MM   ,M9      ,V^MM.   dM'       \`   MM   d          MM     \`Mb MM  \`MMb.     dM'       \` dM'      \`MM VM:   ,V     MM   d      MM   ,M9    MM   d      MM     \`Mb 
  MM        MM        MM   \`YMMNq.      MM          MM            MMmmdM9      ,M  \`MM   MM            MMmmMM          MM      MM MM    \`YMMNq. MM          MM        MM  MM.  M'     MMmmMM      MMmmdM9     MMmmMM      MM      MM 
  MM      , MM.      ,MP .     \`MM      MM          MM.    \`7MMF' MM  YM.      AbmmmqMA  MM.           MM   Y  ,       MM     ,MP MM  .     \`MM MM.         MM.      ,MP  \`MM A'      MM   Y  ,   MM  YM.     MM   Y  ,   MM     ,MP 
  MM     ,M \`Mb.    ,dP' Mb     dM      MM          \`Mb.     MM   MM   \`Mb.   A'     VML \`Mb.     ,'   MM     ,M       MM    ,dP' MM  Mb     dM \`Mb.     ,' \`Mb.    ,dP'   :MM;       MM     ,M   MM   \`Mb.   MM     ,M   MM    ,dP' 
.JMMmmmmMMM   \`\"bmmd\"'   P\"Ybmmd\"     .JMML.          \`\"bmmmdPY .JMML. .JMM..AMA.   .AMMA. \`\"bmmmd'  .JMMmmmmMMM     .JMMmmmdP' .JMML.P\"Ybmmd\"    \`\"bmmmd'    \`\"bmmd\"'      VF      .JMMmmmmMMM .JMML. .JMM..JMMmmmmMMM .JMMmmmdP'   
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                    
`;

    /**
     * Prints out a message to console in fancy print, with a delay between lines.
     * @param message message to be printed
     */
    public static async fancyPrint(message: string): Promise<void> {
        const display = new Display();
        for (const line of message.split('\n')) {
            display.println(line);
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
}