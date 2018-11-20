// @flow

import { StyleSheet } from 'react-native';

// Text
export const TEXT_COLOR = 'white';
export const TEXT_COLOR_DISABLED = '#B3C7F9';
export const TEXT = {
  color: TEXT_COLOR,
};

export const TEXT_DISABLED = {
  color: TEXT_COLOR_DISABLED,
};

// Icon
export const ICON = {
  ...TEXT,
};

export const ICON_DISABLED = {
  ...TEXT_DISABLED,
};

// Borders
export const BORDER_COLOR = '#3848a2';
export const BORDER_WIDTH = 2;

// Footer
export const FOOTER_PADDING = 20;
export const FOOTER = {
  paddingLeft: FOOTER_PADDING,
  paddingRight: FOOTER_PADDING,
  borderBottomColor: BORDER_COLOR,
  borderBottomWidth: BORDER_WIDTH,
};

export default StyleSheet.create( {
  text: TEXT,
  textDisabled: TEXT_DISABLED,
  icon: ICON,
  iconDisabled: ICON_DISABLED,
  footer: FOOTER,
} );
