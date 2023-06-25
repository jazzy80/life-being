import { Api } from "./config";
import { Product } from "./interfaces/product";

async function init(): Promise<void> {
  const url = new URLSearchParams(document.location.search);
  const productId = url.get("product");
  const [product, _]: Product[] = await Api.GET(`product/${productId}`).then(
    (x) => x.json()
  );
  setUpPage(product);
}

function setUpPage(product: Product): void {
  const image = document.querySelector(".product-image") as HTMLImageElement;
  image.src = product.image_url;
}

init();
