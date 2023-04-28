async function init(): Promise<void> {
  let currentPage = 0;
  const prevButton = document.querySelector(".prev-btn") as HTMLButtonElement;
  const nextButton = document.querySelector(".next-btn") as HTMLButtonElement;
  setUpPage(currentPage, [prevButton, nextButton]);
  prevButton.addEventListener("click", () => {
    setUpPage(--currentPage, [prevButton, nextButton]);
  });
  nextButton.addEventListener("click", () => {
    setUpPage(++currentPage, [prevButton, nextButton]);
  });
}

async function setUpPage(
  currentPage: number,
  buttons: HTMLButtonElement[],
  category = ""
): Promise<void> {
  const body = await fetchProducts(category, currentPage);
  const products = body.products;
  const paginationSize = body.paginationSize;
  const amountOfPages =
    products.length === 0 ? 0 : Math.ceil(body.count / paginationSize);
  const imageContainer = document.querySelector(
    ".bigdreams-images"
  ) as HTMLDivElement;
  const categories = [
    ["Alles", ""],
    ...products
      .map((p) => [p.category_name, p.category_slug])
      .filter(([name, _]) => Boolean(name))
  ];

  imageContainer.innerHTML = "";
  setPaginationText(currentPage, products.length, body.count, paginationSize);
  setFilterMenu(categories, buttons);
  setButtons(buttons, currentPage, amountOfPages);
  products
    .map(createProductUIComponent)
    .forEach((c) => imageContainer.appendChild(c));
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category_name: string;
  category_slug: string;
}

async function fetchProducts(
  category: string,
  page: number
): Promise<{ products: Product[]; count: number; paginationSize: number }> {
  const response = await fetch(
    `/wp-json/api/products/?page=${page}&category=${category}`
  );
  return response.json();
}

function setFilterMenu(
  categories: string[][],
  buttons: HTMLButtonElement[]
): void {
  const filterMenu = document.querySelector("select") as HTMLSelectElement;
  if (filterMenu.querySelector("option")) return;
  filterMenu.addEventListener("change", () => {
    setUpPage(0, buttons, filterMenu.value);
  });
  categories
    .map(([name, slug]) => {
      const option = document.createElement("option");
      option.classList.add("filter-menu");
      option.value = slug;
      option.textContent = name;
      return option;
    })
    .forEach((o) => filterMenu.appendChild(o));
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

function createProductUIComponent(product: Product): HTMLDivElement {
  const imageFrame = document.createElement("div");
  imageFrame.classList.add("image-frame");
  const image = new Image();
  image.classList.add("product-image");
  const name = document.createElement("span");
  name.classList.add("product-name");
  const description = document.createElement("span");
  description.classList.add("product-description");
  const price = document.createElement("span");
  name.classList.add("product-price");
  name.append(document.createTextNode(product.name));
  description.append(document.createTextNode(product.description));
  price.append(
    document.createTextNode(`\u20AC${parseFloat(product.price).toFixed(2)}`)
  );
  imageFrame.append(image, name, description, price);
  image.src = product.image_url;
  return imageFrame;
}

init();
