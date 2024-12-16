import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import "./Editor.css";

interface EditorProps {
  onChange?: (value: string) => void;
  defaultContent?: string;
  editable?: boolean;
}

export default function Editor({
  onChange,
  defaultContent,
  editable,
}: EditorProps) {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: defaultContent,
    onUpdate: onChange && ((p) => onChange(p.editor.getHTML())),
    editable,
    editorProps: {
      attributes: {
        class: "text-sm",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
