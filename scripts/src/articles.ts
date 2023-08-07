import {IArticle} from "./interfaces/Iarticle";
import {IPage} from "./interfaces/ipage";
import {PreviousPage} from "./classes/previouspage";
import {NextPage} from "./classes/nextpage";

/*
Setup function, to generate a list page for articles with pagination,
the `url` param is used to fetch the articles from the backend.
*/
export function setUpArticles(url: string): void {
  // fetch articles and use a callback func in the resulting promise.
  fetchArticles(url, 0, (articles: IArticle[], count: number) => {
    // From the articles create a list view in the DOM.
    createListFromArticles(articles);
    const totalPages = Math.ceil(count / articles.length);
    if (count > articles.length) {
      // Add the event listeners for the buttons, clicking them will refectch articles from the next batch.
      setUpPaginatorButtons(
        new PreviousPage(0, totalPages),
        new NextPage(0, totalPages),
        // refetch articles for the next or previous page, after a click.
        (pageNumber: number) =>
          fetchArticles(url, pageNumber, createListFromArticles)
      );
    }
  });
}

function createListFromArticles(articles: IArticle[]) {
  const anchor = getDomAnchor();
  // Get the article list if exists else create one and
  // attach the list to the Dom via the anchor element.
  // IIF pattern is used to avoid using a mutable variable.
  const articleList = (document.querySelector(".articles") ||
    createArticleList()) as HTMLUListElement;
  //  if the aricleList was created, it has no parent, in that case it needs to be atached to the DOM.

  if (anchor && articleList.parentNode === null)
    attachElementToAnchor(articleList, anchor);
  // Make sure the list is empty at the start.
  articleList.innerHTML = "";

  // Fill the list with the actual articles.
  articles.forEach((article: IArticle) => {
    const { date, excerpt, featured_image_url: imageUrl, title, url } = article;
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

function attachElementToAnchor(
  element: HTMLElement,
  anchor: HTMLElement | null
): void {
  if (anchor) {
    anchor.appendChild(element);
  }
}

function fetchArticles(
  url: string,
  pageNumber: number,
  callBackFn: (articles: IArticle[], count: number) => void
): void {
  fetch(`${url}/${pageNumber}`)
    .then((response) => response.json())
    .then((data) => {
      callBackFn(data.blogs, data.count);
    });
}

function getDomAnchor(): HTMLDivElement | null {
  return document.querySelector(".entry-content");
}

function createArticleList(): HTMLUListElement {
  const el = document.createElement("ul");
  el.classList.add("articles");
  return el;
}

/*
Factory function to create buttons for the paginator, the prevPage and nextPage
inputs are used to determine wheter the buttons is disabled, e.g. if there are no pages to fetch.
*/
function createPaginatorButtonsWithContainer(
  prevPage: IPage,
  nextPage: IPage
): HTMLDivElement {
  const hasPrevPage = prevPage.nextPredicate(prevPage.pageNumber);
  const hasNextPage = nextPage.nextPredicate(nextPage.pageNumber);
  const el = document.createElement("div");
  el.classList.add("paginator-btns");
  el.innerHTML = `<button
    ${!hasPrevPage ? "disabled" : ""}
    class="paginator-prev-btn ${!hasPrevPage ? "paginator-btn-disabled" : ""}"
    >
      Prev
  </button>
   <button
    ${!hasNextPage ? "disabled" : ""}
    class="paginator-next-btn ${!hasNextPage ? "paginator-btn-disabled" : ""}"
  >
      Next
  </button>`;
  return el;
}

function getPaginatorButtonsContainer(): HTMLDivElement | null {
  return document.querySelector(".paginator-btns") as HTMLDivElement;
}

function getPaginatorButtons(container: HTMLDivElement): HTMLButtonElement[] {
  return [
    container.querySelector(".paginator-prev-btn") as HTMLButtonElement,
    container.querySelector(".paginator-next-btn") as HTMLButtonElement
  ];
}

function createArticleListItem(
  articleUrl: string,
  articleTitle: string,
  articleDate: string,
  articleExcerpt: string,
  imageSource: string | null
): HTMLLIElement {
  const el = document.createElement("li");
  el.classList.add("article");
  const image = imageSource
    ? `<img class="article-image" width="180" heigth="135" src="${imageSource}">`
    : "";
  el.innerHTML = `${image}
      <div class="article-text">
        <a class="article-title" href="${articleUrl}">${articleTitle}</a>
        <p class="article-date">${articleDate}</p>
        <p class="article-excerpt">${articleExcerpt}</p>`;
  return el;
}

function setUpPaginatorButtons(
  prevPage: IPage,
  nextPage: IPage,
  fetchArticlesFn: (pageNumber: number) => void
): void {
  // Create a new set of prev/next buttons for the paginator.
  const buttonsContainer = createPaginatorButtonsWithContainer(
    prevPage,
    nextPage
  );
  // Get the previous attached buttons if they exist.
  const previousButtonsContainer = getPaginatorButtonsContainer();
  // If it already exists swap the old buttons with the new buttons to reset their state.
  // and previous attached eventlisteners.
  if (previousButtonsContainer) {
    const p = previousButtonsContainer.parentNode;
    if (p) p.replaceChild(buttonsContainer, previousButtonsContainer);
  }
  // Else attach the new buttons to the DOM.
  else attachElementToAnchor(buttonsContainer, getDomAnchor());
  // Get the individual buttons from its container.
  const buttons = getPaginatorButtons(buttonsContainer);
  const [prevButton, nextButton] = buttons;
  // Attach the event listeners.
  prevButton.addEventListener(
    "click",
    getButtonEventCb(prevPage, fetchArticlesFn)
  );
  nextButton.addEventListener(
    "click",
    getButtonEventCb(nextPage, fetchArticlesFn)
  );
}

/*
This function will generate the callback function for the paginator buttons
*/
function getButtonEventCb(
  page: IPage,
  fetchArticlesFn: (pageNumber: number) => void
): () => void {
  return () => {
    if (page.nextPredicate(page.pageNumber)) {
      // If there is a next page available in the pagination.
      const nextPageNumber = page.nextPage(page.pageNumber);
      // Fetch the next batch of articles by the new pageNumber.
      fetchArticlesFn(nextPageNumber);
      // Update the eventlisteners with new the page information, so
      // with the next click, the correct batch of articles will be fetched.
      setUpPaginatorButtons(
        new PreviousPage(nextPageNumber, page.totalPages),
        new NextPage(nextPageNumber, page.totalPages),
        fetchArticlesFn
      );
    }
  };
}

setUpArticles("/wp-json/api/articles");
