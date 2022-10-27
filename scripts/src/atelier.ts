const IMAGE_DETAIL_HEIGHT = 600;
const IMAGE_LIST_WIDTH = 200;

const ATELIER = 'atelier';
const ATELIER_IMAGE_LIST = 'atelier-image-list';
const IMAGE_DETAIL = 'zoom-image';
const IMAGE_LIST_ELEMENT = 'image-list-item';

const IMAGE_SELECTED = 'image-selected';

fetch('/wp-json/api/atelier/')
  .then(response => response.json())
  .then((images: string[]) => {
    const imgTags = images.map(createImageTagsFromUrl);
    createImageList(imgTags);
  });

function createImageList(images: HTMLImageElement[]): HTMLDivElement {
    const atelierContainer = document.querySelector(`.${ATELIER}`) as HTMLDivElement;
    const atelierList = document.querySelector(`.${ATELIER_IMAGE_LIST}`) as HTMLUListElement;
    atelierContainer.appendChild(atelierList);

    images.forEach((image: HTMLImageElement, _, arr: HTMLImageElement[]): void => {
      const liElement = document.createElement('li');
      liElement.classList.add(IMAGE_LIST_ELEMENT);
      liElement.appendChild(image);
      image.addEventListener('click', () => {
        removeSelectedFromImages(image, arr);
        setImageSelected(image);
        showImage(image.src);
      });
      atelierList.appendChild(liElement);
    });
    return atelierContainer;
}

function setImageSelected(image: HTMLImageElement): void {
  image.classList.add(IMAGE_SELECTED);
}

function removeSelectedFromImages(
  image: HTMLImageElement,
  images: HTMLImageElement[]
): void {
  images.filter(i => i !== image).forEach(i => i.classList.remove(IMAGE_SELECTED));
}

function createImageTagsFromUrl(url: string): HTMLImageElement {
    const atelierImage = document.createElement('img');
    atelierImage.src = url;
    atelierImage.width = IMAGE_LIST_WIDTH;
    return atelierImage;
}

  function showImage(url: string): void {
    const imageContainer = document.querySelector(`.${IMAGE_DETAIL}`) as HTMLDivElement;
    const image = document.createElement('img');
    image.classList.add(IMAGE_DETAIL);
    image.height = IMAGE_DETAIL_HEIGHT;
    image.src = url;
    imageContainer.innerHTML = '';
    imageContainer.appendChild(image);
  }

  class DOMEffect<A> {
    constructor(private f: () => A) {}
    static unit<A>(f: () => A): DOMEffect<A> {
      return new DOMEffect(f);
    }
  }
