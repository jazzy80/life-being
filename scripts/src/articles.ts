import { IArticle } from './interfaces/Iarticle';

/*
Setup function, to generate a list page for articles with pagination,
the `url` param is used to fetch the articles from the backend.
*/
export function setUpArticles(url: string): void {
  // fetch articles and use a callback func in the resulting promise.
  fetchArticles(url, 0, (articles: IArticle[], count: number) => {
    // From the articles create a list view in the DOM.
    createListFromArticles(articles);
    // Add the paginator buttons, to navigate through the articles.
    const buttons = createPaginatorButtons();
    attachButtons(buttons);
    // Add the event listeners for the buttons, clicking them will refectch articles from the next batch.
    addPaginatorEventListeners(
      buttons,
      // calculate the total amount of pages.
      Math.ceil(count / articles.length),
      (pageNumber: number) => {
        // refetch articles for the next of previous page, after a click.
        fetchArticles(url, pageNumber, createListFromArticles);
      }
    );
  });
};

function createListFromArticles(articles: IArticle[]) {
  const anchor = getDomAnchor();
  let articleList = document.querySelector('.articles');
  if (articleList) articleList.innerHTML = '';
  else {
    articleList = createArticleList();
    if (anchor) anchor.appendChild(articleList);
  }
  articles.forEach((article: IArticle) => {
    const {date, excerpt, featured_image_url: imageUrl, title, url} = article;
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

function attachButtons(buttons: HTMLDivElement): void {
  const anchor = getDomAnchor();
  if (anchor) {
    anchor.appendChild(buttons);
  }
}

function fetchArticles(
  url: string,
  pageNumber: number,
  callBackFn: (articles: IArticle[], count: number) => void
): void {
  fetch(`${url}/${pageNumber}`).then((response) => response.json()).then((data) => {
    callBackFn(data.blogs, data.count);
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
        <a class="article-title" href="${articleUrl}">${articleTitle}</a>
        <p class="article-date">${articleDate}</p>
        <p class="article-excerpt">${articleExcerpt}</p>`;
  return el;
}

function addPaginatorEventListeners(
  paginatorButtons: HTMLDivElement,
  totalPages: number,
  fetchArticlesFn: (pageNumber: number) => void
): void {
  let pageNumber = 0;
  const prevButton = paginatorButtons.querySelector('.paginator-prev-btn') as HTMLButtonElement;
  const nextButton = paginatorButtons.querySelector('.paginator-next-btn') as HTMLButtonElement;
  prevButton.addEventListener('click', () => {
    if (pageNumber > 0) {
      pageNumber -= 1;
      fetchArticlesFn(pageNumber);
    }
  });
  nextButton.addEventListener('click', () => {
    if (pageNumber < totalPages - 1) {
      pageNumber += 1;
      fetchArticlesFn(pageNumber);
    }
  });
}
