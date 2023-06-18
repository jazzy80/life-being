async function init(): Promise<void> {
  let currentPage = 0;
  const prevButton = document.querySelector(
    ".shop-prev-btn"
  ) as HTMLButtonElement;
  const nextButton = document.querySelector(
    ".shop-next-btn"
  ) as HTMLButtonElement;
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
  const imageContainer = document.querySelector(
    ".ateliershop-images"
  ) as HTMLDivElement;
  const body = await fetchProducts(category, currentPage);
  const products = body.products;
  const paginationSize = body.paginationSize;
  const amountOfPages =
    products.length === 0 ? 0 : Math.ceil(body.count / paginationSize);
  const categories = new Set(
    [
      ["Alles", ""],
      ...products
        .map((p) => [p.category_name, p.category_slug, p.category_description])
        .filter(([name, _]) => Boolean(name))
      // JSON.stringify is used to ensure all entries are unique for the Set.
      // In JS ["x"] != ["x"].
    ].map((x) => JSON.stringify(x))
  );

  setPaginationText(currentPage, products.length, body.count, paginationSize);
  setFilterMenu(categories, buttons);
  setButtons(buttons, currentPage, amountOfPages);

  const images = await Promise.all(products.map(createProductUIComponent));

  // Check if any images are in portrait mode, then add borders.
  if (
    images.some((i) => {
      const image = i.querySelector("img") as HTMLImageElement;
      return !isLandscape(image);
    })
  )
    images.forEach(addBorderToProduct);

  imageContainer.innerHTML = "";
  images.forEach((c) => imageContainer.appendChild(c));
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category_name: string;
  category_slug: string;
  category_description: string;
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
  categories: Set<string>,
  buttons: HTMLButtonElement[]
): void {
  const filterMenu = document.querySelector("select") as HTMLSelectElement;
  if (filterMenu.querySelector("option")) return;
  filterMenu.addEventListener("change", () => {
    setUpPage(0, buttons, filterMenu.value);
  });
  Array.from(categories)
    .map((json) => JSON.parse(json))
    .map(([name, slug, description]) => {
      const option = document.createElement("option");
      option.classList.add("filter-menu");
      option.value = slug;
      option.textContent = description ? `${name} - ${description}` : `${name}`;
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

function createProductUIComponent(product: Product): Promise<HTMLDivElement> {
  const imageFrame = document.createElement("div");
  imageFrame.classList.add("image-frame");
  const image = new Image();
  image.classList.add("product-image");
  const name = document.createElement("p");
  name.classList.add("product-name");
  const description = document.createElement("p");
  description.classList.add("product-description");
  const price = document.createElement("p");
  price.classList.add("product-price");
  name.append(document.createTextNode(product.name));
  description.append(document.createTextNode(product.description));
  price.append(
    document.createTextNode(
      `Vanaf \u20AC${parseFloat(product.price).toFixed(2)}`
    )
  );
  const productTextContainer = document.createElement("div");
  productTextContainer.classList.add("product-text");
  productTextContainer.append(name, description, price);
  imageFrame.append(image, productTextContainer);
  image.src = product.image_url;
  return new Promise((resolve) => {
    image.onload = () => resolve(imageFrame);
  });
}

function addBorderToProduct(imageFrame: HTMLDivElement): void {
  const image = imageFrame.querySelector("img") as HTMLImageElement;
  const name = imageFrame.querySelector(
    ".product-text"
  ) as HTMLParagraphElement;
  if (isLandscape(image)) {
    imageFrame.style.borderTop = "1px solid white";
    name.style.borderTop = "1px solid white";
    image.style.maxHeight = "250px";
  } else {
    image.style.maxHeight = "400px";
  }
}

function isLandscape(image: HTMLImageElement): boolean {
  return image.height < image.width;
}

init();
