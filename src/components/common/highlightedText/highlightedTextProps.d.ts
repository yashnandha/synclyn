import { PropsWithChildren } from 'react';

type Highlight = {
  subString: string | string[];
  style: TextStyle;
};

interface HighlightedTextProps extends PropsWithChildren {
  text?: string;
  highlights?: Highlight[];
  textStyle?: TextStyle;
}
