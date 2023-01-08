(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpArticles = void 0;
const previouspage_1 = require("./classes/previouspage");
const nextpage_1 = require("./classes/nextpage");
/*
Setup function, to generate a list page for articles with pagination,
the `url` param is used to fetch the articles from the backend.
*/
function setUpArticles(url) {
    // fetch articles and use a callback func in the resulting promise.
    fetchArticles(url, 0, (articles, count) => {
        // From the articles create a list view in the DOM.
        createListFromArticles(articles);
        const totalPages = Math.ceil(count / articles.length);
        if (count > articles.length) {
            // Add the event listeners for the buttons, clicking them will refectch articles from the next batch.
            setUpPaginatorButtons(new previouspage_1.PreviousPage(0, totalPages), new nextpage_1.NextPage(0, totalPages), 
            // refetch articles for the next or previous page, after a click.
            (pageNumber) => fetchArticles(url, pageNumber, createListFromArticles));
        }
    });
}
exports.setUpArticles = setUpArticles;
function createListFromArticles(articles) {
    const anchor = getDomAnchor();
    // Get the article list if exists else create one and
    // attach the list to the Dom via the anchor element.
    // IIF pattern is used to avoid using a mutable variable.
    const articleList = (document.querySelector('.articles') || createArticleList());
    //  if the aricleList was created, it has no parent, in that case it needs to be atached to the DOM.
    if (anchor && articleList.parentNode === null)
        attachElementToAnchor(articleList, anchor);
    // Make sure the list is empty at the start.
    articleList.innerHTML = '';
    // Fill the list with the actual articles.
    articles.forEach((article) => {
        const { date, excerpt, featured_image_url: imageUrl, title, url } = article;
        const articleListElement = createArticleListItem(url, title, date, excerpt, imageUrl);
        if (articleList)
            articleList.appendChild(articleListElement);
    });
}
function attachElementToAnchor(element, anchor) {
    if (anchor) {
        anchor.appendChild(element);
    }
}
function fetchArticles(url, pageNumber, callBackFn) {
    fetch(`${url}/${pageNumber}`).then((response) => response.json()).then((data) => {
        callBackFn(data.blogs, data.count);
    });
}
function getDomAnchor() {
    return document.querySelector('.entry-content');
}
function createArticleList() {
    const el = document.createElement('ul');
    el.classList.add('articles');
    return el;
}
/*
Factory function to create buttons for the paginator, the prevPage and nextPage
inputs are used to determine wheter the buttons is disabled, e.g. if there are no pages to fetch.
*/
function createPaginatorButtonsWithContainer(prevPage, nextPage) {
    const hasPrevPage = prevPage.nextPredicate(prevPage.pageNumber);
    const hasNextPage = nextPage.nextPredicate(nextPage.pageNumber);
    const el = document.createElement('div');
    el.classList.add('paginator-btns');
    el.innerHTML =
        `<button
    ${!hasPrevPage ? 'disabled' : ''}
    class="paginator-prev-btn ${!hasPrevPage ? 'paginator-btn-disabled' : ''}"
    >
      Prev
  </button>
   <button
    ${!hasNextPage ? 'disabled' : ''}
    class="paginator-next-btn ${!hasNextPage ? 'paginator-btn-disabled' : ''}"
  >
      Next
  </button>`;
    return el;
}
function getPaginatorButtonsContainer() {
    return document.querySelector('.paginator-btns');
}
function getPaginatorButtons(container) {
    return [
        container.querySelector('.paginator-prev-btn'),
        container.querySelector('.paginator-next-btn')
    ];
}
function createArticleListItem(articleUrl, articleTitle, articleDate, articleExcerpt, imageSource) {
    const el = document.createElement('li');
    el.classList.add('article');
    const image = imageSource
        ? `<img class="article-image" width="180" heigth="135" src="${imageSource}">`
        : '';
    el.innerHTML =
        `${image}
      <div class="article-text">
        <a class="article-title" href="${articleUrl}">${articleTitle}</a>
        <p class="article-date">${articleDate}</p>
        <p class="article-excerpt">${articleExcerpt}</p>`;
    return el;
}
function setUpPaginatorButtons(prevPage, nextPage, fetchArticlesFn) {
    // Create a new set of prev/next buttons for the paginator.
    const buttonsContainer = createPaginatorButtonsWithContainer(prevPage, nextPage);
    // Get the previous attached buttons if they exist.
    const previousButtonsContainer = getPaginatorButtonsContainer();
    // If it already exists swap the old buttons with the new buttons to reset their state.
    // and previous attached eventlisteners.
    if (previousButtonsContainer) {
        const p = previousButtonsContainer.parentNode;
        if (p)
            p.replaceChild(buttonsContainer, previousButtonsContainer);
    }
    // Else attach the new buttons to the DOM.
    else
        attachElementToAnchor(buttonsContainer, getDomAnchor());
    // Get the individual buttons from its container.
    const buttons = getPaginatorButtons(buttonsContainer);
    const [prevButton, nextButton] = buttons;
    // Attach the event listeners.
    prevButton.addEventListener('click', getButtonEventCb(prevPage, fetchArticlesFn));
    nextButton.addEventListener('click', getButtonEventCb(nextPage, fetchArticlesFn));
}
/*
This function will generate the callback function for the paginator buttons
*/
function getButtonEventCb(page, fetchArticlesFn) {
    return () => {
        if (page.nextPredicate(page.pageNumber)) {
            // If there is a next page available in the pagination.
            const nextPageNumber = page.nextPage(page.pageNumber);
            // Fetch the next batch of articles by the new pageNumber.
            fetchArticlesFn(nextPageNumber);
            // Update the eventlisteners with new the page information, so
            // with the next click, the correct batch of articles will be fetched.
            setUpPaginatorButtons(new previouspage_1.PreviousPage(nextPageNumber, page.totalPages), new nextpage_1.NextPage(nextPageNumber, page.totalPages), fetchArticlesFn);
        }
    };
}

},{"./classes/nextpage":3,"./classes/previouspage":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const articles_1 = require("./articles");
(0, articles_1.setUpArticles)("/wp-json/api/blogs");

},{"./articles":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextPage = void 0;
class NextPage {
    constructor(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = (pageNumber) => pageNumber + 1;
        this.nextPredicate = (pageNumber) => pageNumber < totalPages - 1;
    }
}
exports.NextPage = NextPage;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousPage = void 0;
class PreviousPage {
    constructor(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = (pageNumber) => pageNumber - 1;
        this.nextPredicate = (pageNumber) => pageNumber > 0;
    }
}
exports.PreviousPage = PreviousPage;

},{}]},{},[2,1]);
