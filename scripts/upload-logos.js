document
  .getElementById("logos-upload")
  .addEventListener("change", writeImageToLocalStorage);

let dataUrls = [];
let numberOfImages = 0;
localStorage.clear();

function writeImageToLocalStorage() {
  numberOfImages = this.files.length;
  Array.from(this.files).forEach((file) => {
    storeToLocalStorage(file);
  });
}

function storeToLocalStorage(file) {
  if (/\.(jpe?g|png)$/i.test(file.name)) {
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      dataUrls.push(this.result);
      const allImagesLoaded = dataUrls.length === numberOfImages;

      if (allImagesLoaded) {
        const successful = tryToWriteToLocalStorage();

        if (successful) {
          navigateToNextPage();
        }
      }
    });

    reader.readAsDataURL(file);
  } else {
    console.error(
      "Image format is not supported. Use jpg, jpeg or png images."
    );
  }
}

function tryToWriteToLocalStorage() {
  try {
    localStorage.setItem("logoDataUrls", JSON.stringify(dataUrls));
  } catch (exception) {
    console.error(exception);
    dataUrls = [];
    numberOfImages = 0;

    if (exception.name === "QuotaExceededError" || exception.code === 22) {
      alert(
        "Images are too large. Maximum size is 5MB for all the images combined."
      );
    } else {
      alert("Something went wrong. Please try again.");
    }

    return false;
  }

  return true;
}

function navigateToNextPage() {
  window.location = "./enter-time.html";
}
