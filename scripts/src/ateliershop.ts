async function init(): Promise<void> {
  let currentPage = 0;
  const category = generateCategoryParam();
  const prevButton = document.querySelector(".prev-btn") as HTMLButtonElement;
  const nextButton = document.querySelector(".next-btn") as HTMLButtonElement;
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
  const products = body.products;
  const paginationSize = body.paginationSize;
  const amountOfPages =
    products.length === 0 ? 0 : Math.ceil(body.count / paginationSize);
  const imageContainer = document.querySelector(
    ".bigdreams-images"
  ) as HTMLDivElement;
  imageContainer.innerHTML = "";
  setPaginationText(currentPage, products.length, body.count, paginationSize);
  setButtons(buttons, currentPage, amountOfPages);
  products
    .map(createImageFromSrc)
    .forEach((image) => imageContainer.appendChild(image));
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
}

async function fetchImages(
  category: string,
  page: number
): Promise<{ products: Product[]; count: number; paginationSize: number }> {
  const response = await fetch(`/wp-json/api/products/?page=${page}`);
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
  paginationText.textContent = `Producten ${min} t/m ${max} getoond van de ${count}`;
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

function createImageFromSrc(product: Product): HTMLDivElement {
  const imageFrame = document.createElement("div");
  imageFrame.classList.add("image-frame");
  const image = new Image();
  image.classList.add("product-image");
  const name = document.createElement("span");
  name.classList.add("product-name");
  const price = document.createElement("span");
  name.classList.add("product-price");
  name.append(document.createTextNode(product.name));
  price.append(document.createTextNode(`\u20AC${product.price}`));
  imageFrame.append(image, name, price);
  image.src = product.image_url;
  return imageFrame;
}

function generateCategoryParam(): string {
  const categoryParam = new URLSearchParams(location.search).get("category");
  return categoryParam ? `?category=${categoryParam}` : "";
}

init();
