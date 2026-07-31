import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface DownloadPdfButtonProps {
  targetId?: string;
  targetIds?: string[];
  filename?: string;
  className?: string;
}

export default function DownloadPdfButton({
  targetId,
  targetIds,
  filename = 'Numerology_Report.pdf',
  className = '',
}: DownloadPdfButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const idsToDownload = targetIds || (targetId ? [targetId] : []);

    if (idsToDownload.length === 0) {
      console.error('No target IDs provided for PDF generation');
      return;
    }

    try {
      setIsDownloading(true);

      let pdf: jsPDF | null = null;

      for (let i = 0; i < idsToDownload.length; i++) {
        const id = idsToDownload[i];
        const element = document.getElementById(id);

        if (!element) {
          console.warn(`Element with id ${id} not found, skipping...`);
          continue;
        }

        // Wait a tiny bit to ensure any immediate rendering is done
        await new Promise(resolve => setTimeout(resolve, 100));

        let linkData: { x: number, y: number, w: number, h: number, url: string }[] = [];

        const canvas = await html2canvas(element, {
          scale: 2, // Higher resolution
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 800, // Match the hidden container width
          onclone: (_document, clonedElement) => {
            const links = clonedElement.querySelectorAll('a');
            const elementRect = clonedElement.getBoundingClientRect();
            links.forEach((link) => {
              if (link.href) {
                const rect = link.getBoundingClientRect();
                // Only add if it has actual dimensions (i.e., not display: none)
                if (rect.width > 0 && rect.height > 0) {
                  linkData.push({
                    x: rect.left - elementRect.left,
                    y: rect.top - elementRect.top,
                    w: rect.width,
                    h: rect.height,
                    url: link.href
                  });
                }
              }
            });
          }
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.8);

        // Use pixels as unit and exact canvas dimensions for the PDF page
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        if (!pdf) {
          pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'px',
            format: [imgWidth, imgHeight],
          });
        } else {
          pdf.addPage([imgWidth, imgHeight], imgWidth > imgHeight ? 'landscape' : 'portrait');
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');


        linkData.forEach((link) => {
          // Calculate scale based on the clone's elementRect vs the final img dimensions
          // Actually, since we know html2canvas uses scale: 2
          const scale = 2;
          pdf!.link(link.x * scale, link.y * scale, link.w * scale, link.h * scale, { url: link.url });
        });
      }

      if (pdf) {
        pdf.save(filename);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`group relative flex items-center justify-center space-x-2 w-full px-4 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(16,185,129,0.7)] transition-all duration-300 focus:outline-none overflow-hidden active:scale-[0.98] border border-white/10 ${className}`}
    >
      <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out -skew-x-12 -translate-x-[150%]"></div>

      {isDownloading ? (
        <Loader2 size={16} className="relative z-10 animate-spin flex-shrink-0" />
      ) : (
        <Download size={16} className="relative z-10 transition-transform duration-500 group-hover:-translate-y-0.5 flex-shrink-0" />
      )}

      <span className="relative z-10 text-[10px] sm:text-[11px] font-extrabold tracking-wide sm:tracking-[0.1em] uppercase drop-shadow-sm whitespace-nowrap">
        {isDownloading ? 'Generating PDF...' : 'Download Report'}
      </span>
    </button>
  );
}
