// @flow

import toast from './toast.js';

export default function error( msg?: string | Error, err?: Error ) {
  if ( !err && typeof msg === 'object' ) {
    err = msg;
  }
  
  if ( typeof msg !== 'string' ) {
    msg = 'Oops, something went wrong!';
  }
  
  console.log( 'ERROR:', err );
  
  toast.error( msg );
}

function catcher( msg?: string, cb?: ( err?: Error ) => void ) {
  return function( err?: Error ) {
    error( msg, err );
    
    if ( cb ) {
      cb( err );
    }
  };
}

export { catcher, error };
