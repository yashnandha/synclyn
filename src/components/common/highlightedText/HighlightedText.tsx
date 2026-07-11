import React from 'react';
import { Text, TextStyle } from 'react-native';
import { Highlight, HighlightedTextProps } from './highlightedTextProps';
import styles from './highlightedText.style';

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlights = [],
  textStyle,
  children,
}) => {
  const baseText = typeof children === 'string' ? children : text ?? '';

  if (!highlights.length || typeof baseText !== 'string') {
    return (
      <Text style={[styles.defaultText, textStyle]}>{children ?? text}</Text>
    );
  }

  const parts: { text: string; style?: TextStyle }[] = [];
  let remaining = baseText;

  while (remaining.length > 0) {
    let matchIndex = -1;
    let matchedHighlight: Highlight | null = null;
    let matchedSubStr: string | null = null;

    for (let i = 0; i < highlights.length; i++) {
      const { subString, style } = highlights[i];
      const subStrArr = Array.isArray(subString) ? subString : [subString];

      for (const substr of subStrArr) {
        const index = remaining.indexOf(substr);
        if (index !== -1 && (matchIndex === -1 || index < matchIndex)) {
          matchIndex = index;
          matchedHighlight = highlights[i];
          matchedSubStr = substr;
        }
      }
    }

    if (matchIndex === -1 || !matchedHighlight || !matchedSubStr) {
      parts.push({ text: remaining });
      break;
    }

    if (matchIndex > 0) {
      parts.push({ text: remaining.slice(0, matchIndex) });
    }

    parts.push({
      text: matchedSubStr,
      style: matchedHighlight.style,
    });

    remaining = remaining.slice(matchIndex + matchedSubStr.length);
  }

  return (
    <Text style={[styles.defaultText, textStyle]}>
      {parts.map((part, index) => (
        <Text key={index} style={part.style}>
          {part.text}
        </Text>
      ))}
    </Text>
  );
};

export default HighlightedText;
