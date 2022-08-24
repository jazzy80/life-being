import { FieldValidator } from '../interfaces/fieldvalidator';
import { FormField } from '../types/formfield';

export class TextLengthValidator extends FieldValidator {
  protected errorMsg: string;

  public constructor(private maxLength: number) {
    super();
    this.errorMsg =
      `Ingevoerde tekst moet tussen de 0 en ${this.maxLength} tekens bevatten.\n`;
  }

  public validate(field: FormField): boolean {
    return 0 < field.value.length && field.value.length <= this.maxLength;
  }
}
