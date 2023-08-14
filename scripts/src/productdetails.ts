import {Product} from "./api/models/Product";
import {IProductRepository} from "./api/repositories/interfaces/IProductRepository";
import {ProductRepository} from "./api/repositories/ProductRepository";

const PRODUCT_DETAIL_CLASS = "product-detail";
const DETAIL_ROW_CLASS = "detail-row";
const BUY_BTN_CLASS = "buy-btn";
const BUY_STRING = "Koop";
const PRODUCT_DETAIL_IMAGE_CLASS = "product-detail-image";

async function init(repository: IProductRepository): Promise<void> {
    const url = new URLSearchParams(document.location.search);
    const productId = url.get("product");

    if (!productId) {
        throw new Error("No product id was provided.");
    }

    const product = await repository.getProductById(parseInt(productId));
    createProductDetail(product);
    return Promise.resolve();
}

function createProductDetail(product: Product): void {
    const row = document.querySelector(
        `.${DETAIL_ROW_CLASS}`
    ) as HTMLDivElement;
    const image = document.querySelector(
        `.${PRODUCT_DETAIL_IMAGE_CLASS}`
    ) as HTMLImageElement;

    image.src = product.imageUrl;
    const productDetails = createProductDetailsElement();
    const productName = createProductNameElement(product);
    const price = createPriceElement(product);

    productDetails.append(productName, price);
    row.before(productDetails, image);

    const category = createCategoryElement(product);
    const description = createDescriptionElement(product);

    const details = createDetailsTextElement(product);

    const productOptions = createProductOptions();
    const buyButton = createBuyButton();

    row.append(category, description, details, productOptions, buyButton);
}

function createProductDetailsElement(): HTMLDivElement {
    const productDetails = document.createElement("div");
    productDetails.classList.add(PRODUCT_DETAIL_CLASS);
    return productDetails;
}

function createProductNameElement(product: Product): HTMLHeadingElement {
    const productName = document.createElement("h1");
    productName.innerHTML = product.name;
    return productName;
}

function createPriceElement(product: Product): HTMLHeadingElement {
    const price = document.createElement("h3");
    price.textContent = `\u20AC ${product.price.toFixed(2)}`;
    return price;
}

function createCategoryElement(product: Product): HTMLParagraphElement {
    const category = document.createElement("p");
    category.innerHTML = product.categories[0].categoryName ?? "";
    return category;
}

function createDescriptionElement(product: Product): HTMLParagraphElement {
    const description = document.createElement("p");
    description.innerHTML = product.description;
    return description;
}

function createDetailsTextElement(product: Product): HTMLSpanElement {
    const details = document.createElement("span");
    details.classList.add('details-text');
    details.innerHTML = `<pre> ${product.detailText ?? ""} </pre>`;
    return details;
}

function createProductOptions(): HTMLFormElement {
    const productOptions = document.createElement("form");
    productOptions.innerHTML = `<label>Kies jouw opties:</label><input type="checkbox">Met Lijst</input>
     <input type="checkbox">Fine Arts</input>`;
    return productOptions;
}

function createBuyButton(): HTMLButtonElement {
    const buyButton = document.createElement("button");
    buyButton.classList.add(BUY_BTN_CLASS);
    buyButton.innerHTML = BUY_STRING;
    return buyButton;
}

init(new ProductRepository()).then(r => r);

