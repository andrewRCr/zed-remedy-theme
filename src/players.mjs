/**
 * Collaborative player/cursor colors per tone.
 *
 * Dark uses the bright palette, Bright uses the normal palette
 * (matching the syntax color strategy for each tone).
 */

import { normal, bright } from "./palette.mjs";

function player(hex) {
  return { cursor: hex, background: hex, selection: `${hex}33` };
}

export const darkPlayers = [
  player(normal.orange),   // #EB684B — primary (accent)
  player(bright.blue),     // #81A2BE
  player(bright.green),    // #B5BD68
  player(bright.magenta),  // #B294BB
  player(bright.cyan),     // #8ABEB7
  player(bright.red),      // #CC6666
  player(bright.yellow),   // #F0C674
  player(bright.white),    // #C5C8C6
];

export const brightPlayers = [
  player(normal.orange),   // #EB684B — primary (accent)
  player(normal.blue),     // #5F819D
  player(normal.green),    // #8C9440
  player(normal.magenta),  // #85678F
  player(normal.cyan),     // #5E8D87
  player(normal.red),      // #A54242
  player("#D79A22"),       // bright.yellow darkened
  player(normal.white),    // #707880
];
