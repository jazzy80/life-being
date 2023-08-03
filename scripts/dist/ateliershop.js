"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api/api");
const createLoader_1 = require("./utils/createLoader");
const product_1 = require("./interfaces/product");
function init(category = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const imageContainer = document.querySelector(".ateliershop-images");
        imageContainer.innerHTML = "";
        let currentPage = 0;
        const nextButton = document.querySelector(".shop-next-btn");
        // A button is cloned to reset all eventlisteners on it.
        const newButton = document.createElement("button");
        newButton.textContent = nextButton.innerText;
        newButton.classList.add("shop-next-btn");
        // Replace the old button with the clone.
        nextButton.replaceWith(newButton);
        // Spinning loader.
        const loader = createLoader_1.createLoader();
        // Loader is shown instead of the button.
        newButton.replaceWith(loader);
        const body = yield fetchProducts(0, category);
        // Calculate the total pages of products.
        const amountOfPages = body.products.length === 0
            ? 0
            : Math.ceil(body.count / body.paginationSize);
        // Store the processed images.
        const processedImages = [];
        // Create new images from the products can cache the result.
        processedImages.push(...(yield setUpPage(body.products, [])));
        // Remove the "more" button if there are no more products to fetch.
        newButton.style.display = currentPage + 1 >= amountOfPages ? "none" : "block";
        // After loading, replace the spinner with the "more" button.
        loader.replaceWith(newButton);
        // Fetch all categories.
        const categories = new Set([
            ["Alles", ""],
            ...body.products
                .map((p) => [p.categoryName, p.categorySlug, p.categoryDescription])
                .filter(([name, _]) => Boolean(name))
            // JSON.stringify is used to ensure all entries are unique for the Set.
            // In JS ["x"] != ["x"].
        ].map((x) => JSON.stringify(x)));
        // Use the categories to populate the categories select filter box.
        setFilterMenu(categories);
        // Setup the "More" button.
        newButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const loader = createLoader_1.createLoader();
            newButton.replaceWith(loader);
            const newResult = yield fetchProducts(++currentPage, category);
            processedImages.push(...(yield setUpPage(newResult.products, processedImages)));
            loader.replaceWith(newButton);
            newButton.style.display =
                currentPage + 1 >= amountOfPages ? "none" : "block";
        }));
    });
}
function setUpPage(products, processed) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageContainer = document.querySelector(".ateliershop-images");
        const images = yield Promise.all(products.map(createProductUIComponent));
        const updatedImages = [...processed, ...images];
        // Check if any images are in portrait mode, then add borders.
        if (updatedImages.some((i) => {
            const image = i.querySelector("img");
            return !isLandscape(image);
        }))
            updatedImages.forEach(addBorderToProduct);
        images.forEach((c) => imageContainer.appendChild(c));
        return updatedImages;
    });
}
function fetchProducts(page, category = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield api_1.Api.GET(`products/?page=${page}&category=${category}`);
        const json = yield response.json();
        return {
            products: json.products.map(product_1.FromJSON),
            count: json.count,
            paginationSize: json.paginationSize
        };
    });
}
function setFilterMenu(categories) {
    const filterMenu = document.querySelector("select");
    if (filterMenu.querySelector("option"))
        return;
    if (filterMenu.parentElement)
        filterMenu.parentElement.style.visibility = "visible";
    filterMenu.addEventListener("change", () => {
        init(filterMenu.value);
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
function createProductUIComponent(product) {
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
function addBorderToProduct(imageFrame) {
    const image = imageFrame.querySelector("img");
    const name = imageFrame.querySelector(".product-text");
    if (isLandscape(image)) {
        imageFrame.style.borderTop = "1px solid white";
        name.style.borderTop = "1px solid white";
        image.style.maxHeight = "250px";
    }
    else {
        image.style.maxHeight = "400px";
    }
}
function isLandscape(image) {
    return image.height < image.width;
}
init();
//# sourceMappingURL=ateliershop.js.map