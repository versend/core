const searchHighlight = String.raw`
.\[\&_\:\:highlight\(fd-search\)\]\:text-fd-primary ::highlight(fd-search) {
  color: var(--color-fd-primary);
}
.\[\&_\:\:highlight\(fd-search\)\]\:underline ::highlight(fd-search) {
  text-decoration-line: underline;
}
`;

export function SearchHighlight() {
  return <style href="fd-search-highlight">{searchHighlight}</style>;
}
