import {Effect} from './functional/effect';

const ATELIER_IMAGE_LIST = 'atelier-image-list';
const IMAGE_DETAIL = 'zoom-image';
const IMAGE_LIST_ELEMENT = 'image-list-item';

const IMAGE_SELECTED = 'image-selected';

function init(): Promise<Effect<void>> {
  const atelierList = document.querySelector(`.${ATELIER_IMAGE_LIST}`) as HTMLUListElement;
  const categoryParam = generateCategoryParam();
  return fetch(`/wp-json/api/atelier/${categoryParam}`)
    .then(response => response.json())
    .then((images: string[]) => {
      const imgTags = Effect.forEach(images, createImageTagsFromUrl);
      return imgTags.flatMap(images => {
        const [firstImage] = images;
        return Effect.when(
          !!firstImage, setImageSelected(firstImage).flatMap(_ =>
            showImage(firstImage.src)).flatMap(_ =>
              addEventListenerToImages(images, imagesClickHandleCb).flatMap(_ =>
                convertImagesToListItems(images).flatMap(liElements =>
                  Effect.unit(() => atelierList.append(...liElements))
              )
            )
          )
        )
    });
  });
}

function imagesClickHandleCb(image: HTMLImageElement, images: HTMLImageElement[]): Effect<void> {
    return removeSelectedFromImages(image, images).flatMap(_ =>
      setImageSelected(image).flatMap(_ =>
        showImage(image.src)));
}

function createImageTagsFromUrl(url: string): Effect<HTMLImageElement> {
    const atelierImage = Effect.unit(() => document.createElement('img'));
    return atelierImage.map(image => {
      image.src = url;
      return image;
    });
  }

function convertImagesToListItems(images: HTMLImageElement[]): Effect<HTMLLIElement[]> {
    return Effect.forEach(
      images,
      (image) => {
        return Effect.unit(() => document.createElement('li')).map(liElement => {
          liElement.classList.add(IMAGE_LIST_ELEMENT);
          liElement.appendChild(image);
          return liElement;
      });
    });
  }

function addEventListenerToImages(
  images: HTMLImageElement[],
  cb: (image: HTMLImageElement, images: HTMLImageElement[]) => Effect<void>
): Effect<void> {
      return Effect.forEach_(
        images,
        (i) => Effect.unit(() => i.addEventListener('click', () => cb(i, images).run()))
      );
    }

function setImageSelected(image: HTMLImageElement): Effect<void> {
  return Effect.unit(() => image.classList.add(IMAGE_SELECTED));
}

function removeSelectedFromImages(
  image: HTMLImageElement,
  images: HTMLImageElement[]
): Effect<void> {
  return Effect.forEach_(
    images.filter(i => i !== image),
    (i) => Effect.unit(() => i.classList.remove(IMAGE_SELECTED))
  );
}

function showImage(url: string): Effect<void> {
  return Effect.unit(
    () => document.querySelector(`.${IMAGE_DETAIL}`) as HTMLDivElement
  ).flatMap(imageContainer =>
    Effect.unit(() => document.createElement('img')).map(image =>
   {
    image.classList.add(IMAGE_DETAIL);
    image.src = url;
    imageContainer.innerHTML = '';
    imageContainer.appendChild(image);
  }));
}

function generateCategoryParam(): string {
  const categoryParam = new URLSearchParams(location.search).get('category');
  return categoryParam ? `?category=${categoryParam}`: '';
}

addEventListener(
  'DOMContentLoaded',
  () =>
    init().then(effect => effect.run())
  );
