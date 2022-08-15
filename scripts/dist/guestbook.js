"use strict";
function init() {
    var addCommentBtn = document.querySelector('.add-comment');
    addCommentBtn === null || addCommentBtn === void 0 ? void 0 : addCommentBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showCommentModal();
    });
    var cancelCommentBtn = document.querySelector('.cancel-comment');
    cancelCommentBtn === null || cancelCommentBtn === void 0 ? void 0 : cancelCommentBtn.addEventListener('click', function (e) {
        e.preventDefault();
        removeCommentModal();
    });
}
function showCommentModal() {
    addOverlay();
    showCommentForm();
}
function removeCommentModal() {
    removeCommentForm();
    removeOverlay();
}
function addOverlay() {
    var overlay = document.querySelector('.overlay') || document.createElement('div');
    overlay.classList.add('overlay');
    overlay.style.backgroundColor = 'black';
    var body = document.body;
    body.style.overflowY = 'hidden';
    body.prepend(overlay);
}
function removeOverlay() {
    var overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflowY = 'auto';
    }
}
function showCommentForm() {
    var commentForm = document.querySelector('.guestbook-form');
    commentForm.style.display = 'flex';
}
function removeCommentForm() {
    var commentForm = document.querySelector('.guestbook-form');
    commentForm.style.display = 'none';
}
init();
