//TODO Code opschonen wellicht functioneel krijgen ipv states
export function setUpSlideShow(
    header: HTMLDivElement,
    prevButton: HTMLButtonElement,
    nextButton: HTMLButtonElement,
    images: HTMLImageElement[]
  ): void
  {

    console.log(images);
    if (images.length == 0) return;
    if (images.length == 1) {
      prevButton.style.display = 'none';
      nextButton.style.display = 'none';
      setImage(header, images[0]);
    }
    else {
      resetSlideShow(header, images);
      let index = 0;
      prevButton.addEventListener('click', () => {
        if (index == 0) index = images.length - 1;
        else --index;
        setImage(header, images[index]);
      });

      nextButton.addEventListener('click', () => {
        if (index == images.length - 1) index = 0;
        else ++index;
        setImage(header, images[index]);
      });
    }
};

function resetSlideShow(header: HTMLDivElement, images: HTMLImageElement[]): void {
  header.style.backgroundImage = `url(${images[0].src}`;
}

function setImage(header: HTMLDivElement, image: HTMLImageElement): void {
  header.style.backgroundImage = `url(${image.src})`;
}
