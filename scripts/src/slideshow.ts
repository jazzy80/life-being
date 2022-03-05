// Simple enum to specifiy if the buttons need to be hidden or displayed.
enum ButtonMode {
  SHOW, HIDE
}

export function setUpSlideShow(): void {
    const header = document.querySelector('.header') as HTMLDivElement;
    const prevButton = document.querySelector('.prev-button') as HTMLButtonElement;
    const nextButton = document.querySelector('.next-button') as HTMLButtonElement;
    const buttons = [prevButton, nextButton];

    // Get the current page by stripping slashes from the path.
    // e.g. /currentPage/ becomes currentPage.
    const page = /[A-Za-z-_]+/.exec(window.location.pathname);

    // If there is nothing after the hostName default to home.
    const files = fetch(`/gallery/?page=${page || "home"}`);

    //TODO maybe a fallback image if the http request failes.
    files.then(resp => resp.json()).then( ({ imageFiles: rawImages}) => {
      // Precache images in the browser.
      const images = rawImages.map(preCacheImage);
      // No images, nothing to do
      if (images.length === 0) return;

      // Load the fist image, set some eventListeners for the vanishing gallery buttons effect.
      initSlideShow(header, buttons, images);

      // Next and previous buttons can cycle through the images by manipulating
      // an index pointer, the gallery is cyclic.
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
  });
};

// Wrapping the imageNames into a Image obj forces the browser to precache the images.
function preCacheImage(image: string): HTMLImageElement {
    const prefetchImage = new Image;
    prefetchImage.src = `/${image}`;
    return prefetchImage;
  }

// Initialize the gallery/slideshow with the first image
function initSlideShow(header: HTMLDivElement, buttons: HTMLButtonElement[], images: HTMLImageElement[]): void {
  if (images.length > 0) {
    header.style.backgroundImage = `url(${images[0].src}`;
    }
  // Buttons should be visible and initialized when there are 2 or more buttons.
  if (images.length > 1) {
      buttons.forEach(b => b.style.display = 'block');
      // Set up the vanshing buttons effect. Start the hiding effect.
      manipulateButtons(buttons, ButtonMode.HIDE);

      // Show the gallery buttons when entering the heading area.
      header.addEventListener('mouseenter', () => {
        manipulateButtons(buttons, ButtonMode.SHOW);
      });
      // Smooth vanishing when leaving the header with the mouse.
      header.addEventListener('mouseleave', () => {
        manipulateButtons(buttons, ButtonMode.HIDE);
      });
    }
}

// General image setter function.
function setImage(header: HTMLDivElement, image: HTMLImageElement): void {
  header.style.backgroundImage = `url(${image.src})`;
}

// TODO somehow make this work in clean code.
class IntervalQueue {
  intervalQueue: number[] = []
  addTimer(timer: number): void { this.intervalQueue.push(timer); }
  removeAll(): void {this.intervalQueue.forEach(t => clearTimeout(t)); this.intervalQueue.length = 0;}
  isEmpty(): Boolean {return this.intervalQueue.length === 0;}
}

const intervalQueue = new IntervalQueue;

function manipulateButtons(buttons: HTMLButtonElement[], mode: ButtonMode): void {
  // Start opacity as 0 if the buttons need to be shown else start at 1.
  let opacity = mode === ButtonMode.SHOW ? 0.0 : 1.0;
  // Hide after 3s but start showing immediately.
  const timeoutTime = mode === ButtonMode.HIDE ? 2000 : 1;
  // Define a isDone, for a shown button the opacity is 1 for a hidden the button, it should be 0.
  const isDone = (value: number) => mode === ButtonMode.SHOW ? value >= 1.0 : value <= 0.0;

  // Outer timeout makes sure the vanishing of buttons goes after T seconds.
  intervalQueue.removeAll();
  const timeoutTimer = setTimeout(() => {
    const timer = setInterval(() => {
      opacity = mode === ButtonMode.SHOW ? opacity + 0.1 : opacity - 0.1;
      buttons.forEach(b => b.style.opacity = opacity.toString());
      if (isDone(opacity)) clearInterval(timer);
    }, 30)
    intervalQueue.removeAll()
  }, timeoutTime);
  intervalQueue.addTimer(timeoutTimer);
}
