import { FieldValidator } from '../interfaces/fieldvalidator';

export class AlphaNumValidator implements FieldValidator<string> {
  public validate(value: string): boolean {
    return /[a-z][A-Z][0-9][!?]/.test(value);
  }
}
