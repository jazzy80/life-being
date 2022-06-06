"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpArticles = void 0;
var previouspage_1 = require("./classes/previouspage");
var nextpage_1 = require("./classes/nextpage");
/*
Setup function, to generate a list page for articles with pagination,
the `url` param is used to fetch the articles from the backend.
*/
function setUpArticles(url) {
    // fetch articles and use a callback func in the resulting promise.
    fetchArticles(url, 0, function (articles, count) {
        // From the articles create a list view in the DOM.
        createListFromArticles(articles);
        var totalPages = Math.ceil(count / articles.length);
        if (count > articles.length) {
            // Add the event listeners for the buttons, clicking them will refectch articles from the next batch.
            setUpPaginatorButtons(new previouspage_1.PreviousPage(0, totalPages), new nextpage_1.NextPage(0, totalPages), 
            // refetch articles for the next or previous page, after a click.
            function (pageNumber) { return fetchArticles(url, pageNumber, createListFromArticles); });
        }
    });
}
exports.setUpArticles = setUpArticles;
function createListFromArticles(articles) {
    var anchor = getDomAnchor();
    // Get the article list if exists else create one and
    // attach the list to the Dom via the anchor element.
    // IIF pattern is used to avoid using a mutable variable.
    var articleList = (document.querySelector('.articles') || createArticleList());
    //  if the aricleList was created, it has no parent, in that case it needs to be atached to the DOM.
    if (anchor && articleList.parentNode === null)
        attachElementToAnchor(articleList, anchor);
    // Make sure the list is empty at the start.
    articleList.innerHTML = '';
    // Fill the list with the actual articles.
    articles.forEach(function (article) {
        var date = article.date, excerpt = article.excerpt, imageUrl = article.featured_image_url, title = article.title, url = article.url;
        var articleListElement = createArticleListItem(url, title, date, excerpt, imageUrl);
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
    fetch(url + "/" + pageNumber).then(function (response) { return response.json(); }).then(function (data) {
        callBackFn(data.blogs, data.count);
    });
}
function getDomAnchor() {
    return document.querySelector('.entry-content');
}
function createArticleList() {
    var el = document.createElement('ul');
    el.classList.add('articles');
    return el;
}
/*
Factory function to create buttons for the paginator, the prevPage and nextPage
inputs are used to determine wheter the buttons is disabled, e.g. if there are no pages to fetch.
*/
function createPaginatorButtonsWithContainer(prevPage, nextPage) {
    var hasPrevPage = prevPage.nextPredicate(prevPage.pageNumber);
    var hasNextPage = nextPage.nextPredicate(nextPage.pageNumber);
    var el = document.createElement('div');
    el.classList.add('paginator-btns');
    el.innerHTML =
        "<button\n    " + (!hasPrevPage ? 'disabled' : '') + "\n    class=\"paginator-prev-btn " + (!hasPrevPage ? 'paginator-btn-disabled' : '') + "\"\n    >\n      Prev\n  </button>\n   <button\n    " + (!hasNextPage ? 'disabled' : '') + "\n    class=\"paginator-next-btn " + (!hasNextPage ? 'paginator-btn-disabled' : '') + "\"\n  >\n      Next\n  </button>";
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
    var el = document.createElement('li');
    el.classList.add('article');
    var image = imageSource
        ? "<img class=\"article-image\" width=\"180\" heigth=\"135\" src=\"" + imageSource + "\">"
        : '';
    el.innerHTML =
        image + "\n      <div class=\"article-text\">\n        <a class=\"article-title\" href=\"" + articleUrl + "\">" + articleTitle + "</a>\n        <p class=\"article-date\">" + articleDate + "</p>\n        <p class=\"article-excerpt\">" + articleExcerpt + "</p>";
    return el;
}
function setUpPaginatorButtons(prevPage, nextPage, fetchArticlesFn) {
    // Create a new set of prev/next buttons for the paginator.
    var buttonsContainer = createPaginatorButtonsWithContainer(prevPage, nextPage);
    // Get the previous attached buttons if they exist.
    var previousButtonsContainer = getPaginatorButtonsContainer();
    // If it already exists swap the old buttons with the new buttons to reset their state.
    // and previous attached eventlisteners.
    if (previousButtonsContainer) {
        var p = previousButtonsContainer.parentNode;
        if (p)
            p.replaceChild(buttonsContainer, previousButtonsContainer);
    }
    // Else attach the new buttons to the DOM.
    else
        attachElementToAnchor(buttonsContainer, getDomAnchor());
    // Get the individual buttons from its container.
    var buttons = getPaginatorButtons(buttonsContainer);
    var prevButton = buttons[0], nextButton = buttons[1];
    // Attach the event listeners.
    prevButton.addEventListener('click', getButtonEventCb(prevPage, fetchArticlesFn));
    nextButton.addEventListener('click', getButtonEventCb(nextPage, fetchArticlesFn));
}
/*
This function will generate the callback function for the paginator buttons
*/
function getButtonEventCb(page, fetchArticlesFn) {
    return function () {
        if (page.nextPredicate(page.pageNumber)) {
            // If there is a next page available in the pagination.
            var nextPageNumber = page.nextPage(page.pageNumber);
            // Fetch the next batch of articles by the new pageNumber.
            fetchArticlesFn(nextPageNumber);
            // Update the eventlisteners with new the page information, so
            // with the next click, the correct batch of articles will be fetched.
            setUpPaginatorButtons(new previouspage_1.PreviousPage(nextPageNumber, page.totalPages), new nextpage_1.NextPage(nextPageNumber, page.totalPages), fetchArticlesFn);
        }
    };
}
