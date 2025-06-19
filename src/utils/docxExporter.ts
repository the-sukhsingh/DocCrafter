import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, TableOfContents, PageNumber, NumberFormat, Header, Footer, PageOrientation, convertInchesToTwip } from 'docx';
import { saveAs } from 'file-saver';

interface ChapterContent {
  title: string;
  description: string;
  chapterNo?: number;
  content?: string;
  images?: string[];
}

interface DocxExportOptions {
  projectTitle: string;
  chapters: ChapterContent[];
  content: string;
  includeTableOfContents?: boolean;
  includeCoverPage?: boolean;
}

export class DocxExporter {
  private static parseMarkdownToParagraphs(markdownText: string): Paragraph[] {
    const lines = markdownText.split('\n');
    const paragraphs: Paragraph[] = [];

    for (const line of lines) {
      if (line.trim() === '') {
        // Empty line - add spacing
        paragraphs.push(new Paragraph({
          children: [new TextRun({ text: "", size: 24 })],
          spacing: { after: 120 }
        }));
        continue;
      }

      if (line.startsWith('# ')) {
        // Main heading (H1)
        paragraphs.push(new Paragraph({
          text: line.slice(2),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 480, after: 240 },
          pageBreakBefore: true
        }));
      } else if (line.startsWith('## ')) {
        // Chapter heading (H2)
        paragraphs.push(new Paragraph({
          text: line.slice(3),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 360, after: 180 }
        }));
      } else if (line.startsWith('### ')) {
        // Sub-section heading (H3)
        paragraphs.push(new Paragraph({
          text: line.slice(4),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 240, after: 120 }
        }));
      } else if (line.startsWith('#### ')) {
        // Sub-sub-section heading (H4)
        paragraphs.push(new Paragraph({
          text: line.slice(5),
          heading: HeadingLevel.HEADING_4,
          spacing: { before: 180, after: 100 }
        }));
      } else if (line.trim() === '---') {
        // Horizontal rule - add page break
        paragraphs.push(new Paragraph({
          children: [new PageBreak()],
        }));
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // Bold text
        paragraphs.push(new Paragraph({
          children: [new TextRun({
            text: line.slice(2, -2),
            bold: true,
            size: 24
          })],
          spacing: { after: 120 }
        }));
      } else if (line.includes('*[Image:') && line.includes(']*')) {
        // Image placeholder
        const imageMatch = line.match(/\*\[Image: ([^\]]+)\]\*/);
        if (imageMatch) {
          paragraphs.push(new Paragraph({
            children: [new TextRun({
              text: `[IMAGE: ${imageMatch[1]}]`,
              italics: true,
              color: "666666",
              size: 22
            })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 240 },
            border: {
              top: { style: "dashed", size: 1, color: "CCCCCC" },
              bottom: { style: "dashed", size: 1, color: "CCCCCC" },
              left: { style: "dashed", size: 1, color: "CCCCCC" },
              right: { style: "dashed", size: 1, color: "CCCCCC" }
            }
          }));
        }
      } else if (line.trim()) {
        // Regular paragraph
        paragraphs.push(new Paragraph({
          children: [new TextRun({
            text: line.trim(),
            size: 24
          })],
          spacing: { after: 120 },
          alignment: AlignmentType.JUSTIFIED
        }));
      }
    }

    return paragraphs;
  }

  private static createCoverPage(title: string): Paragraph[] {
    return [
      new Paragraph({
        children: [new TextRun({ text: "", size: 48 })],
        spacing: { after: convertInchesToTwip(2) }
      }),
      new Paragraph({
        children: [new TextRun({
          text: title,
          size: 48,
          bold: true,
          color: "2E4A8B"
        })],
        alignment: AlignmentType.CENTER,
        spacing: { after: convertInchesToTwip(0.5) }
      }),
      new Paragraph({
        children: [new TextRun({
          text: "Generated Report",
          size: 28,
          color: "666666"
        })],
        alignment: AlignmentType.CENTER,
        spacing: { after: convertInchesToTwip(0.5) }
      }),
      new Paragraph({
        children: [new TextRun({
          text: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          size: 24,
          color: "666666"
        })],
        alignment: AlignmentType.CENTER,
        spacing: { after: convertInchesToTwip(2) }
      }),
      new Paragraph({
        children: [new PageBreak()],
      })
    ];
  }

  private static createTableOfContents(): Paragraph[] {
    return [
      new Paragraph({
        children: [new TextRun({
          text: "Table of Contents",
          size: 32,
          bold: true,
          color: "2E4A8B"
        })],
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 360 }
      }),
      new Paragraph({
        children: [new TableOfContents("Table of Contents", {
          hyperlink: true,
          headingStyleRange: "1-4",
        })],
        spacing: { after: 480 }
      }),
      new Paragraph({
        children: [new PageBreak()],
      })
    ];
  }

  private static createChapterContent(chapters: ChapterContent[]): Paragraph[] {
    const paragraphs: Paragraph[] = [];
    
    chapters.forEach((chapter, index) => {
      // Ensure each chapter starts on an odd page (right side)
      if (index > 0) {
        // Add page break and check for odd page
        paragraphs.push(new Paragraph({
          children: [new PageBreak()],
        }));
        
        // Add another page break if needed to ensure odd page
        paragraphs.push(new Paragraph({
          children: [new TextRun({ text: "", size: 1 })],
          pageBreakBefore: true
        }));
      }

      // Chapter title
      paragraphs.push(new Paragraph({
        children: [new TextRun({
          text: chapter.title,
          size: 36,
          bold: true,
          color: "2E4A8B"
        })],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 480, after: 360 },
        pageBreakBefore: index > 0
      }));

      // Chapter content
      const chapterParagraphs = this.parseMarkdownToParagraphs(chapter.content!);
      paragraphs.push(...chapterParagraphs);

      // Add image prompts if available
      if (chapter.images && chapter.images.length > 0) {
        paragraphs.push(new Paragraph({
          children: [new TextRun({
            text: "Image Suggestions:",
            size: 26,
            bold: true,
            color: "4A5568"
          })],
          spacing: { before: 360, after: 180 }
        }));

        chapter.images && chapter.images.forEach((image, imageIndex) => {
          paragraphs.push(new Paragraph({
            children: [new TextRun({
              text: `${imageIndex + 1}. ${image}`,
              size: 22,
              color: "666666",
              italics: true
            })],
            spacing: { after: 120 },
            indent: { left: convertInchesToTwip(0.5) }
          }));
        });
      }
    });

    return paragraphs;
  }

  private static createHeader(): Header {
    return new Header({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              children: [PageNumber.CURRENT],
              size: 20,
              color: "666666"
            })
          ],
          alignment: AlignmentType.RIGHT
        })
      ]
    });
  }

  private static createFooter(projectTitle: string): Footer {
    return new Footer({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: projectTitle,
              size: 18,
              color: "888888"
            })
          ],
          alignment: AlignmentType.CENTER
        })
      ]
    });
  }

  public static async exportToDocx(options: DocxExportOptions): Promise<void> {
    const {
      projectTitle,
      chapters,
      content,
      includeTableOfContents = true,
      includeCoverPage = true
    } = options;
    const documentChildren: Paragraph[] = [];

    // Add cover page
    if (includeCoverPage) {
      documentChildren.push(...this.createCoverPage(projectTitle));
    }

    // Add table of contents
    if (includeTableOfContents) {
      documentChildren.push(...this.createTableOfContents());
    }

    // Add chapter content
    if (chapters && chapters.length > 0) {
      documentChildren.push(...this.createChapterContent(chapters));
    } else {
      // If no chapters, add the full content
      documentChildren.push(...this.parseMarkdownToParagraphs(content));
    }

    // Create document
    const doc = new Document({
      creator: "Project File Maker",
      title: projectTitle,
      description: "Generated report document",
      styles: {
        default: {
          heading1: {
            run: {
              size: 36,
              bold: true,
              color: "2E4A8B"
            },
            paragraph: {
              spacing: { before: 480, after: 360 }
            }
          },
          heading2: {
            run: {
              size: 32,
              bold: true,
              color: "4A5568"
            },
            paragraph: {
              spacing: { before: 360, after: 240 }
            }
          },
          heading3: {
            run: {
              size: 28,
              bold: true,
              color: "4A5568"
            },
            paragraph: {
              spacing: { before: 240, after: 180 }
            }
          },
          heading4: {
            run: {
              size: 26,
              bold: true,
              color: "666666"
            },
            paragraph: {
              spacing: { before: 180, after: 120 }
            }
          }
        }
      },
      numbering: {
        config: [
          {
            reference: "default-numbering",
            levels: [
              {
                level: 0,
                format: NumberFormat.DECIMAL,
                text: "%1.",
                alignment: AlignmentType.START
              }
            ]
          }
        ]
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(1),
                right: convertInchesToTwip(1),
                bottom: convertInchesToTwip(1),
                left: convertInchesToTwip(1)
              },
              size: {
                orientation: PageOrientation.PORTRAIT,
              }
            }
          },
          headers: {
            default: this.createHeader()
          },
          footers: {
            default: this.createFooter(projectTitle)
          },
          children: documentChildren
        }
      ]
    });

    // Generate and save the document
    try {
      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      
      const fileName = `${projectTitle.replace(/[^a-zA-Z0-9]/g, '_')}.docx`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error('Error generating DOCX file:', error);
      throw new Error('Failed to generate DOCX file');
    }
  }
}
