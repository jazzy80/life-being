import { FormField } from '../types/formfield';

export abstract class FieldValidator {
  protected abstract errorMsg: string;

  public abstract validate(field: FormField): boolean;
  public getError(field: FormField): string {
    return !this.validate(field) ? this.errorMsg : '';
  }
}
