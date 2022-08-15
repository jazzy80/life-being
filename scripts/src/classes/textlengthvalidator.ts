import { FieldValidator } from './fieldvalidator';

export class TextLengthValidator implements FieldValidator<string> {
  public constructor(private maxLength: number) {}

  public validate(value: string): boolean {
    return 0 < value.length && value.length <= this.maxLength;
  }
}
