const loadItems = () => {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
};

const listUl = document.querySelector(".list_container");
const homeBtn = document.querySelector(".logo");

if (homeBtn) {
  homeBtn.addEventListener("click", () => location.reload(true));
}

const buildGeneralLi = (item) => {
  //Make Tags in HTML
  const liTag = document.createElement("li"),
    aTag = document.createElement("a"),
    imgTag = document.createElement("img"),
    spanTag = document.createElement("span");
  //Make Class to tags
  liTag.classList.add("list_item");
  imgTag.classList.add("item_image");
  spanTag.classList.add("item_desc");
  //Push detail description
  imgTag.src = item.img;
  aTag.href = "#";
  spanTag.innerText = `${item.gender}, ${item.size}`;
  liTag.append(aTag);
  aTag.append(imgTag, spanTag);
  return liTag;
};

const displayItems = (arr) => {
  arr.forEach((item) => {
    listUl.append(buildGeneralLi(item));
  });
};

const setEventListener = (arr) => {
  const filterClick = (event) => {
    listUl.innerHTML = "";
    let clickedBtn = event.target;
    if (clickedBtn.tagName === "IMG") {
      clickedBtn = event.target.parentNode;
      if (clickedBtn.classList.contains("t-shirt")) {
        const tshirtArr = arr.filter((tag) => {
          return tag.type === "tshirt";
        });
        tshirtArr.forEach((item) => listUl.append(buildGeneralLi(item)));
      } else if (clickedBtn.classList.contains("pants")) {
        const tshirtArr = arr.filter((tag) => {
          return tag.type === "pants";
        });
        tshirtArr.forEach((item) => listUl.append(buildGeneralLi(item)));
      } else if (clickedBtn.classList.contains("skirts")) {
        const tshirtArr = arr.filter((tag) => {
          return tag.type === "skirts";
        });
        tshirtArr.forEach((item) => listUl.append(buildGeneralLi(item)));
      }
    } else {
      console.log(clickedBtn);
      if (clickedBtn.classList.contains("blue")) {
        const blueArr = arr.filter((tag) => {
          return tag.color === "blue";
        });
        blueArr.forEach((item) => listUl.append(buildGeneralLi(item)));
      } else if (clickedBtn.classList.contains("yellow")) {
        const tshirtArr = arr.filter((tag) => {
          return tag.color === "yellow";
        });
        tshirtArr.forEach((item) => listUl.append(buildGeneralLi(item)));
      } else if (clickedBtn.classList.contains("pink")) {
        const tshirtArr = arr.filter((tag) => {
          return tag.color === "pink";
        });
        tshirtArr.forEach((item) => listUl.append(buildGeneralLi(item)));
      }
    }
  };

  const btn = document.querySelectorAll(".btn");
  arr.forEach(() => {
    btn.forEach((button) => {
      button.addEventListener("click", filterClick);
    });
  });
};

loadItems().then((items) => {
  console.log(items);
  displayItems(items);
  setEventListener(items);
});
