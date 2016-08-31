/* eslint react/no-danger:0 */
import React, { PropTypes } from 'react';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';

export default function Markdown({ text }) {
  const renderer = new Renderer();

  renderer.code = (code, language) => {
    const highlight = highlightjs.highlight(language, code).value;
    return `<pre><code class="hljs ${language}">${highlight}</code></pre>`;
  };

  const html = marked(text, { renderer });

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

Markdown.propTypes = {
  text: PropTypes.string.isRequired,
};
