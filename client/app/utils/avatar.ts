export function getInitials(name: string): string {
  if (!name) return "?";

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
}

export function generateDefaultAvatar(name: string): string {
  const initials = getInitials(name);

  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#000000"/>
      <text 
        x="50" 
        y="50" 
        font-family="Arial, sans-serif" 
        font-size="40" 
        font-weight="bold" 
        fill="#FFFFFF" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >${initials}</text>
    </svg>
  `.trim();

  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
}

export function getProfileUrl(url: string | undefined, name: string): string {
  return url || generateDefaultAvatar(name);
}
