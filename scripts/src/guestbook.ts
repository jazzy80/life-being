import {FieldValidator} from "./validators/FieldValidator";
import {TextLengthValidator} from "./validators/TextLengthValidator";
import {AlphanumericValidator} from "./validators/AlphanumericValidator";
import {CompositeValidator} from "./validators/CompositeValidator";
import {FormField} from "./types/FormField";
import {addOverlay, removeOverlay} from "./utils/overlay";
import {GuestBookRepository} from "./api/repositories/GuestBookRepository";

const ADD_COMMENT_SELECTOR = ".add-comment";
const CANCEL_COMMENT_SELECTOR = ".cancel-comment";
const SUBMIT_COMMENT_SELECTOR = ".submit-comment";
const GUEST_BOOK_FORM_SELECTOR = ".guestbook-form";

const ERROR = "error";
const ERROR_COLOR = "red";
const NEUTRAL_COLOR = "black";

const TEXT_MAX_LENGTH = 200;

function init(): void {
    const form = getCommentForm();
    const nameField = document.querySelector(".input-name") as HTMLInputElement;
    const commentField = document.querySelector(
        ".comment-text"
    ) as HTMLTextAreaElement;
    const formFields = [nameField, commentField];

    const addCommentBtn = document.querySelector(
        ADD_COMMENT_SELECTOR
    ) as HTMLAnchorElement;
    addCommentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showCommentModal(form, formFields);
    });
    const cancelCommentBtn = document.querySelector(
        CANCEL_COMMENT_SELECTOR
    ) as HTMLButtonElement;
    cancelCommentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        removeCommentModal(form, formFields);
    });
    const submitCommentBtn = document.querySelector(
        SUBMIT_COMMENT_SELECTOR
    ) as HTMLButtonElement;
    submitCommentBtn.addEventListener("click", async (e) => {
        removeErrors();
        e.preventDefault();
        if (validateFormFields(formFields)) {
            await submitComment(form, formFields);
        }
    });
}

function getCommentForm(): HTMLFormElement {
    return document.querySelector(GUEST_BOOK_FORM_SELECTOR) as HTMLFormElement;
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

function validateFormFields(fields: FormField[]): boolean {
    const guestBookValidator = createGuestBookValidator();
    const invalidFields = fields.filter(
        (field) => !guestBookValidator.validate(field)
    );
    if (invalidFields.length === 0) return true;

    generateErrors(guestBookValidator, invalidFields);
    return false;
}

function generateErrors(validator: FieldValidator, fields: FormField[]): void {
    fields.forEach((field) => {
        displayError(field, validator.getError(field));
    });
}

function createGuestBookValidator(): FieldValidator {
    return new CompositeValidator(
        new TextLengthValidator(TEXT_MAX_LENGTH),
        new AlphanumericValidator()
    );
}

async function submitComment(form: HTMLFormElement, fields: FormField[]): Promise<void> {
    // Process the form fields into an object with the field name as the key and the field value as the object's value.
    const keyValueFields = fields.reduce((result: { [key: string]: string }, field) => ({
            ...result,
            [field.name]:
            field.value
        }),
        {}
    );

    const guestBookEntry = {name: keyValueFields["name"], comment: keyValueFields["comment"]};
    await new GuestBookRepository().submitGuestBookEntry(guestBookEntry);

    removeCommentModal(form, fields);
    location.reload();
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
