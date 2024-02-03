const injectHTMLViewStyle = (styles: any, exceptions?: any[]) => {
    const stylesObj: Record<string, any> = {
      p: styles,
      ul: styles,
      ol: styles,
      b: styles,
      blockquote: styles,
      h1: styles,
      h2: styles,
      h3: styles,
      h4: styles,
    };
  
    if (exceptions)
      exceptions.forEach((exception) => delete stylesObj[exception]);
  
    return stylesObj;
  };

export default injectHTMLViewStyle;