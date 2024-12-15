import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import "./Editor.css";

export default function Editor() {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: "<p></p>",
  });

  return <EditorContent editor={editor} />;
}
