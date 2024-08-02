let container = document.getElementById('image-container');

let imageClassNames = ["img1", "img2", "img3", "img4", "img5"];

let randomIndex = Math.floor(Math.random() * 5);
let randomClassName = imageClassNames[randomIndex];
imageClassNames.push(randomClassName);

// [img1, img2, -1, img4, img5, img2]

let count = 0;
for (let i = 0; count < 6; i++) {
  let imgTag = document.createElement('img');
  let randomIndex = Math.floor(Math.random() * 6);
  if (imageClassNames[randomIndex] == -1) {
    continue;
  }
  imgTag.className = imageClassNames[randomIndex];
  imgTag.setAttribute('data-ns-test', imageClassNames[randomIndex]);
  count++;
  imgTag.id = "img" + count;
  imageClassNames[randomIndex] = -1;
  container.append(imgTag);
  imgTag.addEventListener("click", checkRobot);
}

let clicks = 0;
let selectedImages = [];

function checkRobot(e) {
  let clickedImage = e.target;

  if (selectedImages.includes(clickedImage)) {
    return;
  }

  selectedImages.push(clickedImage);
  clickedImage.classList.add("selected");
  clicks++;

  if (clicks == 1) {
    let resetButton = document.createElement('button');
    resetButton.innerText = "Reset";
    resetButton.id = "reset";
    container.append(resetButton);
    resetButton.addEventListener("click", reset);
  }

  if (clicks == 2) {
    let verifyButton = document.createElement('button');
    verifyButton.innerText = "Verify";
    verifyButton.id = "verify";
    container.append(verifyButton);
    verifyButton.addEventListener("click", verify);
  }

  if (clicks > 2) {
    let verifyButton = document.getElementById("verify");
    if (verifyButton) {
      verifyButton.remove();
    }
  }
}

function reset() {
  selectedImages.forEach(image => image.classList.remove("selected"));
  clicks = 0;
  selectedImages = [];
  let verifyButton = document.getElementById("verify");
  if (verifyButton) {
    verifyButton.remove();
  }
  let resetButton = document.getElementById("reset");
  resetButton.remove();
}

function verify() {
  let para = document.createElement('p');
  para.id = "para";
  if (selectedImages[0].className === selectedImages[1].className) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  container.append(para);
  let verifyButton = document.getElementById("verify");
  verifyButton.remove();
}
