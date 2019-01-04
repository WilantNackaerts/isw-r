// @flow

import { Toast } from 'native-base';

export default function toast( options: Toast | string, extraOptions?: Toast ) {
  if ( typeof options === 'string' ) {
    options = { text: options, type: 'success' };
  }
  
  Toast.show( {
    duration: 3000,
    buttonText: options.type === 'success' ? 'Okay' : 'Dismiss',
    ...options,
    ...extraOptions,
  } );
}

function toastCreator( type: string ) {
  return function( options: Toast | string, extraOptions: Toast ) {
    if ( typeof options === 'string' ) {
      options = { text: options, type: type };
    }
    
    toast( { type, ...options }, extraOptions );
  };
}

toast.success = toastCreator( 'success' );
toast.warning = toastCreator( 'warning' );
toast.danger = toastCreator( 'danger' );
toast.error = toastCreator( 'danger' );
