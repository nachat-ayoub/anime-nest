function extractUrlLastSegment(url: string | null = null): string {
  if (!url) return '';

  // 1. Use regex to match everything after the last forward slash (/).
  const match = /\/([^/]+)$/.exec(url);

  // 2. If there's a match, return the first captured group (the last part).
  if (match) {
    return match[1];
  }

  // 3. If no match, return an empty string as fallback.
  return '';
}

export { extractUrlLastSegment };
