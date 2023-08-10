(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
exports.Api = void 0;
const baseUrl = "/wp-json/api/";
exports.Api = {
    GET(url, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlParams = queryParams ? `?${new URLSearchParams(queryParams)}` : "";
            return yield fetch(`${baseUrl}${url}${urlParams}`);
        });
    },
    POST(url, dataBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`${baseUrl}${url}`, { method: "POST", body: dataBody });
        });
    }
};

},{}],2:[function(require,module,exports){
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
exports.ArticleRepository = void 0;
const Api_1 = require("../Api");
class ArticleRepository {
    getArticles(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Api_1.Api.GET('articles/', { page: pageNumber.toString() });
            const json = yield resp.json();
            const articles = json.articles;
            return {
                count: json.count,
                hasNext: json["has_next"],
                articles: articles.map(a => ({
                    title: a.title,
                    date: a.date,
                    url: a.url,
                    excerpt: a.excerpt,
                    featuredImageUrl: a.featured_image_url,
                }))
            };
        });
    }
}
exports.ArticleRepository = ArticleRepository;

},{"../Api":1}],3:[function(require,module,exports){
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
const ArticleRepository_1 = require("./api/repositories/ArticleRepository");
const PREVIOUS_BUTTON_NAME = "Vorige";
const NEXT_BUTTON_NAME = "Volgende";
const PREVIOUS_BUTTON_CLASS = "paginator-prev-btn";
const NEXT_BUTTON_CLASS = "paginator-next-btn";
const BUTTON_CONTAINER_CLASS = "paginator-btns";
const BUTTON_DISABLE_CLASS = "paginator-btn-disabled";
const ARTICLE_LIST_CLASS = "articles";
const ARTICLE_ITEM_CLASS = "article";
class ArticlePagination {
    constructor(repository) {
        // General state for the pagination.
        this.pageNumber = 0;
        this.repository = repository;
    }
    setUpArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            const { articles, hasNext } = yield this.fetchArticles();
            // From the articles create a list view in the DOM.
            this.createListFromArticles(articles);
            // Add the event listeners for the buttons, clicking them will fetch articles from the next batch.
            this.setPaginatorButtons(hasNext);
        });
    }
    fetchArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getArticles(this.pageNumber);
        });
    }
    getDomAnchor() {
        return document.querySelector(".entry-content");
    }
    createArticleList() {
        const el = document.createElement("ul");
        el.classList.add(ARTICLE_LIST_CLASS);
        return el;
    }
    createListFromArticles(articles) {
        const anchor = this.getDomAnchor();
        // Get the article list, if it was not previously created, create a new article list DOM element.
        const articleList = (document.querySelector(`.${ARTICLE_LIST_CLASS}`) ||
            this.createArticleList());
        //  If the article list was created, it has no parent, in that case it needs to be attached to the DOM.
        if (anchor && articleList.parentNode === null) {
            anchor.appendChild(articleList);
        }
        // Make sure the list is empty at the start.
        articleList.innerHTML = "";
        // Fill the list with the actual articles.
        articles.forEach((article) => {
            const articleListElement = this.createArticleListItem(article);
            if (articleList)
                articleList.appendChild(articleListElement);
        });
    }
    createArticleListItem(article) {
        const el = document.createElement("li");
        el.classList.add(ARTICLE_ITEM_CLASS);
        const image = `<img class="article-image" src="${article.featuredImageUrl}" alt="">`;
        el.innerHTML = `${image}
      <div class="article-text">
        <a class="article-title" href="${article.url}">${article.title}</a>
        <p class="article-date">${article.date}</p>
        <p class="article-excerpt">${article.excerpt}</p>`;
        return el;
    }
    createButtons() {
        const el = document.createElement("div");
        el.classList.add(BUTTON_CONTAINER_CLASS);
        el.innerHTML = `<button class="${PREVIOUS_BUTTON_CLASS}">${PREVIOUS_BUTTON_NAME}</button>
                    <button class="${NEXT_BUTTON_CLASS}">${NEXT_BUTTON_NAME}</button>`;
        const anchor = this.getDomAnchor();
        anchor.appendChild(el);
        return el;
    }
    disablePaginatorButtonWhen(button, predicate) {
        if (predicate && !button.disabled) {
            button.classList.add(BUTTON_DISABLE_CLASS);
            button.disabled = true;
        }
        if (!predicate && button.disabled) {
            button.classList.remove(BUTTON_DISABLE_CLASS);
            button.disabled = false;
        }
    }
    /*
  Factory function to create buttons for the paginator, the prevPage and nextPage
  inputs are used to determine whether the buttons is disabled, e.g. if there are no pages to fetch.
  */
    setPaginatorButtons(hasNext) {
        const hasPrevious = this.pageNumber > 0;
        if (!hasPrevious && !hasNext) {
            return;
        }
        // Check if the buttons already exists, if they do use them else create and attach to the DOM.
        const alreadyCreatedButtons = document.querySelector(`.${BUTTON_CONTAINER_CLASS}`);
        const buttons = alreadyCreatedButtons
            ? alreadyCreatedButtons
            : this.createButtons();
        const prevButton = buttons.querySelector(`.${PREVIOUS_BUTTON_CLASS}`);
        const nextButton = buttons.querySelector(`.${NEXT_BUTTON_CLASS}`);
        this.disablePaginatorButtonWhen(prevButton, !hasPrevious);
        this.disablePaginatorButtonWhen(nextButton, !hasNext);
        // Only add event listeners if the buttons were created.
        if (!alreadyCreatedButtons) {
            prevButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                this.pageNumber = this.pageNumber > 0 ? this.pageNumber - 1 : 0;
                yield this.setUpArticles();
            }));
            nextButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                this.pageNumber = hasNext ? this.pageNumber + 1 : this.pageNumber;
                yield this.setUpArticles();
            }));
        }
    }
}
new ArticlePagination(new ArticleRepository_1.ArticleRepository()).setUpArticles();

},{"./api/repositories/ArticleRepository":2}]},{},[3]);
