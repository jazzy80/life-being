import { FieldValidator } from '../interfaces/fieldvalidator';
import { FormField } from '../types/formfield';

export class AlphaNumValidator extends FieldValidator {
  protected errorMsg =
    'Enkel alfa-numerieke tekens en "!?.,()" zijn toegestaan.\n';

  public validate(field: FormField): boolean {
    return /^[a-zA-Z0-9!?,.()'\n\r ]*$/.test(field.value);
  }
}
