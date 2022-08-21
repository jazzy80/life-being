import { FieldValidator } from '../interfaces/fieldvalidator';
import { FormField } from '../types/formfield';

export class CompositeValidator extends FieldValidator {
  private validators: Array<FieldValidator>;
  protected errorMsg = '';

  public constructor(...validators: Array<FieldValidator>) {
    super();
    this.validators = validators;
  }

  public validate(field: FormField): boolean {
    return this.validators.every(v => v.validate(field));
  }

  public getError(field: FormField): string {
    return this.validators.reduce((error: string, validator: FieldValidator) => (
      `${error}${validator.getError(field)}`
    ), '');
  }
}
