import { FieldValidator } from '../interfaces/fieldvalidator';

export class CompositeValidator<A> implements FieldValidator<A> {
  private validators: Array<FieldValidator<A>>;

  public constructor(...validators: Array<FieldValidator<A>>) {
    this.validators = validators;
  }

  public validate(value: A): boolean {
    return this.validators.every(v => v.validate(value));
  }
}
