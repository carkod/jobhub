import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";

export default function Editor({ value, onChange, height = 250 }) {
  const [content, setContent] = useState(value ?? "");
  useEffect(() => setContent(value ?? ""), [value]);

  return (
    <TinyMCE
      apiKey="tfvwrijm4legdrkcz2qfnp5cbivueknerp6xcbadq3zny14q"
      value={content}
      init={{
        height: height,
        menubar: true,
      }}
      plugins={["link", "table", "image", "code", "lists"]}
      toolbar={["table image link bold italic | code"]}
      onEditorChange={(newValue, editor) => setContent(newValue)}
      onBlur={() => onChange(content)}
    />
  );
}
