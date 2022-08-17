import { TextLengthValidator } from './classes/textlengthvalidator';
import { AlphaNumValidator} from './classes/alphanumvalidator';
import { CompositeValidator } from './classes/compositevalidator';

const ADDCOMMENT = '.add-comment';
const CANCELCOMMENT = '.cancel-comment';
const SUBMITCOMMENT = '.submit-comment';
const OVERLAY = '.overlay';
const GUESTBOOKFORM = '.guestbook-form';

function init(): void {
  const addCommentBtn = document.querySelector(ADDCOMMENT);
  addCommentBtn?.addEventListener('click', e => {
    e.preventDefault();
    showCommentModal();
  });
  const cancelCommentBtn = document.querySelector(CANCELCOMMENT);
  cancelCommentBtn?.addEventListener('click', e => {
    e.preventDefault();
    removeCommentModal();
  });
  const submitCommentBtn = document.querySelector(SUBMITCOMMENT);
  submitCommentBtn?.addEventListener('click', e => {
    e.preventDefault();
    validateComment();
  });
}

function showCommentModal(): void {
  addOverlay();
  showCommentForm();
}

function removeCommentModal(): void {
  removeCommentForm();
  removeOverlay();
}

function addOverlay(): void {
  const overlay: HTMLDivElement = document.querySelector(OVERLAY)
    || document.createElement('div');
  overlay.classList.add('overlay');
  const body = document.body;
  body.style.overflowY = 'hidden';
  body.prepend(overlay);
}

function removeOverlay(): void {
  const overlay = document.querySelector(OVERLAY) as HTMLDivElement | null;
  if (overlay) {
    overlay.remove();
    document.body.style.overflowY = 'auto';
  }
}

function showCommentForm(): void {
  const commentForm = document.querySelector(GUESTBOOKFORM) as HTMLFormElement;
  commentForm.style.display = 'flex';
}

function removeCommentForm(): void {
  const commentForm = document.querySelector(GUESTBOOKFORM) as HTMLFormElement;
  commentForm.style.display = 'none';
}

function validateComment(): void {
  const nameField = document.querySelector('.input-name') as HTMLInputElement;
  const commentField = document.querySelector('.comment-text') as HTMLTextAreaElement;
  const name = nameField.value;
  const comment = nameField.value;

  const textLengthValidator = new TextLengthValidator(200);
  const alphanumValidator = new AlphaNumValidator;
  const guestbookValidator = new CompositeValidator(textLengthValidator, alphanumValidator);

  const nameIsValid = guestbookValidator.validate(name);
  const commentIsValid = guestbookValidator.validate(comment);
  if (nameIsValid && commentIsValid) return submitComment();
  if (!nameIsValid) displayNameError();
  if (!commentIsValid) displayCommentError();
}

function submitComment(): void {

}

function displayNameError(): void {

}

function displayCommentError(): void {

}

init();
