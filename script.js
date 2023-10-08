// script.js
const imageInput1 = document.getElementById("imageInput1");
const imageInput2 = document.getElementById("imageInput2");
const imageCanvas = document.getElementById("imageCanvas");
const ctx = imageCanvas.getContext("2d");

imageInput1.addEventListener("change", handleImageInput1);
imageInput2.addEventListener("change", handleImageInput2);

let image1Data, image2Data;

function handleImageInput1(event) {
  const file = event.target.files[0];
  if (file) {
    loadImage(file, 1);
  }
}

function handleImageInput2(event) {
  const file = event.target.files[0];
  if (file) {
    loadImage(file, 2);
  }
}

function loadImage(file, imageNumber) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      // 이미지 그리기
      imageCanvas.width = img.width;
      imageCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // 이미지 데이터 저장
      if (imageNumber === 1) {
        image1Data = ctx.getImageData(
          0,
          0,
          imageCanvas.width,
          imageCanvas.height
        );
      } else if (imageNumber === 2) {
        image2Data = ctx.getImageData(
          0,
          0,
          imageCanvas.width,
          imageCanvas.height
        );
      }
    };
  };

  reader.readAsDataURL(file);
}

function applyXOREffect() {
  if (image1Data && image2Data) {
    const resultData = ctx.createImageData(
      imageCanvas.width,
      imageCanvas.height
    );

    for (let i = 0; i < image1Data.data.length; i += 4) {
      // XOR
      resultData.data[i] = image1Data.data[i] ^ image2Data.data[i]; // R
      resultData.data[i + 1] = image1Data.data[i + 1] ^ image2Data.data[i + 1]; // G
      resultData.data[i + 2] = image1Data.data[i + 2] ^ image2Data.data[i + 2]; // B
      resultData.data[i + 3] = 255;
    }

    ctx.putImageData(resultData, 0, 0);
  }
}

const applyXORButton = document.getElementById("applyXORButton");
applyXORButton.addEventListener("click", applyXOREffect);
