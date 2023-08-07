import { Api } from "./api/api";
import { Product as ApiProduct } from "./api/models/product";
import { Product, FromJSON } from "./interfaces/product";

const PRODUCT_DETAIL_CLASS = "product-detail";
const DETAIL_ROW_CLASS = "detail-row";
const BUY_BTN_CLASS = "buy-btn";
const BUY_STRING = "Koop";
const PRODUCT_DETAIL_IMAGE_CLASS = "product-detail-image";

async function init(): Promise<void> {
  const url = new URLSearchParams(document.location.search);
  const productId = url.get("product");
  const [product, _]: ApiProduct[] = await Api.GET(`product/${productId}`).then(
    (x) => x.json()
  );
  setUpPage(FromJSON(product));
}

function setUpPage(product: Product): void {
  createProductRow(product);
}

init();

function createProductRow(product: Product): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const row = document.querySelector(
      `.${DETAIL_ROW_CLASS}`
    ) as HTMLDivElement;
    const image = document.querySelector(
      `.${PRODUCT_DETAIL_IMAGE_CLASS}`
    ) as HTMLImageElement;
    image.src = product.imageUrl;
    image.onload = () => resolve(image);
    const productDetails = document.createElement("div");
    productDetails.classList.add(PRODUCT_DETAIL_CLASS);
    const productName = document.createElement("h1");
    productName.innerHTML = product.name;
    const price = document.createElement("h3");
    price.textContent = `\u20AC ${parseFloat(product.price).toFixed(2)}`;
    productDetails.append(productName, price);
    row.before(productDetails, image);
    const category = document.createElement("p");
    category.innerHTML = product.categoryName ?? "";
    const description = document.createElement("p");
    description.innerHTML = product.description;
    const details = document.createElement("p");
    details.innerHTML = product.detailText ?? "";
    const productOptions = document.createElement("form");
    productOptions.innerHTML = `<label>Kies jouw opties:</label><input type="checkbox">Met Lijst</input>
     <input type="checkbox">Fine Arts</input>`;
    const buyButton = document.createElement("button");
    buyButton.classList.add(BUY_BTN_CLASS);
    buyButton.innerHTML = BUY_STRING;
    row.append(category, description, details, productOptions, buyButton);
  });
}
