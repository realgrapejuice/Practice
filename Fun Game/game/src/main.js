"use strict";

import { GameBuilder, Reason } from "./game.js";
import PopUp from "./popup.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(10)
  .carrotCount(10)
  .bugCount(10)
  .build();

function init() {
  gameFinishBanner.setClickListener(() => {
    game.reset();
    gameFinishBanner.hide();
  });
  game.reset();
  gameFinishBanner.hide();
}

game.setGameStopListener(reason => {
  switch(reason) {
    case Reason.cancel :
      gameFinishBanner.showWithText(`Retry?`);
      break;
    case Reason.win :
      gameFinishBanner.showWithText(`You WIN!`);
      break;
    case Reason.lose :
      gameFinishBanner.showWithText(`You LOSE`);
      break;
    default :
      throw new Error(`not valid reason`);
  }
});

init();
