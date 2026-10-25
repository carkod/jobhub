export default function Links({ links }) {
  if (!links) return null;
  return (
    <div className="column">
      {links.length > 0 && <div className="ed-resource-label">Links</div>}
      <div className="ed-resource-list">
        {links.map((link, index) => (
          <div className="ed-resource-list__item" key={link.id || index}>
            <div className="name">
              <a href={link.url} className="url">
                {link.title}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
