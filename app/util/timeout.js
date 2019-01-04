// @flow

export function timer( duration: number ): Promise<void> {
  return new Promise( resolve => {
    setTimeout( resolve, duration );
  } );
}

export function timerReject<T>( duration: number ): Promise<T> {
  return new Promise( ( resolve, reject ) => {
    setTimeout( reject, duration );
  } );
}

export function timeout<T>( promise: Promise<T>, timeout: number, error: any ): Promise<T> {
  return Promise.race( [
    promise,
    timerReject<T>( timeout ),
  ] );
}

export function progress( promise: Promise<any> ): Progress {
  const p = new Progress();
  const done = p.done.bind( p );
  promise.then( done, done );
  
  return p;
}

class Progress {
  intervals: IntervalID[];
  timeouts: TimeoutID[];
  
  constructor() {
    this.intervals = [];
    this.timeouts = [];
  }
  
  done() {
    this.intervals.forEach( clearInterval );
    this.timeouts.forEach( clearTimeout );
  }
  
  after( time: number, cb: () => void ): Progress {
    this.timeouts.push( setTimeout( cb, time ) );
    return this;
  }
  
  every( interval: number, repeat?: number = Infinity, cb: () => void ): Progress {
    if ( !cb && typeof repeat === 'function' ) {
      cb = repeat;
      repeat = Infinity;
    }
    
    const id = setInterval( () => {
      repeat--;
      
      if ( repeat === 0 ) {
        clearInterval( id );
      }
      
      cb();
    }, interval );
    
    this.intervals.push( id );
    
    return this;
  }
}
