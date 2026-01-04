"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Share2, Copy, Facebook, Twitter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="relative group/share">
      <Button
        className="bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full p-3 cursor-pointer border border-white/30 transition-all duration-300 hover:scale-110"
        aria-label="Share Button"
      >
        <Share2 size={20} className="text-white" />
      </Button>

      <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl opacity-0 invisible group-hover/share:opacity-100 group-hover/share:visible transition-all duration-300 transform translate-y-2 group-hover/share:translate-y-0 z-50">
        <div className="p-2 space-y-1">
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-4 py-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 rounded-xl transition-colors duration-200"
            aria-label="Share Button for various sites"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} className="text-[hsl(var(--primary))]" />
            )}
            <span className="text-sm font-medium">
              {copied ? "Copied!" : "Copy Link"}
            </span>
          </button>
          <button
            onClick={() => handleShare("facebook")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[hsl(var(--foreground))] hover:bg-blue-500/10 rounded-xl transition-colors duration-200"
            aria-label="Share Button for facebook"
          >
            <Facebook size={16} className="text-blue-600" />
            <span className="text-sm font-medium">Facebook</span>
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[hsl(var(--foreground))] hover:bg-blue-400/10 rounded-xl transition-colors duration-200"
            aria-label="Share Button for instagram"
          >
            <Twitter size={16} className="text-blue-400" />
            <span className="text-sm font-medium">Twitter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareButton;
