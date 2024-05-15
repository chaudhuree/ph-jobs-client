export const routeLists = [
  {
    path: "/",
    routeName: "Home",
  },
  {
    path: "/alljobs",
    routeName: "Jobs",
  },
  {
    path: "/addjob",
    routeName: "Add Job",
  },
  {
    path: "/myjobs",
    routeName: "My Jobs",
  },
  {
    path: "/appliedjobs",
    routeName: "Applied Jobs",
  },
  {
    path: "/blogs",
    routeName: "Blogs",
  }
];

export const markdownToHTML=(markdown) =>{
  // Headers (h1, h2, h3, h4, h5, h6)
  markdown = markdown.replace(/^(#{1,6})\s*(.*?)\s*#*\s*$/gm, function(match, p1, p2) {
    const level = p1.length;
    return '<h' + level + '>' + p2.trim() + '</h' + level + '>';
  });

  // Bold and italic
  markdown = markdown.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
  markdown = markdown.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>');

  // Lists (ul, ol)
  markdown = markdown.replace(/^\s*\*\s*(.*?)$/gm, '<li>$1</li>');
  markdown = markdown.replace(/^\s*\d+\.\s*(.*?)$/gm, '<li>$1</li>');
  markdown = markdown.replace(/<li>.*?<\/li>/gs, function(match) {
    return '<ul>' + match + '</ul>';
  });

  // Links
  markdown = markdown.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Inline code
  markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Horizontal rule
  markdown = markdown.replace(/^\s*(-\s*){3,}\s*$/gm, '<hr>');

  // Paragraphs
  markdown = markdown.replace(/^\s*(.*?)\s*$/gm, '<p>$1</p>');

  return markdown;
}
