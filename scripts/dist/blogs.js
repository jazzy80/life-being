(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setUpBlogs() {
    fetchBlogs(0, function (blogs) {
        createListFromBlogs(blogs);
        createButtons();
    });
}
function createListFromBlogs(blogs) {
    var anchor = getDomAnchor();
    var articleList = document.querySelector('.articles');
    if (articleList)
        articleList.innerHTML = '';
    else {
        articleList = createArticleList();
        if (anchor)
            anchor.appendChild(articleList);
    }
    blogs.forEach(function (blog) {
        var date = blog.date, excerpt = blog.excerpt, imageUrl = blog.featured_image_url, title = blog.title, url = blog.url;
        var articleListElement = createArticleListItem(url, title, date, excerpt, imageUrl);
        if (articleList)
            articleList.appendChild(articleListElement);
    });
}
function createButtons() {
    var anchor = getDomAnchor();
    if (anchor) {
        var paginatorButtons = createPaginatorButtons();
        addPaginatorEventListeners(paginatorButtons);
        anchor.appendChild(paginatorButtons);
    }
}
function fetchBlogs(pageNumber, cb) {
    fetch("/wp-json/api/blogs/".concat(pageNumber)).then(function (response) { return response.json(); }).then(function (data) {
        cb(data.blogs);
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
        ? "<img class=\"article-image\" width=\"180\" heigth=\"135\" src=\"".concat(imageSource, "\">")
        : '';
    el.innerHTML =
        "".concat(image, "\n      <div class=\"article-text\">\n        <a href=\"").concat(articleUrl, "\">").concat(articleTitle, "</a>\n        <p class=\"article-date\">").concat(articleDate, "</p>\n        <p class=\"article-excerpt\">").concat(articleExcerpt, "</p>");
    return el;
}
function addPaginatorEventListeners(paginatorButtons) {
    var pageNumber = 0;
    var prevButton = paginatorButtons.querySelector('.paginator-prev-btn');
    var nextButton = paginatorButtons.querySelector('.paginator-next-btn');
    prevButton.addEventListener('click', function () {
        if (pageNumber > 0) {
            pageNumber -= 1;
            fetchBlogs(pageNumber, createListFromBlogs);
        }
    });
    nextButton.addEventListener('click', function () {
        if (pageNumber < 2) {
            pageNumber += 1;
            fetchBlogs(pageNumber, createListFromBlogs);
        }
    });
}
setUpBlogs();

},{}]},{},[1]);
