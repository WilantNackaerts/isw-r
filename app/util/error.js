// @flow

import { Toast } from 'native-base';

export default function error( msg?: string | Error, err?: Error ) {
  if ( !err && typeof msg === 'object' ) {
    err = msg;
  }
  
  if ( typeof msg !== 'string' ) {
    msg = 'Oops, something went wrong!';
  }
  
  console.log( 'ERROR:', err );
  
  Toast.show( {
    text: msg,
    type: 'danger',
    buttonText: 'Dismiss',
    duration: 3000,
  } );
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
