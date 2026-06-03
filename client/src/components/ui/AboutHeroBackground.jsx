const AboutHeroBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="about-bg-orb about-bg-orb-a" />
            <div className="about-bg-orb about-bg-orb-b" />
            <div className="about-bg-orb about-bg-orb-c" />

            <div className="absolute inset-0 about-bg-grid" />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="about-bg-ring about-bg-ring-a" />
                <div className="about-bg-ring about-bg-ring-b" />

                <div className="about-bg-panel about-bg-panel-a">
                    <div className="about-bg-panel-chip" />
                    <div className="about-bg-panel-line" />
                    <div className="about-bg-panel-line about-bg-panel-line-short" />
                </div>

                <div className="about-bg-panel about-bg-panel-b">
                    <div className="about-bg-panel-chip about-bg-panel-chip-alt" />
                    <div className="about-bg-panel-line" />
                    <div className="about-bg-panel-line about-bg-panel-line-short" />
                </div>

                <div className="about-bg-node about-bg-node-a" />
                <div className="about-bg-node about-bg-node-b" />
                <div className="about-bg-node about-bg-node-c" />

                <svg className="about-bg-flow" viewBox="0 0 900 420" aria-hidden="true">
                    <path d="M70 210 C 160 120, 260 120, 340 200 S 520 300, 640 210 S 760 130, 850 200" />
                    <path d="M120 95 C 250 170, 330 240, 430 190 S 620 95, 760 165" />
                </svg>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/65 to-transparent" />

            <style>{`
        .about-bg-orb,
        .about-bg-ring,
        .about-bg-panel,
        .about-bg-node,
        .about-bg-flow {
          position: absolute;
          pointer-events: none;
        }

        .about-bg-orb {
          border-radius: 9999px;
          filter: blur(20px);
          opacity: 0.7;
          mix-blend-mode: screen;
          animation: about-drift 15s ease-in-out infinite;
        }

        .about-bg-orb-a {
          width: 22rem;
          height: 22rem;
          left: -6rem;
          top: -5rem;
          background: radial-gradient(circle, rgba(110,231,255,0.24), rgba(110,231,255,0.05) 54%, transparent 76%);
        }

        .about-bg-orb-b {
          width: 18rem;
          height: 18rem;
          right: -5rem;
          top: 1rem;
          background: radial-gradient(circle, rgba(167,139,250,0.18), rgba(167,139,250,0.04) 56%, transparent 78%);
          animation-delay: -4s;
        }

        .about-bg-orb-c {
          width: 16rem;
          height: 16rem;
          left: 40%;
          bottom: -6rem;
          background: radial-gradient(circle, rgba(45,212,191,0.16), rgba(45,212,191,0.03) 56%, transparent 78%);
          animation-delay: -8s;
        }

        .about-bg-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 3.5rem 3.5rem;
          opacity: 0.34;
          mask-image: radial-gradient(circle at center, black 24%, rgba(0,0,0,0.88) 48%, transparent 78%);
          animation: about-grid 20s linear infinite;
        }

        .about-bg-ring {
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.12);
          animation: about-spin 24s linear infinite;
        }

        .about-bg-ring-a {
          width: 20rem;
          height: 20rem;
          border-style: solid;
        }

        .about-bg-ring-b {
          width: 13rem;
          height: 13rem;
          border-style: dashed;
          opacity: 0.55;
          animation-direction: reverse;
          animation-duration: 16s;
        }

        .about-bg-panel {
          width: 11rem;
          display: grid;
          gap: 0.45rem;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
          backdrop-filter: blur(10px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.16);
          padding: 1rem;
          animation: about-float 9s ease-in-out infinite;
        }

        .about-bg-panel-a {
          left: 18%;
          top: 24%;
          transform: rotate(-5deg);
        }

        .about-bg-panel-b {
          right: 18%;
          top: 54%;
          transform: rotate(6deg);
          animation-delay: -4s;
        }

        .about-bg-panel-chip {
          width: 52%;
          height: 0.65rem;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgba(110,231,255,0.95), rgba(59,130,246,0.7));
        }

        .about-bg-panel-chip-alt {
          background: linear-gradient(90deg, rgba(45,212,191,0.95), rgba(99,102,241,0.7));
        }

        .about-bg-panel-line {
          width: 100%;
          height: 0.5rem;
          border-radius: 9999px;
          background: rgba(148,163,184,0.25);
        }

        .about-bg-panel-line-short {
          width: 70%;
        }

        .about-bg-node {
          width: 0.65rem;
          height: 0.65rem;
          border-radius: 9999px;
          background: rgba(255,255,255,0.95);
          box-shadow: 0 0 18px rgba(110,231,255,0.95);
          animation: about-pulse 4.8s ease-out infinite;
        }

        .about-bg-node-a {
          left: 48%;
          top: 30%;
        }

        .about-bg-node-b {
          left: 58%;
          top: 58%;
          animation-delay: -1.6s;
          box-shadow: 0 0 16px rgba(45,212,191,0.9);
        }

        .about-bg-node-c {
          left: 36%;
          top: 60%;
          animation-delay: -2.8s;
          box-shadow: 0 0 16px rgba(167,139,250,0.9);
        }

        .about-bg-flow {
          width: min(100%, 56rem);
          height: auto;
          opacity: 0.78;
          filter: drop-shadow(0 0 16px rgba(110,231,255,0.16));
        }

        .about-bg-flow path {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 2.2;
          stroke-dasharray: 12 18;
          animation: about-dash 10s linear infinite;
        }

        .about-bg-flow path:first-child {
          stroke: rgba(110,231,255,0.72);
        }

        .about-bg-flow path:last-child {
          stroke: rgba(45,212,191,0.58);
          animation-direction: reverse;
        }

        @keyframes about-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, 0.7rem, 0) scale(1.08); }
        }

        @keyframes about-grid {
          0% { transform: translateY(0); }
          100% { transform: translateY(3.5rem); }
        }

        @keyframes about-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes about-float {
          0%, 100% { transform: translateY(0) rotate(var(--about-panel-rotate, 0deg)); }
          50% { transform: translateY(-0.55rem) rotate(var(--about-panel-rotate, 0deg)); }
        }

        @keyframes about-pulse {
          0% { transform: scale(0.7); opacity: 0.9; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        @keyframes about-dash {
          to { stroke-dashoffset: -140; }
        }
      `}</style>
        </div>
    );
};

export default AboutHeroBackground;