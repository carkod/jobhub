import React from "react";
import parse from "html-react-parser";

export default function HtmlText({ text = "" }) {
  return <div className="rte-text">{parse(text)}</div>;
}
