export function getLastSegmentOfUrl(url: string | undefined) {
  if (url === undefined) {
    return null;
  }

  const matches = url.match(/\/([^/]+)\/?$/);

  if (matches && matches.length >= 2) {
    return matches[1];
  } else {
    return null;
  }
}
