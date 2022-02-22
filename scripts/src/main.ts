import { setUpSlideShow } from "./slideshow";

const header = document.querySelector('.header')as HTMLDivElement;
const prevButton = document.querySelector('.prev-button') as HTMLButtonElement;
const nextButton = document.querySelector('.next-button') as HTMLButtonElement;
const page = window.location.href.split('/')[4] || 'home';
const files = fetch(`/gallery/?page=${page}`);

files.then( resp => resp.json()).then(json => {
  if (header && prevButton && nextButton)
    setUpSlideShow(
      header,
      prevButton,
      nextButton,
      json.imageFiles.map( (f: string) => {
        const image = new Image();
        image.src = f;
        return image;
      })
    );
  });
