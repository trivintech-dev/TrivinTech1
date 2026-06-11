import React from "react";

export const Tag = {
    H1: "h1",
    H2: "h2",
    H3: "h3",
    P: "p",
};

// Use animated gradient clipped to text so the effect appears only on glyphs
export default function VaporizeTextCycle({
    texts = ["Trivin"],
    font = { fontFamily: "Inter, sans-serif", fontSize: "28px", fontWeight: 700 },
    color = "rgb(255,255,255)",
    animation = { vaporizeDuration: 1.5 },
    tag = Tag.H1,
}) {
    const display = texts && texts.length ? texts[0] : "";
    const style = {
        fontFamily: font.fontFamily,
        fontSize: font.fontSize,
        fontWeight: font.fontWeight,
        lineHeight: 1,
        display: "inline-block",
        position: "relative",
        textShadow: "0 2px 18px rgba(0,0,0,0.6)",
    };

    // Gradient moves left-to-right; clipped to text using background-clip
    return (
        <span style={style} className="vapour-text">
            {display}
            <style>{`
        .vapour-text{
          background: linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.06) 80%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
          will-change: background-position;
          animation: vapour-slide ${animation.vaporizeDuration || 1.5}s linear infinite;
        }

        @keyframes vapour-slide{
          0%{ background-position: -50% 50%; }
          50%{ background-position: 100% 50%; }
          100%{ background-position: 250% 50%; }
        }

        /* Ensure fallback: if background-clip is not supported, show solid text */
        .vapour-text.no-clip{
          color: ${color};
          -webkit-text-fill-color: ${color};
        }
      `}</style>
        </span>
    );
}
