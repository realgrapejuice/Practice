"use strict";

const CARROT_SIZE = 80;
const FIELD_TOP_PADDING = 50;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameField = document.querySelector(".game__field");
    this.fieldRect = this.gameField.getBoundingClientRect();
    this.gameField.addEventListener("click", this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  visualize() {
    this.gameField.innerHTML = ``;
    this._locateItems(
      this.gameField,
      this.carrotCount,
      `img/carrot.png`,
      `carrot`
    );
    this._locateItems(this.gameField, this.bugCount, `img/bug.png`, `bug`);
  }

  _locateItems(field, count, imgPath, className) {
    const x1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y1 = field.offsetTop + FIELD_TOP_PADDING;
    const y2 = field.offsetTop + this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = `absolute`;
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.userDrag = `none`;
      field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(`.carrot`)) {
      target.remove();
      this.onItemClick && this.onItemClick("carrot"); // setClickListener를 이용해서 (onFieldClickListener 콜백함수를 실행)
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick("bug"); // onItemClick은 사실 onFieldClickHandler 함수를 의미
    }
  };

  clearField() {
    this.gameField.innerHTML = ``;
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
