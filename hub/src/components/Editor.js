import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";

export default function Editor({ value, onChange, height=250 }) {
  
  const [content, setContent] = useState(value ?? '');
  useEffect(() => setContent(value ?? ''), [value]);

  return (
    <TinyMCE
      value={content}
      init={{
        height: height,
        menubar: true,
      }}
      onEditorChange={(newValue, editor) => setContent(newValue)}
      onBlur={() => onChange(content)}
    />
  );
}
