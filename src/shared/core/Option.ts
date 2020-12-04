import { isNil } from 'lodash';

class Some<A> implements Optional<A> {
  constructor(private a: A) {}
  getOrElse(a: A) {
    return this.a;
  }
  map<B>(func: (a: A) => B) {
    return Optional(func(this.a));
  }
  match<B>(cases: { some: (a: A) => B; none: () => B }): B {
    return cases.some(this.a);
  }
}

const None: Optional<any> = {
  getOrElse(a: any) {
    return a;
  },
  map() {
    return this;
  },
  match<B>(cases: { some: (a: any) => B; none: () => B }): B {
    return cases.none();
  },
};

interface Optional<A> {
  match<B>(cases: { some: (a: A) => B; none: () => B }): B;
  getOrElse(a: A): A;
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
