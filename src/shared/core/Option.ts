import { isNil } from 'lodash';
import { Result } from './Result';
import { IResultError } from './interfaces/IResultError';

class Some<A> implements Optional<A> {
  constructor(private a: A) {}
  isNone(): boolean {
    return false;
  }

  isSome(): boolean {
    return true;
  }

  getOrElse(_: A) {
    return this.a;
  }

  okOr<E extends IResultError>(_: E): Result<A> {
    return Result.ok(this.a);
  }

  map<B>(func: (a: A) => B) {
    return Optional(func(this.a));
  }

  match<S, N>(cases: { some: (a: A) => S; none: () => N }): S {
    return cases.some(this.a);
  }
}

const None: Optional<any> = {
  isNone(): boolean {
    return true;
  },

  isSome(): boolean {
    return false;
  },

  getOrElse(a: any) {
    return a;
  },

  okOr<E extends IResultError>(err: E) {
    return Result.fail<E>(err);
  },

  map() {
    return this;
  },

  match<S, N>(cases: { some: (a: any) => S; none: () => N }): N {
    return cases.none();
  },
};

interface Optional<A> {
  isNone(): boolean;
  isSome(): boolean;
  match<S, N>(cases: { some: (a: A) => S; none: () => N }): S | N;
  getOrElse(a: A): A;
  okOr<E extends IResultError>(err: E): Result<A>;
  map<B>(func: (a: A) => B): Optional<B>;
}

function Optional<A>(a: A): Optional<A> {
  if (isNil(a)) {
    return None;
  } else {
    return new Some(a);
  }
}

export default Optional;
