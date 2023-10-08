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
  // 이미지 데이터 2개가 모두 로드되었으면 if문 실행
  if (image1Data && image2Data) {
    // 결과 이미지 데이터 생성, 결과 이미지 크기 == 캔버스 크기
    const resultData = ctx.createImageData(
      imageCanvas.width,
      imageCanvas.height
    );
    // 이미지 픽셀 순화하면서 XOR 연산 수행
    for (let i = 0; i < image1Data.data.length; i += 4) {
      // image1과 image2의 각 픽셀의 R,G,B에 대해 XOR 연산 수행
      resultData.data[i] = image1Data.data[i] ^ image2Data.data[i]; // R
      resultData.data[i + 1] = image1Data.data[i + 1] ^ image2Data.data[i + 1]; // G
      resultData.data[i + 2] = image1Data.data[i + 2] ^ image2Data.data[i + 2]; // B
      resultData.data[i + 3] = 255;
    }
    // 연산 결과 캔버스에 표시
    ctx.putImageData(resultData, 0, 0);
  }
}

const applyXORButton = document.getElementById("applyXORButton");
applyXORButton.addEventListener("click", applyXOREffect);
