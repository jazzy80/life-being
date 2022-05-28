"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpArticles = void 0;
function setUpArticles(url) {
    fetchArticles(url, 0, function (articles, count) {
        createListFromArticles(articles);
        var buttons = createPaginatorButtons();
        attachButtons(buttons);
        addPaginatorEventListeners(buttons, Math.ceil(count / articles.length), function (pageNumber) {
            fetchArticles(url, pageNumber, createListFromArticles);
        });
    });
}
exports.setUpArticles = setUpArticles;
;
function createListFromArticles(articles) {
    var anchor = getDomAnchor();
    var articleList = document.querySelector('.articles');
    if (articleList)
        articleList.innerHTML = '';
    else {
        articleList = createArticleList();
        if (anchor)
            anchor.appendChild(articleList);
    }
    articles.forEach(function (article) {
        var date = article.date, excerpt = article.excerpt, imageUrl = article.featured_image_url, title = article.title, url = article.url;
        var articleListElement = createArticleListItem(url, title, date, excerpt, imageUrl);
        if (articleList)
            articleList.appendChild(articleListElement);
    });
}
function attachButtons(buttons) {
    var anchor = getDomAnchor();
    if (anchor) {
        anchor.appendChild(buttons);
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
function createPaginatorButtons() {
    var el = document.createElement('div');
    el.classList.add('paginator-btns');
    el.innerHTML =
        "<button class=\"paginator-prev-btn\">Prev</button>\n   <button class=\"paginator-next-btn\">Next</button>";
    return el;
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
function addPaginatorEventListeners(paginatorButtons, totalPages, fetchArticlesFn) {
    var pageNumber = 0;
    var prevButton = paginatorButtons.querySelector('.paginator-prev-btn');
    var nextButton = paginatorButtons.querySelector('.paginator-next-btn');
    prevButton.addEventListener('click', function () {
        if (pageNumber > 0) {
            pageNumber -= 1;
            fetchArticlesFn(pageNumber);
        }
    });
    nextButton.addEventListener('click', function () {
        if (pageNumber < totalPages - 1) {
            pageNumber += 1;
            fetchArticlesFn(pageNumber);
        }
    });
}
