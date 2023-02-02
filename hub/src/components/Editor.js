import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "ui active" : ""}
      >
        h1
      </Button>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "ui active" : ""}
      >
        h2
      </Button>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "ui active" : ""}
      >
        h3
      </Button>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "ui active" : ""}
      >
        paragraph
      </Button>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "ui active" : ""}
      >
        bold
      </Button>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "ui active" : ""}
      >
        italic
      </Button>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "ui active" : ""}
      >
        strike
      </Button>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "ui active" : ""}
      >
        left
      </Button>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "ui active" : ""}
      >
        center
      </Button>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "ui active" : ""}
      >
        right
      </Button>
      <Button
        size="mini"
        compact
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "ui active" : ""}
      >
        justify
      </Button>
    </>
  );
};

export default function Editor({ value, onChange }) {
  const [content, setContent] = useState(value);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],
      onUpdate({ editor }) {
        setContent(editor.getHTML());
      },
      onBlur({ editor }) {
        onChange(content);
      },
      content: value,
    },
    [value]
  );

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} style={{ margin: ".5rem" }} />
    </div>
  );
}
