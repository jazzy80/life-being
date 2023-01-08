import { FieldValidator } from "./interfaces/fieldvalidator";
import { TextLengthValidator } from "./classes/textlengthvalidator";
import { AlphaNumValidator } from "./classes/alphanumvalidator";
import { CompositeValidator } from "./classes/compositevalidator";
import { FormField } from "./types/formfield";
import { addOverlay, removeOverlay } from "./utils/overlay";

const ADDCOMMENT_SELECTOR = ".add-comment";
const CANCELCOMMENT_SELECTOR = ".cancel-comment";
const SUBMITCOMMENT_SELECTOR = ".submit-comment";
const GUESTBOOKFORM_SELECTOR = ".guestbook-form";

const ERROR = "error";
const ERROR_COLOR = "red";
const NEUTRAL_COLOR = "black";

const GUESTBOOK_POST_URL = "/wp-json/api/guestbook/";

const TEXTMAXLENGTH = 200;

function init(): void {
  const form = getCommentForm();
  const nameField = document.querySelector(".input-name") as HTMLInputElement;
  const commentField = document.querySelector(
    ".comment-text"
  ) as HTMLTextAreaElement;
  const formFields = [nameField, commentField];

  const addCommentBtn = document.querySelector(
    ADDCOMMENT_SELECTOR
  ) as HTMLAnchorElement;
  addCommentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showCommentModal(form, formFields);
  });
  const cancelCommentBtn = document.querySelector(
    CANCELCOMMENT_SELECTOR
  ) as HTMLButtonElement;
  cancelCommentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    removeCommentModal(form, formFields);
  });
  const submitCommentBtn = document.querySelector(
    SUBMITCOMMENT_SELECTOR
  ) as HTMLButtonElement;
  submitCommentBtn.addEventListener("click", (e) => {
    removeErrors();
    e.preventDefault();
    validateFormFields(form, formFields);
  });
}

function getCommentForm(): HTMLFormElement {
  return document.querySelector(GUESTBOOKFORM_SELECTOR) as HTMLFormElement;
}

function showCommentModal(form: HTMLFormElement, fields: FormField[]): void {
  addOverlay();
  showForm(form);
  resetForm(fields);
}

function removeCommentModal(form: HTMLFormElement, fields: FormField[]): void {
  hideForm(form);
  removeOverlay();
  resetForm(fields);
}

function showForm(form: HTMLFormElement): void {
  form.style.display = "flex";
}

function hideForm(form: HTMLFormElement): void {
  form.style.display = "none";
}

function validateFormFields(form: HTMLFormElement, fields: FormField[]): void {
  const guestBookValidator = createGuestBookValidator();
  const invalidFields = fields.filter(
    (field) => !guestBookValidator.validate(field)
  );
  if (invalidFields.length === 0) return submitComment(form, fields);

  generateErrors(guestBookValidator, invalidFields);
}

function generateErrors(validator: FieldValidator, fields: FormField[]): void {
  fields.forEach((field) => {
    displayError(field, validator.getError(field));
  });
}

function createGuestBookValidator(): FieldValidator {
  return new CompositeValidator(
    new TextLengthValidator(TEXTMAXLENGTH),
    new AlphaNumValidator()
  );
}

function submitComment(form: HTMLFormElement, fields: FormField[]): void {
  const body = fields.reduce(
    (acc: object, field: FormField) => ({ [field.name]: field.value, ...acc }),
    {}
  );
  fetch(GUESTBOOK_POST_URL, {
    method: "POST",
    body: JSON.stringify(body)
  }).then(() => {
    removeCommentModal(form, fields);
    location.reload();
  });
}

function displayError(field: FormField, errorMsg: string): void {
  field.style.borderColor = ERROR_COLOR;
  const errorField = createErrorText(errorMsg);
  field.after(errorField);
}

function createErrorText(errorMsg: string): HTMLParagraphElement {
  const pElement = document.createElement("p");
  pElement.classList.add(ERROR);
  pElement.innerText = errorMsg;
  return pElement;
}

function resetForm(fields: FormField[]): void {
  fields.forEach((field) => {
    field.value = "";
    field.style.borderColor = NEUTRAL_COLOR;
  });
  removeErrors();
}

function removeErrors(): void {
  const errorFields = document.getElementsByClassName(ERROR);
  Array.prototype.slice.call(errorFields).forEach((field) => field.remove());
}

init();
