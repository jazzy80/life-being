import { Effect } from "./functional/effect";

const atelierImageList = "atelier-image-list";
const imageDetail = "zoom-image";
const imageListElement = "image-list-item";

const imageSelected = "image-selected";

async function init(): Promise<Effect<void>> {
  const atelierList = document.querySelector(
    `.${atelierImageList}`
  ) as HTMLImageElement;
  const categoryParam = generateCategoryParam();
  const response = await fetch(`/wp-json/api/atelier/${categoryParam}`);
  const images = await response.json();
  const imgTags = Effect.forEach(images, createImageTagsFromUrl);

  return imgTags.flatMap((images) => {
    const [firstImage] = images;
    return Effect.when(
      Boolean(firstImage),
      setImageSelected(firstImage)
        .flatMap(() => showImage(firstImage.src))
        .flatMap(() =>
          addEventListenerToImages(images, imagesClickHandleCb).flatMap(() =>
            convertImagesToListItems(images).flatMap((liElements) =>
              Effect.unit(() => {
                atelierList.append(...liElements);
              })
            )
          )
        )
    );
  });
}

function imagesClickHandleCb(
  image: HTMLImageElement,
  images: HTMLImageElement[]
): Effect<void> {
  return removeSelectedFromImages(image, images).flatMap(() =>
    setImageSelected(image).flatMap(() => showImage(image.src))
  );
}

function createImageTagsFromUrl(url: string): Effect<HTMLImageElement> {
  const atelierImage = Effect.unit(() => document.createElement("img"));
  return atelierImage.map((image) => {
    image.src = url;
    return image;
  });
}

function convertImagesToListItems(
  images: HTMLImageElement[]
): Effect<HTMLLIElement[]> {
  return Effect.forEach(images, (image) => {
    return Effect.unit(() => document.createElement("li")).map((liElement) => {
      liElement.classList.add(imageListElement);
      liElement.appendChild(image);
      return liElement;
    });
  });
}

function addEventListenerToImages(
  images: HTMLImageElement[],
  cb: (image: HTMLImageElement, images: HTMLImageElement[]) => Effect<void>
): Effect<void> {
  return Effect.forEach_(images, (i) =>
    Effect.unit(() => {
      i.addEventListener("click", () => {
        cb(i, images).run();
      });
    })
  );
}

function setImageSelected(image: HTMLImageElement): Effect<void> {
  return Effect.unit(() => {
    image.classList.add(imageSelected);
  });
}

function removeSelectedFromImages(
  image: HTMLImageElement,
  images: HTMLImageElement[]
): Effect<void> {
  return Effect.forEach_(
    images.filter((i) => i !== image),
    (i) =>
      Effect.unit(() => {
        i.classList.remove(imageSelected);
      })
  );
}

function showImage(url: string): Effect<void> {
  return Effect.unit(
    () => document.querySelector(`.${imageDetail}`) as HTMLImageElement
  ).flatMap((imageContainer) =>
    Effect.unit(() => document.createElement("img")).map((image) => {
      image.classList.add(imageSelected);
      image.src = url;
      imageContainer.innerHTML = "";
      imageContainer.appendChild(image);
    })
  );
}

function generateCategoryParam(): string {
  const categoryParam = new URLSearchParams(location.search).get("category");
  return categoryParam ? `?category=${categoryParam}` : "";
}

addEventListener("DOMContentLoaded", async () =>
  init().then((effect) => {
    effect.run();
  })
);
