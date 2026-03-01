'use client';

import { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2, 
  Check, 
  Share2,
  Instagram,
  QrCode
} from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  excerpt: string;
}

export default function ShareButtons({ url, title, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (href: string) => {
    window.open(href, '_blank', 'width=600,height=400,noopener,noreferrer');
  };

  // Generate QR code URL (using free service)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

  return (
    <div className="my-8">
      <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
        <span className="flex items-center gap-2 text-slate-400 text-sm mr-2">
          <Share2 className="w-4 h-4" />
          Share:
        </span>

        {/* Facebook */}
        <button
          onClick={() => handleShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
        >
          <Facebook className="w-4 h-4" />
          <span className="hidden sm:inline">Facebook</span>
        </button>

        {/* Twitter/X */}
        <button
          onClick={() => handleShare(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
        >
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">Twitter</span>
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#0958a8] text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
        >
          <Linkedin className="w-4 h-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>

        {/* Instagram QR Toggle */}
        <button
          onClick={() => setShowQR(!showQR)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
            showQR 
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white' 
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <Instagram className="w-4 h-4" />
          <span className="hidden sm:inline">{showQR ? 'Hide QR' : 'Instagram'}</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
            copied 
              ? 'bg-green-600 text-white' 
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>

      {/* Instagram QR Code Section */}
      {showQR && (
        <div className="mt-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
          <p className="text-slate-400 mb-4 flex items-center justify-center gap-2">
            <QrCode className="w-4 h-4" />
            Scan this QR code with your phone to open on Instagram
          </p>
          <div className="inline-block p-4 bg-white rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={qrCodeUrl} 
              alt="QR Code for Instagram sharing" 
              className="w-48 h-48"
            />
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Or{' '}
            <button 
              onClick={handleCopyLink}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              copy the link
            </button>
            {' '}and paste in Instagram bio or story
          </p>
        </div>
      )}
    </div>
  );
}