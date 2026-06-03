const InvestorHeroBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="investor-bg-halo investor-bg-halo-a" />
            <div className="investor-bg-halo investor-bg-halo-b" />
            <div className="investor-bg-halo investor-bg-halo-c" />

            <div className="absolute inset-0 investor-bg-grid" />
            <div className="absolute inset-0 investor-bg-sheen" />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="investor-bg-ring investor-bg-ring-a" />
                <div className="investor-bg-ring investor-bg-ring-b" />

                <svg className="investor-bg-chart" viewBox="0 0 900 420" aria-hidden="true">
                    <path d="M80 310 L180 260 L280 285 L390 220 L520 240 L650 165 L790 140" />
                    <path d="M80 240 L180 215 L280 190 L390 175 L520 150 L650 120 L790 95" />
                    <path d="M160 330 L260 305 L360 280 L470 250 L580 230 L710 180" />
                </svg>

                <div className="investor-bg-card investor-bg-card-a">
                    <span className="investor-bg-card-kicker" />
                    <span className="investor-bg-card-line" />
                    <span className="investor-bg-card-line investor-bg-card-line-short" />
                </div>

                <div className="investor-bg-card investor-bg-card-b">
                    <span className="investor-bg-card-kicker investor-bg-card-kicker-alt" />
                    <span className="investor-bg-card-line" />
                    <span className="investor-bg-card-line investor-bg-card-line-short" />
                </div>

                <div className="investor-bg-meter investor-bg-meter-a" />
                <div className="investor-bg-meter investor-bg-meter-b" />
                <div className="investor-bg-meter investor-bg-meter-c" />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 to-transparent" />

            <style>{`
        .investor-bg-halo,
        .investor-bg-ring,
        .investor-bg-card,
        .investor-bg-meter,
        .investor-bg-chart,
        .investor-bg-sheen {
          position: absolute;
          pointer-events: none;
        }

        .investor-bg-halo {
          border-radius: 9999px;
          filter: blur(18px);
          opacity: 0.68;
          mix-blend-mode: screen;
          animation: investor-drift 16s ease-in-out infinite;
        }

        .investor-bg-halo-a {
          width: 24rem;
          height: 24rem;
          left: -6rem;
          top: -7rem;
          background: radial-gradient(circle, rgba(250,204,21,0.22), rgba(250,204,21,0.04) 56%, transparent 78%);
        }

        .investor-bg-halo-b {
          width: 18rem;
          height: 18rem;
          right: -4rem;
          top: 1rem;
          background: radial-gradient(circle, rgba(56,189,248,0.2), rgba(56,189,248,0.04) 56%, transparent 78%);
          animation-delay: -5s;
        }

        .investor-bg-halo-c {
          width: 16rem;
          height: 16rem;
          left: 42%;
          bottom: -6rem;
          background: radial-gradient(circle, rgba(168,85,247,0.18), rgba(168,85,247,0.03) 56%, transparent 78%);
          animation-delay: -9s;
        }

        .investor-bg-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 4rem 4rem;
          opacity: 0.32;
          mask-image: radial-gradient(circle at center, black 20%, rgba(0,0,0,0.88) 46%, transparent 78%);
          animation: investor-grid 22s linear infinite;
        }

        .investor-bg-sheen {
          inset: 0;
          background:
            radial-gradient(circle at 50% 32%, rgba(255,255,255,0.08), transparent 28%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 36%);
          opacity: 0.45;
        }

        .investor-bg-ring {
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.12);
          animation: investor-spin 28s linear infinite;
        }

        .investor-bg-ring-a {
          width: 20rem;
          height: 20rem;
          border-color: rgba(250,204,21,0.14);
          box-shadow: 0 0 32px rgba(250,204,21,0.07);
        }

        .investor-bg-ring-b {
          width: 12rem;
          height: 12rem;
          border-style: dashed;
          opacity: 0.55;
          animation-direction: reverse;
          animation-duration: 16s;
        }

        .investor-bg-chart {
          width: min(100%, 56rem);
          height: auto;
          opacity: 0.92;
          filter: drop-shadow(0 0 14px rgba(250,204,21,0.14));
        }

        .investor-bg-chart path {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 3;
          stroke-dasharray: 12 16;
          animation: investor-dash 9s linear infinite;
        }

        .investor-bg-chart path:first-child {
          stroke: rgba(250,204,21,0.74);
        }

        .investor-bg-chart path:nth-child(2) {
          stroke: rgba(56,189,248,0.72);
          animation-direction: reverse;
        }

        .investor-bg-chart path:last-child {
          stroke: rgba(168,85,247,0.58);
          stroke-dasharray: 16 20;
        }

        .investor-bg-card {
          display: grid;
          gap: 0.45rem;
          width: 11rem;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(180deg, rgba(8, 12, 20, 0.8), rgba(16, 24, 38, 0.38));
          backdrop-filter: blur(12px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.2);
          padding: 1rem;
          animation: investor-float 10s ease-in-out infinite;
        }

        .investor-bg-card-a {
          left: 15%;
          top: 24%;
          transform: rotate(-4deg);
        }

        .investor-bg-card-b {
          right: 16%;
          top: 54%;
          transform: rotate(5deg);
          animation-delay: -4s;
        }

        .investor-bg-card-kicker {
          width: 50%;
          height: 0.6rem;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgba(250,204,21,0.95), rgba(245,158,11,0.7));
        }

        .investor-bg-card-kicker-alt {
          background: linear-gradient(90deg, rgba(56,189,248,0.95), rgba(168,85,247,0.7));
        }

        .investor-bg-card-line {
          width: 100%;
          height: 0.5rem;
          border-radius: 9999px;
          background: rgba(148,163,184,0.24);
        }

        .investor-bg-card-line-short {
          width: 70%;
        }

        .investor-bg-meter {
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 0 18px rgba(250,204,21,0.18);
          animation: investor-pulse 5.2s ease-out infinite;
        }

        .investor-bg-meter-a {
          width: 0.75rem;
          height: 0.75rem;
          left: 48%;
          top: 32%;
          background: rgba(250,204,21,0.95);
        }

        .investor-bg-meter-b {
          width: 0.58rem;
          height: 0.58rem;
          left: 61%;
          top: 53%;
          background: rgba(56,189,248,0.95);
          animation-delay: -1.8s;
        }

        .investor-bg-meter-c {
          width: 0.46rem;
          height: 0.46rem;
          left: 36%;
          top: 59%;
          background: rgba(168,85,247,0.95);
          animation-delay: -3.2s;
        }

        @keyframes investor-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, 0.75rem, 0) scale(1.08); }
        }

        @keyframes investor-grid {
          0% { transform: translateY(0); }
          100% { transform: translateY(4rem); }
        }

        @keyframes investor-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes investor-float {
          0%, 100% { transform: translateY(0) rotate(var(--investor-card-rotate, 0deg)); }
          50% { transform: translateY(-0.55rem) rotate(var(--investor-card-rotate, 0deg)); }
        }

        @keyframes investor-pulse {
          0% { transform: scale(0.72); opacity: 0.9; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        @keyframes investor-dash {
          to { stroke-dashoffset: -140; }
        }
      `}</style>
        </div>
    );
};

export default InvestorHeroBackground;