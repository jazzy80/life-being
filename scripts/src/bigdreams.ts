async function init(): Promise<void> {
  let currentPage = 0;
  const prevButtons = document.querySelectorAll(
    ".prev-btn"
  ) as NodeListOf<HTMLButtonElement>;
  const nextButtons = document.querySelectorAll(
    ".next-btn"
  ) as NodeListOf<HTMLButtonElement>;
  setUpPage(currentPage, [prevButtons, nextButtons]);
  prevButtons.forEach((prevButton) => {
    prevButton.addEventListener("click", () => {
      setUpPage(--currentPage, [prevButtons, nextButtons]);
    });
  });
  nextButtons.forEach((nextButton) => {
    nextButton.addEventListener("click", () => {
      setUpPage(++currentPage, [prevButtons, nextButtons]);
    });
  });
}

async function setUpPage(
  currentPage: number,
  buttons: NodeListOf<HTMLButtonElement>[]
): Promise<void> {
  const body = await fetchImages(currentPage);
  const imageSrcs = body.images;
  const amountOfPages = imageSrcs.length === 0 ? 0 : Math.ceil(body.count / 9);
  const imageContainer = document.querySelector(
    ".bigdreams-images"
  ) as HTMLDivElement;
  imageContainer.innerHTML = "";
  const loader = document.querySelector(".loader") as HTMLDivElement;
  const content = document.querySelector(".content") as HTMLDivElement;
  loader.style.display = "block";
  content.style.display = "none";
  setPaginationText(currentPage, imageSrcs.length, body.count);
  setButtons(buttons, currentPage, amountOfPages);
  const images = await Promise.all(imageSrcs.map(createImageFromSrc));
  images.forEach((image) => imageContainer.appendChild(image));
  loader.style.display = "none";
  content.style.display = "flex";
}

async function fetchImages(
  page: number
): Promise<{ images: string[]; count: number }> {
  const response = await fetch(
    `/wp-json/api/atelier/?category=big-dreams&page=${page}`
  );
  return response.json();
}

function setPaginationText(
  currentPage: number,
  items: number,
  count: number
): void {
  const paginationText = document.querySelector(
    ".pagination-text"
  ) as HTMLHeadingElement;
  const min = currentPage * 9 + 1;
  const max = min + items - 1;
  paginationText.textContent = `Foto's ${min} t/m ${max} getoond van de ${count}`;
}

function setButtons(
  buttons: NodeListOf<HTMLButtonElement>[],
  currentPage: number,
  amountOfPages: number
): void {
  const [prevs, nexts] = buttons;
  prevs.forEach((prev) => {
    enableButton(prev);
    if (currentPage === 0) disableButton(prev);
  });
  nexts.forEach((next) => {
    enableButton(next);
    if (currentPage === amountOfPages - 1) disableButton(next);
  });
}

function disableButton(button: HTMLButtonElement): void {
  button.classList.add("paginator-btn-disabled");
  button.style.visibility = "hidden";
}

function enableButton(button: HTMLButtonElement): void {
  button.classList.remove("paginator-btn-disabled");
  button.style.visibility = "visible";
}

function createImageFromSrc(src: string): Promise<HTMLDivElement> {
  const imageFrame = document.createElement("div");
  imageFrame.classList.add("image-frame");
  const imageText = document.createElement("span");
  const image = new Image();
  imageFrame.append(image);
  return new Promise((resolve) => {
    image.src = src;
    image.onload = () => {
      resolve(imageFrame);
    };
  });
}

init();
