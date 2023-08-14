import {createLoader} from "./utils/createLoader";
import {Product} from "./api/models/Product";
import {Products} from "./api/models/Products";
import {IProductRepository} from "./api/repositories/interfaces/IProductRepository";
import {ProductRepository} from "./api/repositories/ProductRepository";

class AtelierShop {

    public constructor(private readonly repository: IProductRepository) {}

    public async init(category = ""): Promise<void> {
        const imageContainer = document.querySelector(
            ".ateliershop-images"
        ) as HTMLDivElement;
        imageContainer.innerHTML = "";
        let currentPage = 0;
        const nextButton = document.querySelector(
            ".shop-next-btn"
        ) as HTMLButtonElement;
        // A button is cloned to reset all event listeners on it.
        const newButton = document.createElement("button");
        newButton.textContent = nextButton.innerText;
        newButton.classList.add("shop-next-btn");
        // Replace the old button with the clone.
        nextButton.replaceWith(newButton);
        // Spinning loader.
        const loader = createLoader();
        // Loader is shown instead of the button.
        newButton.replaceWith(loader);
        const body = await this.fetchProducts(0, category);

        // Calculate the total pages of products.
        const amountOfPages =
            body.products.length === 0
                ? 0
                : Math.ceil(body.count / body.paginationSize);

        // Store the processed images.
        const processedImages: HTMLDivElement[] = [];

        // Create new images from the products can cache the result.
        processedImages.push(...(await this.setUpPage(body.products, [])));

        // Remove the "more" button if there are no more products to fetch.
        newButton.style.display = currentPage + 1 >= amountOfPages ? "none" : "block";
        // After loading, replace the spinner with the "more" button.
        loader.replaceWith(newButton);

        // Fetch all categories.
        const categories = new Set(
            [
                ["Alles", ""],
                ...body.products
                    .reduce((acc: string[][], product) => [...acc, ...product.categories.filter(c => !!c.categoryName).map(c => [c.categoryName, c.categorySlug, c.categoryDescription])], [])
            ].map((x) => JSON.stringify(x))
        );

        // Use the categories to populate the categories select filter box.
        this.setFilterMenu(categories);

        // Set up the "More" button.
        newButton.addEventListener("click", async () => {
            const loader = createLoader();
            newButton.replaceWith(loader);
            const newResult = await this.fetchProducts(++currentPage, category);
            processedImages.push(
                ...(await this.setUpPage(newResult.products, processedImages))
            );
            loader.replaceWith(newButton);
            newButton.style.display =
                currentPage + 1 >= amountOfPages ? "none" : "block";
        });
    }

    private async setUpPage(
        products: Product[],
        processed: HTMLDivElement[]
    ): Promise<HTMLDivElement[]> {
        const imageContainer = document.querySelector(
            ".ateliershop-images"
        ) as HTMLDivElement;
        const images = await Promise.all(products.map(this.createProductUIComponent));
        const updatedImages = [...processed, ...images];

        // Check if any images are in portrait mode, then add borders.
        if (
            updatedImages.some((i) => {
                const image = i.querySelector("img") as HTMLImageElement;
                return !this.isLandscape(image);
            })
        )
            updatedImages.forEach(this.addBorderToProduct);

        images.forEach((c) => imageContainer.appendChild(c));
        return updatedImages;
    }

    private async fetchProducts(
        page: number,
        category = ""
    ): Promise<Products> {
        return await this.repository.getProducts(page, category);
    }

    private setFilterMenu(categories: Set<string>): void {
        const filterMenu = document.querySelector("select") as HTMLSelectElement;
        if (filterMenu.querySelector("option")) return;
        if (filterMenu.parentElement)
            filterMenu.parentElement.style.visibility = "visible";

        filterMenu.addEventListener("change", async () => {
            await this.init(filterMenu.value);
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

    private createProductUIComponent(product: Product): Promise<HTMLDivElement> {
        const imageFrame = document.createElement("div");
        imageFrame.classList.add("image-frame");
        const image = new Image();
        image.classList.add("product-image");
        const name = document.createElement("a");
        name.classList.add("product-name");
        const description = document.createElement("p");
        description.classList.add("product-description");
        name.href = `/product-details/?product=${product.id}`;
        name.append(document.createTextNode(product.name));
        description.innerHTML = product.description;
        const productTextContainer = document.createElement("div");
        productTextContainer.classList.add("product-text");
        productTextContainer.append(name, description);
        imageFrame.append(image, productTextContainer);
        image.src = product.imageUrl;
        return new Promise((resolve) => {
            image.onload = () => resolve(imageFrame);
        });
    }

    private addBorderToProduct(imageFrame: HTMLDivElement): void {
        const image = imageFrame.querySelector("img") as HTMLImageElement;
        const name = imageFrame.querySelector(
            ".product-text"
        ) as HTMLParagraphElement;
        if (this.isLandscape(image)) {
            imageFrame.style.borderTop = "1px solid white";
            name.style.borderTop = "1px solid white";
            image.style.maxHeight = "250px";
        } else {
            image.style.maxHeight = "400px";
        }
    }

    private isLandscape(image: HTMLImageElement): boolean {
        return image.height < image.width;
    }
}

new AtelierShop(new ProductRepository()).init().then(r => r);
