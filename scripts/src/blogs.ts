import { IBlog } from './interfaces/Iblog';

function setUpBlogs(): void {
  fetchBlogs(0, (blogs: IBlog[]) => {
    createListFromBlogs(blogs);
    createButtons();
  });
}

function createListFromBlogs(blogs: IBlog[]) {
  const anchor = getDomAnchor();
  let articleList = document.querySelector('.articles');
  if (articleList) articleList.innerHTML = '';
  else {
    articleList = createArticleList();
    if (anchor) anchor.appendChild(articleList);
  }
  blogs.forEach((blog: IBlog) => {
    const {date, excerpt, featured_image_url: imageUrl, title, url} = blog;
    const articleListElement = createArticleListItem(
      url,
      title,
      date,
      excerpt,
      imageUrl
    );
    if (articleList) articleList.appendChild(articleListElement);
  });
}

function createButtons(): void {
  const anchor = getDomAnchor();
  if (anchor) {
    const paginatorButtons = createPaginatorButtons();
    addPaginatorEventListeners(paginatorButtons);
    anchor.appendChild(paginatorButtons);
  }
}

function fetchBlogs(pageNumber: number, cb: (blogs: IBlog[]) => void): void {
  fetch(`/wp-json/api/blogs/${pageNumber}`).then((response) => response.json()).then((data) => {
    cb(data.blogs);
  });
}

function getDomAnchor(): HTMLDivElement | null {
  return document.querySelector('.entry-content');
}

function createArticleList(): HTMLUListElement {
  const el = document.createElement('ul');
  el.classList.add('articles');
  return el;
}

function createPaginatorButtons(): HTMLDivElement {
  const el = document.createElement('div');
  el.classList.add('paginator-btns');
  el.innerHTML =
  `<button class="paginator-prev-btn">Prev</button>
   <button class="paginator-next-btn">Next</button>`;
  return el;
}

function createArticleListItem(
  articleUrl: string,
  articleTitle: string,
  articleDate: string,
  articleExcerpt: string,
  imageSource: string | null
): HTMLLIElement {
  const el =  document.createElement('li')
  el.classList.add('article');
  const image = imageSource
  ? `<img class="article-image" width="180" heigth="135" src="${imageSource}">`
  : '';
  el.innerHTML =
      `${image}
      <div class="article-text">
        <a href="${articleUrl}">${articleTitle}</a>
        <p class="article-date">${articleDate}</p>
        <p class="article-excerpt">${articleExcerpt}</p>`;
  return el;
}

function addPaginatorEventListeners(paginatorButtons: HTMLDivElement): void {
  let pageNumber = 0;
  const prevButton = paginatorButtons.querySelector('.paginator-prev-btn') as HTMLButtonElement;
  const nextButton = paginatorButtons.querySelector('.paginator-next-btn') as HTMLButtonElement;
  prevButton.addEventListener('click', () => {
    if (pageNumber > 0) {
      pageNumber -= 1;
      fetchBlogs(pageNumber, createListFromBlogs);
    }
  });
  nextButton.addEventListener('click', () => {
    if (pageNumber < 2) {
      pageNumber += 1;
      fetchBlogs(pageNumber, createListFromBlogs)
    }
  });
}

setUpBlogs();
