import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogDetail({ blog }) {
  return (
    <article className="ed-blog-detail">
      {blog.category && (
        <span className="ed-blog-detail__cat">{blog.category}</span>
      )}
      <h1>{blog.name}</h1>
      <div className="ed-blog-detail__body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content || ""}
        </ReactMarkdown>
      </div>
    </article>
  );
}
