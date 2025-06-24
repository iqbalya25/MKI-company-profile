/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/common/RichTextRenderer.tsx - NEW COMPONENT
// This component handles Contentful's rich text format properly
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { Node } from '@contentful/rich-text-types';
import Link from 'next/link';

interface RichTextRendererProps {
  content: any; // Contentful rich text document
  className?: string;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ 
  content, 
  className = "" 
}) => {
  // Handle empty or invalid content
  if (!content || !content.content) {
    return null;
  }

  // Custom rendering options for Contentful rich text
  const options = {
    // Define how to render different block types
    renderNode: {
      // Paragraphs
      [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
        <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
      ),

      // Headings
      [BLOCKS.HEADING_1]: (node: Node, children: React.ReactNode) => (
        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => (
        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3 first:mt-0">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node: Node, children: React.ReactNode) => (
        <h3 className="text-xl font-semibold text-gray-900 mt-5 mb-2 first:mt-0">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node: Node, children: React.ReactNode) => (
        <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2 first:mt-0">
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (node: Node, children: React.ReactNode) => (
        <h5 className="text-base font-semibold text-gray-900 mt-3 mb-2 first:mt-0">
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (node: Node, children: React.ReactNode) => (
        <h6 className="text-sm font-semibold text-gray-900 mt-3 mb-2 first:mt-0">
          {children}
        </h6>
      ),

      // Lists
      [BLOCKS.UL_LIST]: (node: Node, children: React.ReactNode) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (node: Node, children: React.ReactNode) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: Node, children: React.ReactNode) => (
        <li className="ml-4">{children}</li>
      ),

      // Quotes
      [BLOCKS.QUOTE]: (node: Node, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-teal-500 pl-4 py-2 mb-4 bg-gray-50 italic text-gray-700">
          {children}
        </blockquote>
      ),

      // Horizontal Rule
      [BLOCKS.HR]: () => (
        <hr className="my-8 border-gray-200" />
      ),

      // Tables (if supported by your Contentful setup)
      [BLOCKS.TABLE]: (node: Node, children: React.ReactNode) => {
        // Separate header rows from body rows
        const childrenArray = React.Children.toArray(children);
        const hasHeaderRow = childrenArray.some((child: any) => 
          child?.props?.children && 
          React.Children.toArray(child.props.children).some((cell: any) => 
            cell?.type?.toString().includes('TABLE_HEADER_CELL')
          )
        );

        if (hasHeaderRow) {
          // Find the first row with header cells for thead
          let headerRowIndex = -1;
          const headerRow = childrenArray.find((child: any, index) => {
            const hasHeaderCells = child?.props?.children && 
              React.Children.toArray(child.props.children).some((cell: any) => 
                cell?.type?.toString().includes('TABLE_HEADER_CELL')
              );
            if (hasHeaderCells) {
              headerRowIndex = index;
              return true;
            }
            return false;
          });

          const bodyRows = childrenArray.filter((_, index) => index !== headerRowIndex);

          return (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead>
                  {headerRow}
                </thead>
                <tbody>
                  {bodyRows}
                </tbody>
              </table>
            </div>
          );
        }

        // If no header rows, put everything in tbody
        return (
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <tbody>
                {children}
              </tbody>
            </table>
          </div>
        );
      },
      [BLOCKS.TABLE_HEADER_CELL]: (node: Node, children: React.ReactNode) => (
        <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 text-left font-semibold text-gray-900">
          {children}
        </th>
      ),
      [BLOCKS.TABLE_CELL]: (node: Node, children: React.ReactNode) => (
        <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
          {children}
        </td>
      ),
      [BLOCKS.TABLE_ROW]: (node: Node, children: React.ReactNode) => (
        <tr className="hover:bg-gray-50">{children}</tr>
      ),

      // Embedded entries (for embedded assets, other content)
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
        // Handle embedded entries if needed
        return (
          <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">Embedded content</p>
          </div>
        );
      },

      // Embedded assets (images, files)
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const asset = node.data?.target;
        if (!asset?.fields) return null;

        const { file, title } = asset.fields;
        if (!file?.url) return null;

        const imageUrl = `https:${file.url}`;
        const isImage = file.contentType?.startsWith('image/');

        if (isImage) {
          return (
            <div className="my-6">
              <img
                src={imageUrl}
                alt={title || 'Embedded image'}
                className="max-w-full h-auto rounded-lg shadow-sm"
                loading="lazy"
              />
              {title && (
                <p className="text-sm text-gray-600 mt-2 text-center italic">
                  {title}
                </p>
              )}
            </div>
          );
        }

        // For non-image files, show a download link
        return (
          <div className="my-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              📎 {title || file.fileName || 'Download file'}
            </a>
          </div>
        );
      },

      // Hyperlinks to entries
      [INLINES.ENTRY_HYPERLINK]: (node: Node, children: React.ReactNode) => {
        // Handle links to other Contentful entries
        return (
          <span className="text-teal-600 font-medium">{children}</span>
        );
      },

      // External hyperlinks
      [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => {
        const uri = node.data?.uri;
        if (!uri) return <span>{children}</span>;

        // Check if it's an internal link
        const isInternal = uri.startsWith('/') || uri.includes(process.env.NEXT_PUBLIC_SITE_URL || '');

        if (isInternal) {
          return (
            <Link 
              href={uri} 
              className="text-teal-600 hover:text-teal-700 underline font-medium"
            >
              {children}
            </Link>
          );
        }

        return (
          <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-700 underline font-medium"
          >
            {children}
          </a>
        );
      },

      // Asset hyperlinks (links to files)
      [INLINES.ASSET_HYPERLINK]: (node: Node, children: React.ReactNode) => {
        const asset = node.data?.target;
        if (!asset?.fields?.file?.url) return <span>{children}</span>;

        return (
          <a
            href={`https:${asset.fields.file.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-700 underline font-medium"
          >
            {children}
          </a>
        );
      },
    },

    // Define how to render text marks (bold, italic, etc.)
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => (
        <strong className="font-semibold">{text}</strong>
      ),
      [MARKS.ITALIC]: (text: React.ReactNode) => (
        <em className="italic">{text}</em>
      ),
      [MARKS.UNDERLINE]: (text: React.ReactNode) => (
        <u className="underline">{text}</u>
      ),
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-gray-100 text-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">
          {text}
        </code>
      ),
      [MARKS.SUPERSCRIPT]: (text: React.ReactNode) => (
        <sup className="text-xs">{text}</sup>
      ),
      [MARKS.SUBSCRIPT]: (text: React.ReactNode) => (
        <sub className="text-xs">{text}</sub>
      ),
    },
  };

  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      {documentToReactComponents(content, options)}
    </div>
  );
};

export default RichTextRenderer;