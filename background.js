const body = document.querySelector("body");
const IMG_NUMBER = 3;

/* function handleImageLoad(){
  console.log("finished loading");
} */

function paintImage(imgNumber){
  const image = new Image();
  image.src = `/images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
  /* image.addEventListener("loadend", handleImageLoad);
    만약 API였으면 필요함 */
}


function generateRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init(){
  const randomNumber = generateRandom();
  paintImage(randomNumber);
}

init();
