interface ProjectInfo {
    title: string;
    domain: string;
    description: string;
}

interface ChapterContent {
    title: string;
    content: string;
    imagePrompts: string[];
}

// Simple Function to clean the Markdown content
export function cleanMarkdownContent(markdown: string): string {
    // Remove leading and trailing whitespace
    markdown = markdown.trim();

    // Replace multiple newlines with a single newline
    markdown = markdown.replace(/\n{2,}/g, '\n\n');

    // Remove any trailing whitespace from each line
    markdown = markdown.split('\n').map(line => line.trim()).join('\n');

    // Clean *  ** formatting
    markdown = markdown.replace(/\*   \*\*(.*?)\*\*/g, '**$1**');
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '**$1**');

    return markdown;
}

// Simple function to process markdown lines for rendering
export function processMarkdownLine(line: string, index: number): { type: string; content: string; className: string; key: number } | null {
    line = line.trim();
    if (line.startsWith('*   **')) {
        line = line.replace('*   **', '**');
    }

    if (line.startsWith('# ')) {
        return {
            type: 'h1',
            content: line.slice(2),
            className: "text-4xl font-bold text-black mb-8 pb-4 border-b border-gray-700",
            key: index
        };
    }
    if (line.startsWith('## ')) {
        return {
            type: 'h2',
            content: line.slice(3),
            className: "text-2xl font-medium text-black mt-12 mb-6 relative",
            key: index
        };
    }
    if (line.startsWith('### ')) {
        return {
            type: 'h3',
            content: line.slice(4),
            className: "text-xl font-medium text-black mt-8 mb-4",
            key: index
        };
    }
    if (line.startsWith('#### ')) {
        return {
            type: 'h4',
            content: line.slice(5),
            className: "text-lg font-normal text-black mt-6 mb-3",
            key: index
        };
    }
    if (line.trim() === '---') {
        return {
            type: 'hr',
            content: '',
            className: "w-16 h-px bg-gray-600 mx-auto my-12",
            key: index
        };
    }
    if (line.startsWith('**') && line.endsWith('**')) {
        return {
            type: 'p',
            content: line.slice(2, -2),
            className: "font-medium text-black mb-3 text-lg",
            key: index
        };
    }
    if (line.includes('*[Image:') && line.includes(']*')) {
        const imageMatch = line.match(/\*\[Image: ([^\]]+)\]\*/);
        if (imageMatch) {
            return {
                type: 'image',
                content: imageMatch[1],
                className: "bg-gray-800/50 border border-gray-700 rounded-lg p-8 my-8 text-center group hover:bg-gray-700/50 transition-colors",
                key: index
            };
        }
    }
    if (line.trim() && !line.startsWith('#')) {
        const processedLine = line.startsWith("**") ?
            line.replace(/\*\*(.*?)\*\*/g, '$1') : line;

        return {
            type: 'p',
            content: processedLine,
            className: "text-gray-900 mb-4 leading-relaxed text-lg font-light",
            key: index
        };
    }

    if (line.trim() === '') {
        return {
            type: 'spacer',
            content: '',
            className: "h-3",
            key: index
        };
    }

    return null;
}


// Keep the original functions for backward compatibility
export function generateMarkdownContent(projectInfo: ProjectInfo, chapters: ChapterContent[]): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let markdown = `# ${projectInfo.title}
  
**Domain:** ${projectInfo.domain}  
**Date:** ${currentDate}
  
## Abstract
  
  ${projectInfo.description}
  
  ---
  
  ## Table of Contents
  
  `;

    // Add table of contents
    chapters.forEach((chapter, index) => {
        markdown += `${index + 1}. [${chapter.title}](#${index + 1}-${chapter.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')})\n`;
    });

    markdown += '\n---\n\n';

    // Add chapters
    chapters.forEach((chapter, index) => {
        markdown += `## ${index + 1}. ${chapter.title}\n\n`;
        markdown += `${chapter.content}\n\n---\n\n`;
    });

    // Add image prompts section if any exist
    const allImagePrompts = chapters.flatMap(chapter => chapter.imagePrompts);
    if (allImagePrompts.length > 0) {
        markdown += `## Suggested Images\n\n`;
        allImagePrompts.forEach((prompt, index) => {
            markdown += `${index + 1}. ${prompt}\n`;
        });
    }

    return markdown;
}
 
export function generateFullHTML(projectInfo: ProjectInfo, chapters: ChapterContent[]): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${projectInfo.title}</title>
      <style>
          body {
              font-family: 'Georgia', 'Times New Roman', serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              color: #333;
              background-color: #fff;
          }
          h1 {
              color: #2c3e50;
              border-bottom: 3px solid #3498db;
              padding-bottom: 10px;
              text-align: center;
          }
          h2 {
              color: #34495e;
              border-left: 4px solid #3498db;
              padding-left: 15px;
              margin-top: 30px;
          }
          h3 {
              color: #2c3e50;
              margin-top: 25px;
          }
          .meta-info {
              text-align: center;
              margin-bottom: 30px;
              padding: 15px;
              background-color: #f8f9fa;
              border-radius: 8px;
          }
          .abstract {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #3498db;
          }
          .toc {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
          }
          .toc ul {
              list-style-type: none;
              padding-left: 0;
          }
          .toc li {
              margin: 8px 0;
              padding-left: 20px;
          }
          .chapter {
              margin: 40px 0;
              padding: 20px 0;
              border-top: 1px solid #eee;
          }
          .image-placeholder {
              background-color: #f0f0f0;
              border: 2px dashed #ccc;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
              border-radius: 8px;
              font-style: italic;
              color: #666;
          }
          code {
              background-color: #f4f4f4;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: 'Courier New', monospace;
          }
          pre {
              background-color: #f4f4f4;
              padding: 15px;
              border-radius: 8px;
              overflow-x: auto;
          }
          @media print {
              body { margin: 0; padding: 20px; }
              .no-print { display: none; }
          }
      </style>
  </head>
  <body>
      <h1>${projectInfo.title}</h1>
      
      <div class="meta-info">
          <strong>Domain:</strong> ${projectInfo.domain}<br>
          <strong>Date:</strong> ${currentDate}
      </div>
  
      <div class="abstract">
          <h3>Abstract</h3>
          <p>${projectInfo.description}</p>
      </div>
  
      <div class="toc">
          <h3>Table of Contents</h3>
          <ul>
  `;

    // Add table of contents
    chapters.forEach((chapter, index) => {
        html += `            <li>${index + 1}. <a href="#chapter-${index + 1}">${chapter.title}</a></li>\n`;
    });

    html += `        </ul>
      </div>
  `;

    // Add chapters
    chapters.forEach((chapter, index) => {
        // Convert markdown to basic HTML
        chapter.content = cleanMarkdownContent(chapter.content);
        let chapterContent = chapter.content
            .replace(/### (.+)/g, '<h3>$1</h3>')
            .replace(/#### (.+)/g, '<h4>$1</h4>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/`(.+?)`/g, '<code>$1</code>')
            .replace(/\[Image: ([^\]]+)\]/g, '<div class="image-placeholder">Image: $1</div>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n- /g, '</p><ul><li>')
            .replace(/\n/g, '<br>')
            .replace(/\* \*\*(.*?)\*\*/g, '**$1**')
            .replace(/\*\*\s*(.*?)\s*\*\*/g, '**$1**')
            .replace(/\* /g, '• ');

        // Wrap in paragraphs
        if (!chapterContent.startsWith('<h3>') && !chapterContent.startsWith('<div')) {
            chapterContent = '<p>' + chapterContent + '</p>';
        }

        html += `
      <div class="chapter" id="chapter-${index + 1}">
          <h2>${index + 1}. ${chapter.title}</h2>
          ${chapterContent}
      </div>
  `;
    });

    html += `
  </body>

  </html>`;

    return html;
}

// Convert processed markdown elements to object representations
// This allows ContentViewer to create React components easily
export function processMarkdownForRendering(markdownText: string): Array<{
    type: string;
    content: string;
    className: string;
    key: number;
}> {
    if (!markdownText || typeof markdownText !== 'string') {
        return [{
            type: 'p',
            content: 'No content available',
            className: 'text-gray-500 italic',
            key: 0
        }];
    }
    
    return markdownText
        .split('\n')
        .map((line, index) => processMarkdownLine(line, index))
        .filter(Boolean) as Array<{
            type: string;
            content: string;
            className: string;
            key: number;
        }>;
}

// Download content as a file
export function downloadContent(content: string, fileName: string, format: 'markdown' | 'html'): void {
    const fileExtension = format === 'markdown' ? 'md' : 'html';
    const mimeType = format === 'markdown' ? 'text/markdown' : 'text/html';

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy: ', err);
        return false;
    }
}

// Process chapters for consistent structure
export function processChapters(chapters: any[]): { title: string; content: string; imagePrompts: string[] }[] {
    if (!chapters || !Array.isArray(chapters)) {
        return [];
    }
    
    return chapters.map(chapter => ({
        title: chapter.title,
        content: chapter.content || '',
        imagePrompts: chapter.images || []
    }));
}
