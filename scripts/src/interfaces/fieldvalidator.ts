export interface FieldValidator<A> {
  validate(value: A): boolean;
}
