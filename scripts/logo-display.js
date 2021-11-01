const main = document.querySelector("main");

const logoDataUrls = JSON.parse(localStorage.getItem("logoDataUrls"));

if (!Array.isArray(logoDataUrls)) {
  throw Error("no images stored");
}

countLogos();
displayImages();

function countLogos() {
  main.classList.add(`amount-of-logos-${logoDataUrls.length}`);
}

function displayImages() {
  logoDataUrls.forEach((dataUrl, index) => {
    const image = new Image();
    image.src = dataUrl;

    const div = document.createElement("div");
    div.classList.add(`logo-${index + 1}`);
    div.appendChild(image);

    main.appendChild(div);
  });
}
