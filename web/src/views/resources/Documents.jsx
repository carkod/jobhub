export default function Documents({ documents }) {
  if (!documents) return null;
  return (
    <div className="column">
      {documents.length > 0 && <div className="ed-resource-label">Files</div>}
      <div className="ed-resource-list">
        {documents.map((doc, index) => (
          <div className="ed-resource-list__item" key={doc.fileId || index}>
            <div className="name">
              <a href={doc.fileURL} className="url">
                {doc.fileName}
              </a>
              <span className="detail">{doc.fileSize}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
