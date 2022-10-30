const IMAGE_DETAIL_HEIGHT = 600;
const IMAGE_LIST_WIDTH = 200;

const ATELIER = 'atelier';
const ATELIER_IMAGE_LIST = 'atelier-image-list';
const IMAGE_DETAIL = 'zoom-image';
const IMAGE_LIST_ELEMENT = 'image-list-item';

const IMAGE_SELECTED = 'image-selected';

function init(): Promise<DOMEffect<void>> {
  const atelierList = document.querySelector(`.${ATELIER_IMAGE_LIST}`) as HTMLUListElement;
  return fetch('/wp-json/api/atelier/')
    .then(response => response.json())
    .then((images: string[]) => {
      const imgTags = DOMEffect.forEach(images, createImageTagsFromUrl);
      return imgTags.flatMap(images => {
        const [firstImage] = images;
        return DOMEffect.when(
          !!firstImage, setImageSelected(firstImage).flatMap(_ =>
            showImage(firstImage.src)).flatMap(_ =>
              addEventListenerToImages(images, imagesClickHandleCb).flatMap(_ =>
                convertImagesToListItems(images).flatMap(liElements =>
                  DOMEffect.unit(() => atelierList.append(...liElements))
              )
            )
          )
        )
    });
  });
}

function imagesClickHandleCb(image: HTMLImageElement, images: HTMLImageElement[]): DOMEffect<void> {
    return removeSelectedFromImages(image, images).flatMap(_ =>
      setImageSelected(image).flatMap(_ =>
        showImage(image.src)));
}

function createImageTagsFromUrl(url: string): DOMEffect<HTMLImageElement> {
    const atelierImage = DOMEffect.unit(() => document.createElement('img'));
    return atelierImage.map(image => {
      image.src = url;
      image.width = IMAGE_LIST_WIDTH;
      return image;
    });
  }

function convertImagesToListItems(images: HTMLImageElement[]): DOMEffect<HTMLLIElement[]> {
    return DOMEffect.forEach(
      images,
      (image) => {
        return DOMEffect.unit(() => document.createElement('li')).map(liElement => {
          liElement.classList.add(IMAGE_LIST_ELEMENT);
          liElement.appendChild(image);
          return liElement;
      });
    });
  }

function addEventListenerToImages(
  images: HTMLImageElement[],
  cb: (image: HTMLImageElement, images: HTMLImageElement[]) => DOMEffect<void>
): DOMEffect<void> {
      return DOMEffect.forEach_(
        images,
        (i) => DOMEffect.unit(() => i.addEventListener('click', () => cb(i, images).run()))
      );
    }

function setImageSelected(image: HTMLImageElement): DOMEffect<void> {
  return DOMEffect.unit(() => image.classList.add(IMAGE_SELECTED));
}

function removeSelectedFromImages(
  image: HTMLImageElement,
  images: HTMLImageElement[]
): DOMEffect<void> {
  return DOMEffect.forEach_(
    images.filter(i => i !== image),
    (i) => DOMEffect.unit(() => i.classList.remove(IMAGE_SELECTED))
  );
}

function showImage(url: string): DOMEffect<void> {
  return DOMEffect.unit(
    () => document.querySelector(`.${IMAGE_DETAIL}`) as HTMLDivElement
  ).flatMap(imageContainer =>
    DOMEffect.unit(() => document.createElement('img')).map(image =>
   {
    image.classList.add(IMAGE_DETAIL);
    image.height = IMAGE_DETAIL_HEIGHT;
    image.src = url;
    imageContainer.innerHTML = '';
    imageContainer.appendChild(image);
  }));
}

init().then(effect => effect.run());

class DOMEffect<A> {
  constructor(public run: () => A) {}
  static unit<A>(f: () => A): DOMEffect<A> {
    return new DOMEffect(f);
  }
  static forEach<A, B>(la: A[], f: (a: A) => DOMEffect<B>): DOMEffect<B[]> {
    return new DOMEffect(() => la.map(a => f(a).run()));
  }
  static forEach_<A>(la: A[], f: (a: A) => DOMEffect<void>): DOMEffect<void> {
    return new DOMEffect(() => la.forEach(a => f(a).run()));
  }
  static when(cond: boolean, effect: DOMEffect<void>): DOMEffect<void> {
    return new DOMEffect(() => {
      if (cond) return effect.run()
      return
    });
  }
  flatMap<B>(f: (a: A) => DOMEffect<B>): DOMEffect<B> {
    const a = this.run();
    return new DOMEffect(
      () => f(a).run()
    );
  }
  map<B>(f: (a: A) => B): DOMEffect<B> {
    return new DOMEffect(
      () => f(this.run())
    );
  }
}
