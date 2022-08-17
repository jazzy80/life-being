import { FieldValidator } from '../interfaces/fieldvalidator';
import { FormField } from '../types/formfield';

export class AlphaNumValidator extends FieldValidator {
  protected errorMsg =
    'Error: Input should contain alpha-numeric characters or "!?.,()"\n';

  public validate(field: FormField): boolean {
    return /^[a-zA-Z0-9!?,.() ]*$/.test(field.value);
  }
}
