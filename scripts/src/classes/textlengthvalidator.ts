import { FieldValidator } from '../interfaces/fieldvalidator';
import { FormField } from '../types/formfield';

export class TextLengthValidator extends FieldValidator {
  protected errorMsg: string;

  public constructor(private maxLength: number) {
    super();
    this.errorMsg =
      `Error: Input should contain between 0 and ${this.maxLength} characters\n`;
  }

  public validate(field: FormField): boolean {
    return 0 < field.value.length && field.value.length <= this.maxLength;
  }
}
