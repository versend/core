/**
 * Moves the rail indicator to cover the currently visible headings. Offsets
 * are relative to the rail (its `offsetParent`), so they stay valid while the
 * rail scrolls. Values are written as CSS variables so the segment animates
 * in CSS.
 *
 * @param rail - Scrollable list that draws the rail and indicator.
 * @param anchors - Heading ids that are currently in view.
 */
export const positionTocIndicator = (rail: HTMLElement, anchors: string[]) => {
  const links = anchors
    .map((id) => rail.querySelector<HTMLAnchorElement>(`a[href="#${id}"]`))
    .filter((link) => link !== null)
    .toSorted((a, b) => a.offsetTop - b.offsetTop);
  const first = links.at(0);
  const last = links.at(-1);

  if (!(first && last)) {
    rail.style.setProperty("--toc-indicator-opacity", "0");
    return;
  }

  const top = first.offsetTop;
  const bottom = last.offsetTop + last.offsetHeight;

  rail.style.setProperty("--toc-indicator-top", `${top}px`);
  rail.style.setProperty("--toc-indicator-height", `${bottom - top}px`);
  rail.style.setProperty("--toc-indicator-opacity", "1");
};
