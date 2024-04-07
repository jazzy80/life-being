import {ProductRepository} from "./api/repositories/ProductRepository";
import {Product} from "./api/models/Product";
import {ProductOption} from "./api/models/ProductOption";

const selectedOptions: Set<ProductOption> = new Set();

async function init(repository: ProductRepository): Promise<void> {
    await createProductDetail(repository);
}

async function createProductDetail(repository: ProductRepository): Promise<void> {
    const productId = new URLSearchParams(location.search).get("product");
    if (!productId) {
        throw new Error("Product id could not be parsed from the url.");
    }
    const product = await repository.getProductById(parseInt(productId));
    setProductOptionsEventHandlers(product);
}

function setProductOptionsEventHandlers(product: Product) {
    const productOptions: {[id: number]: ProductOption} = product.productOptions.reduce(
        (acc, productOption) => ({...acc, [productOption.id]: productOption}),
    {});
    const choices: HTMLInputElement[] = Array.from(document.querySelectorAll("form input"));
    const totalPriceElement = document.querySelector(".price") as HTMLDivElement;
    choices.forEach(c => c.addEventListener(
        "change", () => {
            const selectedOption = productOptions[parseInt(c.value)];
            if (c.checked) {
                selectedOptions.add(selectedOption);
            }
            else {
                selectedOptions.delete(selectedOption);
            }
            const optionsTotalPrice = Array
                .from(selectedOptions)
                .reduce((x, y) => x + y.price, 0.0);
            totalPriceElement.textContent = `€${product.price + optionsTotalPrice}`;
        }
    ));
}

init(new ProductRepository()).then(r => r);

