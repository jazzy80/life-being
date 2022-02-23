//TODO Code opschonen wellicht functioneel krijgen ipv states
export function setUpSlideShow(): void {
    const header = document.querySelector('.header') as HTMLDivElement;
    const prevButton = document.querySelector('.prev-button') as HTMLButtonElement;
    const nextButton = document.querySelector('.next-button') as HTMLButtonElement;

    // Get the current page by stripping slashes from the path.
    // e.g. /currentPage/ becomes currentPage.
    const page = /[A-Za-z-_]+/.exec(window.location.pathname)

    // If there is nothing after the hostName default to home.
    const files = fetch(`/gallery/?page=${page || "home"}`);

    //TODO maybe a fallback image if the http request failes.
    files.then(resp => resp.json()).then( ({ imageFiles: rawImages}) => {
      // Precache images in the browser.
      const images = rawImages.map(preCacheImage);
      // No images, nothing to do
      if (images.length === 0) return;

      // Load the fist image
      initSlideShow(header, images);

      // If there is one image, hide the gallery buttons
      if (images.length === 1) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
      }
      else {
        // Next and previous buttons can cycle through the images by manipulating
        // an index pointer, the gallery is cyclic.
        // TODO Not quite satisfied with the implementation(code duplication).
        let index = 0;
        prevButton.addEventListener('click', () => {
          // if the index is at zero, start at the end
          index = index === 0 ? images.length - 1 : index - 1;
          setImage(header, images[index]);
        });

        nextButton.addEventListener('click', () => {
          // if the index is at the end, start at the beginning.
          index = index === images.length - 1 ? 0 : index + 1;
          setImage(header, images[index]);
        });
      }
    });
};

// Wrapping the imageNames into a Image obj forces the browser to precache the images.
function preCacheImage(image: string): HTMLImageElement {
        const prefetchImage = new Image;
        prefetchImage.src = image;
        return prefetchImage;
      }

// Initialize the gallery/slideshow with the first image
function initSlideShow(header: HTMLDivElement, images: HTMLImageElement[]): void {
  if (images.length > 0) {
    header.style.backgroundImage = `url(${images[0].src}`;
    }
}

// General image setter function.
function setImage(header: HTMLDivElement, image: HTMLImageElement): void {
  header.style.backgroundImage = `url(${image.src})`;
}
