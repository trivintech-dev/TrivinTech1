const CareersHeroBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="careers-bg-orb careers-bg-orb-a" />
            <div className="careers-bg-orb careers-bg-orb-b" />
            <div className="careers-bg-orb careers-bg-orb-c" />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,24,0.18),rgba(6,12,24,0.6))]" />
            <div className="absolute inset-0 careers-bg-grid" />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="careers-bg-ring careers-bg-ring-a" />
                <div className="careers-bg-ring careers-bg-ring-b" />
                <div className="careers-bg-ring careers-bg-ring-c" />

                <div className="careers-bg-node careers-bg-node-a" />
                <div className="careers-bg-node careers-bg-node-b" />
                <div className="careers-bg-node careers-bg-node-c" />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/55 to-transparent" />

            <style>{`
        .careers-bg-orb,
        .careers-bg-ring,
        .careers-bg-node {
          position: absolute;
          pointer-events: none;
        }

        .careers-bg-orb {
          border-radius: 9999px;
          filter: blur(18px);
          opacity: 0.7;
          mix-blend-mode: screen;
          animation: careers-drift 14s ease-in-out infinite;
        }

        .careers-bg-orb-a {
          width: 24rem;
          height: 24rem;
          left: -6rem;
          top: -7rem;
          background: radial-gradient(circle, rgba(110,231,255,0.28), rgba(110,231,255,0.06) 52%, transparent 72%);
        }

        .careers-bg-orb-b {
          width: 20rem;
          height: 20rem;
          right: -4rem;
          top: 2rem;
          background: radial-gradient(circle, rgba(168,85,247,0.22), rgba(168,85,247,0.05) 56%, transparent 74%);
          animation-delay: -4s;
        }

        .careers-bg-orb-c {
          width: 18rem;
          height: 18rem;
          left: 34%;
          bottom: -6rem;
          background: radial-gradient(circle, rgba(74,222,128,0.18), rgba(74,222,128,0.04) 54%, transparent 76%);
          animation-delay: -8s;
        }

        .careers-bg-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 3.75rem 3.75rem;
          mask-image: radial-gradient(circle at center, black 22%, rgba(0,0,0,0.9) 46%, transparent 76%);
          opacity: 0.4;
          animation: careers-grid-shift 18s linear infinite;
        }

        .careers-bg-ring {
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.13);
          box-shadow: 0 0 40px rgba(110,231,255,0.08);
          animation: careers-rotate 24s linear infinite;
        }

        .careers-bg-ring-a {
          width: 20rem;
          height: 20rem;
          transform: translateY(-0.5rem);
        }

        .careers-bg-ring-b {
          width: 15rem;
          height: 15rem;
          border-style: dashed;
          opacity: 0.5;
          animation-direction: reverse;
          animation-duration: 18s;
        }

        .careers-bg-ring-c {
          width: 10rem;
          height: 10rem;
          border-color: rgba(255,255,255,0.08);
          animation-duration: 12s;
        }

        .careers-bg-node {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 9999px;
          background: rgba(255,255,255,0.9);
          box-shadow: 0 0 18px rgba(110,231,255,0.95);
        }

        .careers-bg-node-a {
          top: 22%;
          left: 50%;
          animation: careers-node-a 10s ease-in-out infinite;
        }

        .careers-bg-node-b {
          top: 58%;
          left: 20%;
          width: 0.65rem;
          height: 0.65rem;
          box-shadow: 0 0 16px rgba(168,85,247,0.95);
          animation: careers-node-b 12s ease-in-out infinite;
        }

        .careers-bg-node-c {
          top: 66%;
          right: 24%;
          width: 0.55rem;
          height: 0.55rem;
          box-shadow: 0 0 14px rgba(74,222,128,0.95);
          animation: careers-node-c 11s ease-in-out infinite;
        }

        @keyframes careers-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, 1rem, 0) scale(1.08); }
        }

        @keyframes careers-grid-shift {
          0% { transform: translateY(0); }
          100% { transform: translateY(3.75rem); }
        }

        @keyframes careers-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes careers-node-a {
          0%, 100% { transform: translate(-50%, -50%) translate3d(0, 0, 0); }
          50% { transform: translate(-50%, -50%) translate3d(3.5rem, -1.75rem, 0); }
        }

        @keyframes careers-node-b {
          0%, 100% { transform: translate(-50%, -50%) translate3d(0, 0, 0); }
          50% { transform: translate(-50%, -50%) translate3d(2rem, 2.4rem, 0); }
        }

        @keyframes careers-node-c {
          0%, 100% { transform: translate(50%, -50%) translate3d(0, 0, 0); }
          50% { transform: translate(50%, -50%) translate3d(-2.4rem, -2rem, 0); }
        }
      `}</style>
        </div>
    );
};

export default CareersHeroBackground;