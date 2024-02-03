import { useState, useEffect } from 'react';
import {setStringAsync} from 'expo-clipboard';

export function useClipboard() {
  const [copiedText, setCopiedText] = useState("");
  const [copying, setCopying] = useState(false);

  const copy = (text: string) => {
   
    setCopying(true);
    setStringAsync(text).then(() => {
      setCopiedText(text);
      setCopying(false);
      setTimeout(() => {
        setCopiedText("")
        
      },700)
    });
  };

  return { copiedText, copying, copy };
}