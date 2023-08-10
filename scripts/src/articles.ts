import { Article } from "./api/models/Article";
import { ArticleRepository } from "./api/repositories/ArticleRepository";
import { Articles } from "./api/models/Articles";
import { IArticleRepository } from "./api/repositories/IArticleRepository";

const PREVIOUS_BUTTON_NAME = "Vorige";
const NEXT_BUTTON_NAME = "Volgende";
const PREVIOUS_BUTTON_CLASS = "paginator-prev-btn";
const NEXT_BUTTON_CLASS = "paginator-next-btn";
const BUTTON_CONTAINER_CLASS = "paginator-btns";
const BUTTON_DISABLE_CLASS = "paginator-btn-disabled";

const ARTICLE_LIST_CLASS = "articles";
const ARTICLE_ITEM_CLASS = "article";

class ArticlePagination {
  // General state for the pagination.
  private pageNumber = 0;
  private repository: IArticleRepository;

  public constructor(repository: IArticleRepository) {
    this.repository = repository;
  }

  public async setUpArticles(): Promise<void> {
    const { articles, hasNext } = await this.fetchArticles();
    // From the articles create a list view in the DOM.
    this.createListFromArticles(articles);
    // Add the event listeners for the buttons, clicking them will fetch articles from the next batch.
    this.setPaginatorButtons(hasNext);
  }

  private async fetchArticles(): Promise<Articles> {
    return await this.repository.getArticles(this.pageNumber);
  }

  private getDomAnchor(): HTMLDivElement {
    return document.querySelector(".entry-content") as HTMLDivElement;
  }

  private createArticleList(): HTMLUListElement {
    const el = document.createElement("ul");
    el.classList.add(ARTICLE_LIST_CLASS);
    return el;
  }

  private createListFromArticles(articles: Article[]) {
    const anchor = this.getDomAnchor();

    // Get the article list, if it was not previously created, create a new article list DOM element.
    const articleList = (document.querySelector(`.${ARTICLE_LIST_CLASS}`) ||
      this.createArticleList()) as HTMLUListElement;

    //  If the article list was created, it has no parent, in that case it needs to be attached to the DOM.
    if (anchor && articleList.parentNode === null) {
      anchor.appendChild(articleList);
    }

    // Make sure the list is empty at the start.
    articleList.innerHTML = "";

    // Fill the list with the actual articles.
    articles.forEach((article: Article): void => {
      const articleListElement = this.createArticleListItem(article);
      if (articleList) articleList.appendChild(articleListElement);
    });
  }

  private createArticleListItem(article: Article): HTMLLIElement {
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

  private createButtons(): HTMLDivElement {
    const el = document.createElement("div");
    el.classList.add(BUTTON_CONTAINER_CLASS);
    el.innerHTML = `<button class="${PREVIOUS_BUTTON_CLASS}">${PREVIOUS_BUTTON_NAME}</button>
                    <button class="${NEXT_BUTTON_CLASS}">${NEXT_BUTTON_NAME}</button>`;
    const anchor = this.getDomAnchor();
    anchor.appendChild(el);
    return el;
  }

  private disablePaginatorButtonWhen(
    button: HTMLButtonElement,
    predicate: boolean
  ): void {
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
  private setPaginatorButtons(hasNext: boolean): void {
    const hasPrevious = this.pageNumber > 0;

    if (!hasPrevious && !hasNext) {
      return;
    }

    // Check if the buttons already exists, if they do use them else create and attach to the DOM.
    const alreadyCreatedButtons = document.querySelector(
      `.${BUTTON_CONTAINER_CLASS}`
    );
    const buttons = alreadyCreatedButtons
      ? alreadyCreatedButtons
      : this.createButtons();

    const prevButton = buttons.querySelector(
      `.${PREVIOUS_BUTTON_CLASS}`
    ) as HTMLButtonElement;

    const nextButton = buttons.querySelector(
      `.${NEXT_BUTTON_CLASS}`
    ) as HTMLButtonElement;

    this.disablePaginatorButtonWhen(prevButton, !hasPrevious);
    this.disablePaginatorButtonWhen(nextButton, !hasNext);

    // Only add event listeners if the buttons were created.
    if (!alreadyCreatedButtons) {
      prevButton.addEventListener("click", async () => {
        this.pageNumber = this.pageNumber > 0 ? this.pageNumber - 1 : 0;
        await this.setUpArticles();
      });

      nextButton.addEventListener("click", async () => {
        this.pageNumber = hasNext ? this.pageNumber + 1 : this.pageNumber;
        await this.setUpArticles();
      });
    }
  }
}

new ArticlePagination(new ArticleRepository()).setUpArticles();
