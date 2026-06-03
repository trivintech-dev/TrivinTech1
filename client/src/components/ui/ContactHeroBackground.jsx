const ContactHeroBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="contact-bg-glow contact-bg-glow-a" />
            <div className="contact-bg-glow contact-bg-glow-b" />
            <div className="contact-bg-glow contact-bg-glow-c" />

            <div className="absolute inset-0 contact-bg-grid" />
            <div className="absolute inset-0 contact-bg-scanlines" />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="contact-bg-radar contact-bg-radar-a" />
                <div className="contact-bg-radar contact-bg-radar-b" />

                <div className="contact-bg-hud contact-bg-hud-a">
                    <div className="contact-bg-hud-label" />
                    <div className="contact-bg-hud-line" />
                    <div className="contact-bg-hud-line contact-bg-hud-line-short" />
                </div>

                <div className="contact-bg-hud contact-bg-hud-b">
                    <div className="contact-bg-hud-label contact-bg-hud-label-alt" />
                    <div className="contact-bg-hud-line" />
                    <div className="contact-bg-hud-line contact-bg-hud-line-short" />
                </div>

                <div className="contact-bg-node contact-bg-node-a" />
                <div className="contact-bg-node contact-bg-node-b" />
                <div className="contact-bg-node contact-bg-node-c" />

                <svg className="contact-bg-circuit" viewBox="0 0 900 460" aria-hidden="true">
                    <path d="M90 320 H220 V210 H340 C390 210, 420 170, 470 170 H610 C660 170, 710 120, 780 120" />
                    <path d="M110 150 H250 C300 150, 340 190, 390 190 H520 C570 190, 620 240, 700 240 H820" />
                    <path d="M190 90 V160 C190 205, 240 245, 290 245 H360 C420 245, 455 285, 500 285 H650" />
                </svg>

                <div className="contact-bg-core" />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 to-transparent" />

            <style>{`
        .contact-bg-glow,
        .contact-bg-radar,
        .contact-bg-hud,
        .contact-bg-node,
        .contact-bg-circuit,
        .contact-bg-core {
          position: absolute;
          pointer-events: none;
        }

        .contact-bg-glow {
          border-radius: 9999px;
          filter: blur(18px);
          mix-blend-mode: screen;
          opacity: 0.72;
          animation: contact-drift 14s ease-in-out infinite;
        }

        .contact-bg-glow-a {
          width: 24rem;
          height: 24rem;
          left: -7rem;
          top: -6rem;
          background: radial-gradient(circle, rgba(34,211,238,0.26), rgba(34,211,238,0.05) 54%, transparent 76%);
        }

        .contact-bg-glow-b {
          width: 20rem;
          height: 20rem;
          right: -5rem;
          top: 2rem;
          background: radial-gradient(circle, rgba(56,189,248,0.2), rgba(56,189,248,0.04) 56%, transparent 78%);
          animation-delay: -5s;
        }

        .contact-bg-glow-c {
          width: 18rem;
          height: 18rem;
          left: 38%;
          bottom: -7rem;
          background: radial-gradient(circle, rgba(59,130,246,0.18), rgba(59,130,246,0.03) 56%, transparent 78%);
          animation-delay: -9s;
        }

        .contact-bg-grid {
          background-image:
            linear-gradient(rgba(110,231,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(110,231,255,0.06) 1px, transparent 1px);
          background-size: 3.5rem 3.5rem;
          opacity: 0.42;
          mask-image: radial-gradient(circle at center, black 22%, rgba(0,0,0,0.88) 48%, transparent 78%);
          animation: contact-grid 18s linear infinite;
        }

        .contact-bg-scanlines {
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.035) 0px,
            rgba(255,255,255,0.035) 1px,
            transparent 1px,
            transparent 7px
          );
          opacity: 0.14;
          animation: contact-scan 7s linear infinite;
        }

        .contact-bg-radar {
          border-radius: 9999px;
          border: 1px solid rgba(34,211,238,0.18);
          box-shadow: 0 0 38px rgba(34,211,238,0.1);
          animation: contact-spin 20s linear infinite;
        }

        .contact-bg-radar-a {
          width: 20rem;
          height: 20rem;
        }

        .contact-bg-radar-b {
          width: 12rem;
          height: 12rem;
          border-style: dashed;
          opacity: 0.6;
          animation-direction: reverse;
          animation-duration: 14s;
        }

        .contact-bg-hud {
          display: grid;
          gap: 0.45rem;
          width: 11rem;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.13);
          background: linear-gradient(180deg, rgba(7, 12, 22, 0.72), rgba(12, 20, 34, 0.38));
          backdrop-filter: blur(10px);
          box-shadow: inset 0 0 0 1px rgba(34,211,238,0.03), 0 16px 44px rgba(0,0,0,0.2);
          padding: 1rem;
          animation: contact-float 9s ease-in-out infinite;
        }

        .contact-bg-hud-a {
          left: 17%;
          top: 22%;
          transform: rotate(-5deg);
        }

        .contact-bg-hud-b {
          right: 16%;
          top: 54%;
          transform: rotate(6deg);
          animation-delay: -4s;
        }

        .contact-bg-hud-label {
          width: 58%;
          height: 0.6rem;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgba(34,211,238,0.98), rgba(59,130,246,0.7));
        }

        .contact-bg-hud-label-alt {
          width: 44%;
          background: linear-gradient(90deg, rgba(96,165,250,0.95), rgba(168,85,247,0.75));
        }

        .contact-bg-hud-line {
          width: 100%;
          height: 0.55rem;
          border-radius: 9999px;
          background: rgba(148,163,184,0.24);
        }

        .contact-bg-hud-line-short {
          width: 68%;
        }

        .contact-bg-node {
          border-radius: 9999px;
          background: rgba(255,255,255,0.95);
          box-shadow: 0 0 18px rgba(34,211,238,0.98);
          animation: contact-pulse 4.8s ease-out infinite;
        }

        .contact-bg-node-a {
          width: 0.8rem;
          height: 0.8rem;
          left: 48%;
          top: 34%;
        }

        .contact-bg-node-b {
          width: 0.62rem;
          height: 0.62rem;
          left: 58%;
          top: 56%;
          animation-delay: -1.8s;
          box-shadow: 0 0 18px rgba(96,165,250,0.92);
        }

        .contact-bg-node-c {
          width: 0.5rem;
          height: 0.5rem;
          left: 34%;
          top: 58%;
          animation-delay: -2.8s;
          box-shadow: 0 0 14px rgba(168,85,247,0.92);
        }

        .contact-bg-circuit {
          width: min(100%, 54rem);
          height: auto;
          opacity: 0.8;
          filter: drop-shadow(0 0 14px rgba(34,211,238,0.18));
        }

        .contact-bg-circuit path {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 2.25;
          stroke-dasharray: 14 20;
          animation: contact-dash 11s linear infinite;
        }

        .contact-bg-circuit path:first-child {
          stroke: rgba(34,211,238,0.7);
        }

        .contact-bg-circuit path:nth-child(2) {
          stroke: rgba(59,130,246,0.62);
          animation-direction: reverse;
        }

        .contact-bg-circuit path:last-child {
          stroke: rgba(168,85,247,0.52);
          stroke-dasharray: 10 16;
        }

        .contact-bg-core {
          width: 7rem;
          height: 7rem;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(34,211,238,0.44), rgba(34,211,238,0.12) 48%, transparent 74%);
          box-shadow:
            0 0 28px rgba(34,211,238,0.22),
            0 0 80px rgba(59,130,246,0.12);
          animation: contact-core 6s ease-in-out infinite;
        }

        @keyframes contact-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, 0.7rem, 0) scale(1.1); }
        }

        @keyframes contact-grid {
          0% { transform: translateY(0); }
          100% { transform: translateY(3.5rem); }
        }

        @keyframes contact-scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(7px); }
        }

        @keyframes contact-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes contact-float {
          0%, 100% { transform: translateY(0) rotate(var(--contact-card-rotate, 0deg)); }
          50% { transform: translateY(-0.6rem) rotate(var(--contact-card-rotate, 0deg)); }
        }

        @keyframes contact-pulse {
          0% { transform: scale(0.7); opacity: 0.9; }
          100% { transform: scale(2.6); opacity: 0; }
        }

        @keyframes contact-core {
          0%, 100% { transform: scale(0.92); }
          50% { transform: scale(1.06); }
        }

        @keyframes contact-dash {
          to { stroke-dashoffset: -144; }
        }
      `}</style>
        </div>
    );
};

export default ContactHeroBackground;