import React from 'react';

export default function InnerHtml({
  html = '',
  ...rest
}) {
  return <div dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
}
