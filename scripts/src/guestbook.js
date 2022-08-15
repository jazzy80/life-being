function init() {
    var addCommentBtn = document.querySelector('.add-comment');
    addCommentBtn === null || addCommentBtn === void 0 ? void 0 : addCommentBtn.addEventListener('click', function () {
        showCommentForm();
    });
}
function showCommentForm() {
    addOverlay();
}
function addOverlay() {
    var overlay = document.createElement('div');
    overlay.classList.add('overlay');
    var body = document.body;
    body.appendChild(overlay);
}
init();
