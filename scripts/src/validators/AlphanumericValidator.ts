import { FieldValidator } from './FieldValidator';
import { FormField } from '../types/FormField';

export class AlphanumericValidator extends FieldValidator {
  protected errorMsg =
    'Enkel alfa-numerieke tekens en "!?.,()" zijn toegestaan.\n';

  public validate(field: FormField): boolean {
    return /^[a-zA-Z0-9!?,.()'\n\r ]*$/.test(field.value);
  }
}
