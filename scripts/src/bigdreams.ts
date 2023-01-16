async function init(): Promise<void> {
  let currentPage = 0;
  const category = generateCategoryParam();
  const prevButton = document.querySelector(".prev-btn") as HTMLButtonElement;
  const nextButton = document.querySelector(".next-btn") as HTMLButtonElement;
  setTitle(category.split("=")[1]);
  setUpPage(category, currentPage, [prevButton, nextButton]);
  prevButton.addEventListener("click", () => {
    setUpPage(category, --currentPage, [prevButton, nextButton]);
  });
  nextButton.addEventListener("click", () => {
    setUpPage(category, ++currentPage, [prevButton, nextButton]);
  });
}

async function setUpPage(
  category: string,
  currentPage: number,
  buttons: HTMLButtonElement[]
): Promise<void> {
  const body = await fetchImages(category, currentPage);
  const imageSrcs = body.images;
  const paginationSize = body.paginationSize;
  const amountOfPages =
    imageSrcs.length === 0 ? 0 : Math.ceil(body.count / paginationSize);
  const imageContainer = document.querySelector(
    ".bigdreams-images"
  ) as HTMLDivElement;
  imageContainer.innerHTML = "";
  setPaginationText(currentPage, imageSrcs.length, body.count, paginationSize);
  setButtons(buttons, currentPage, amountOfPages);
  imageSrcs
    .map(createImageFromSrc)
    .forEach((image) => imageContainer.appendChild(image));
}

async function fetchImages(
  category: string,
  page: number
): Promise<{ images: string[]; count: number; paginationSize: number }> {
  const response = await fetch(`/wp-json/api/atelier/${category}&page=${page}`);
  return response.json();
}

function setPaginationText(
  currentPage: number,
  items: number,
  count: number,
  paginationSize: number
): void {
  const paginationText = document.querySelector(
    ".pagination-text"
  ) as HTMLHeadingElement;
  const min = currentPage * paginationSize + 1;
  const max = min + items - 1;
  paginationText.textContent = `Foto's ${min} t/m ${max} getoond van de ${count}`;
}

function setButtons(
  buttons: HTMLButtonElement[],
  currentPage: number,
  amountOfPages: number
): void {
  const [prev, next] = buttons;
  enableButton(prev);
  enableButton(next);
  if (currentPage === 0) disableButton(prev);
  if (currentPage === amountOfPages - 1) disableButton(next);
  buttons.forEach((b) => (b.style.visibility = "visible"));
}

function disableButton(button: HTMLButtonElement): void {
  button.classList.add("paginator-btn-disabled");
  button.disabled = true;
}

function enableButton(button: HTMLButtonElement): void {
  button.classList.remove("paginator-btn-disabled");
  button.disabled = false;
}

function setTitle(category: string): void {
  const title = category.replace(/-/g, " ");
  const titleElement = document.querySelector(
    ".bigdreams-title"
  ) as HTMLHeadElement;
  titleElement.textContent = title;
}

function createImageFromSrc(src: string): HTMLDivElement {
  const imageFrame = document.createElement("div");
  imageFrame.classList.add("image-frame");
  const imageText = document.createElement("span");
  const image = new Image();
  imageFrame.append(image);
  image.src = src;
  return imageFrame;
}

function generateCategoryParam(): string {
  const categoryParam = new URLSearchParams(location.search).get("category");
  return categoryParam ? `?category=${categoryParam}` : "";
}

init();
