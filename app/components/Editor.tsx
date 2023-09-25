import type { EditorState } from 'lexical';
import * as Lexical from 'lexical';
import { useEffect, useState } from 'react';

import * as LexicalComposer from '@lexical/react/LexicalComposer.js';
import * as LexicalPlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin.js';
import * as LexicalContentEditable from '@lexical/react/LexicalContentEditable.js';
import * as LexicalHistoryPlugin from '@lexical/react/LexicalHistoryPlugin.js';
import * as LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin.js';
import * as LexicalComposerContext from '@lexical/react/LexicalComposerContext.js';
import * as LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary.js';

const theme = {
  // Theme styling goes here
  // ...
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = Lexical.$getRoot();
    const selection = Lexical.$getSelection();

    console.log(root, selection);
  });
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

export function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  const [initial, setInitial] = useState(true)
  useEffect(() => {
    setInitial(false)
  }, [])

  if (initial) {
    return null
  }

  return (
    <LexicalComposer.LexicalComposer initialConfig={initialConfig}>
      <LexicalPlainTextPlugin.PlainTextPlugin
        contentEditable={<LexicalContentEditable.ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary.default}
      />
      <LexicalOnChangePlugin.OnChangePlugin onChange={onChange} />
      <LexicalHistoryPlugin.HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer.LexicalComposer>
  );
}
