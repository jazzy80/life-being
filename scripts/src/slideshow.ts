// Simple enum to specifiy if the buttons need to be hidden or displayed.
enum ButtonMode {
  SHOW, HIDE
}

export function setUpSlideShow(): void {
    const header = document.querySelector('.header') as HTMLDivElement;
    const prevButton = document.querySelector('.prev-button') as HTMLButtonElement;
    const nextButton = document.querySelector('.next-button') as HTMLButtonElement;
    const buttons = [prevButton, nextButton];

    // Get the current page as a relative path.
    // e.g. https://life-being/life-being-inspirations/art becomes
    // life-begin-inspirations/art
    const page = window.location.pathname
      .split('/')
      // url must be a non-empty string.
      .filter(url => url)
      .join('/');

    // If there is nothing after the hostName default to home.
    const files = fetch(`/gallery/?page=${page || "home"}`);

    files.then(resp => resp.json()).then( ({ imageFiles: rawImages}) => {
      // Precache images in the browser.
      const images = rawImages.map(preCacheImage);
      // No images, nothing to do, TODO show a default image.
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
      // Set up the vanshing buttons effect. Start the hiding effect,
      // if the mouse is not over the header.
      // The fading effects work with timer, we need to keep track of the current Ono
      // because only one can be active, it another one becomes active, cancel the previous one.
      let currentActiveTimers: number[] = [];
      if (document.querySelector('.header:hover') === null) {
        manipulateButtons(buttons, ButtonMode.HIDE, currentActiveTimers);
      }

      // Show the gallery buttons when entering the heading area.
      header.addEventListener('mouseenter', () => {
        manipulateButtons(buttons, ButtonMode.SHOW, currentActiveTimers);
      });
      // Smooth vanishing when leaving the header with the mouse.
      header.addEventListener('mouseleave', () => {
        manipulateButtons(buttons, ButtonMode.HIDE, currentActiveTimers);
      });
    }
}

// General image setter function.
function setImage(header: HTMLDivElement, image: HTMLImageElement): void {
  header.style.backgroundImage = `url(${image.src})`;
}

function manipulateButtons(
  buttons: HTMLButtonElement[],
  mode: ButtonMode,
  currentActiveTimers: number[]
): void {
  // Start opacity as 0 if the buttons need to be shown else start at 1.
  let opacity = mode === ButtonMode.SHOW ? 0.0 : 1.0;
  // Hide after 3s but start showing immediately.
  const timeoutTime = mode === ButtonMode.HIDE ? 2000 : 1;
  // Define a isDone, for a shown button the opacity is 1 for a hidden the button, it should be 0.
  const isDone = (value: number) => mode === ButtonMode.SHOW ? value >= 1.0 : value <= 0.0;

  // Kill the current active timers if activated, so that only one will always be running.
  currentActiveTimers.forEach(timer => clearTimeout(timer));
  currentActiveTimers.length = 0;
  // Outer timeout makes sure the vanishing of buttons goes after T seconds.
  const timeoutTimer = setTimeout(() => {
    const timer = setInterval(() => {
      opacity = mode === ButtonMode.SHOW ? opacity + 0.1 : opacity - 0.1;
      buttons.forEach(b => b.style.opacity = opacity.toString());
      if (isDone(opacity)) clearInterval(timer);
    }, 30)
  }, timeoutTime);
  // mark this timer as active.
  currentActiveTimers.push(timeoutTimer)
}
