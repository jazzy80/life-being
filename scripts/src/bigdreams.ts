import { Effect } from "./functional/effect";

async function init(): Promise<Effect<void>> {
  const body = await fetchImages(0);
  const images = body.images;
  const amountOfPages = Math.ceil(images.length / body.count);
  return Effect.forEach_(images, (imageSrc: string) =>
    createImage(imageSrc)
      .map((image) => {
        const imageContainer = document.querySelector(
          ".bigdreams-images"
        ) as HTMLDivElement;
        imageContainer.append(image);
      })
      .flatMap(() => setPaginationText(images.length))
      .flatMap(() => setButtons(amountOfPages, 0))
  );
}

async function fetchImages(
  page: number
): Promise<{ images: string[]; count: number }> {
  const response = await fetch(
    `/wp-json/api/atelier/?category=big-dreams&page=${page}`
  );
  return response.json();
}

function setPaginationText(count: number): Effect<void> {
  return Effect.unit(
    () => document.querySelector(".pagination-text") as HTMLHeadingElement
  ).map((paginationText) => {
    paginationText.textContent = `Foto's 1 t/m 9 getoond van de ${count}`;
  });
}

function setButtons(amountOfPages: number, currentPage: number): Effect<void> {
  return Effect.unit(
    () => document.querySelector(".prev-btn") as HTMLButtonElement
  ).map((button) => {
    button.classList.add("paginator-btn-disabled");
    button.disabled = true;
  });
}

function createImage(src: string): Effect<HTMLDivElement> {
  return Effect.unit(() => {
    const imageFrame = document.createElement("div");
    imageFrame.classList.add("image-frame");
    return imageFrame;
  }).flatMap((imageFrame) => {
    const imageText = document.createElement("span");
    return Effect.unit(() => {
      const image = document.createElement("img");
      image.src = src;
      imageFrame.append(imageText, image);
      return imageFrame;
    });
  });
}

init().then((effect) => effect.run());
