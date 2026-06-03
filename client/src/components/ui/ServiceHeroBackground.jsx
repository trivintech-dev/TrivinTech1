const ServiceHeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="service-bg-wash service-bg-wash-a" />
      <div className="service-bg-wash service-bg-wash-b" />
      <div className="service-bg-wash service-bg-wash-c" />

      <div className="absolute inset-0 service-bg-grid" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="service-bg-orbit service-bg-orbit-a" />
        <div className="service-bg-orbit service-bg-orbit-b" />
        <div className="service-bg-orbit service-bg-orbit-c" />

        <div className="service-bg-card service-bg-card-a">
          <div className="service-bg-card-label">Discovery</div>
          <div className="service-bg-card-line" />
          <div className="service-bg-card-line service-bg-card-line-short" />
        </div>

        <div className="service-bg-card service-bg-card-b">
          <div className="service-bg-card-label service-bg-card-label-alt">Design</div>
          <div className="service-bg-card-line" />
          <div className="service-bg-card-line service-bg-card-line-short" />
        </div>

        <div className="service-bg-card service-bg-card-c">
          <div className="service-bg-card-label service-bg-card-label-accent">Launch</div>
          <div className="service-bg-card-line" />
          <div className="service-bg-card-line service-bg-card-line-short" />
        </div>

        <div className="service-bg-pip service-bg-pip-a" />
        <div className="service-bg-pip service-bg-pip-b" />
        <div className="service-bg-pip service-bg-pip-c" />

        <svg className="service-bg-flow" viewBox="0 0 1100 520" aria-hidden="true">
          <path d="M70 340 C 180 240, 300 250, 420 320 S 650 430, 770 300 S 960 210, 1040 290" />
          <path d="M120 170 C 260 120, 360 170, 470 230 S 680 310, 820 250 S 970 170, 1060 190" />
          <path d="M180 420 C 310 360, 430 360, 540 400 S 760 470, 900 380" />
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/70 to-transparent" />

      <style>{`
        .service-bg-wash,
        .service-bg-orbit,
        .service-bg-card,
        .service-bg-pip,
        .service-bg-flow {
          position: absolute;
          pointer-events: none;
        }

        .service-bg-wash {
          border-radius: 9999px;
          filter: blur(24px);
          opacity: 0.7;
          mix-blend-mode: screen;
          animation: service-drift 18s ease-in-out infinite;
        }

        .service-bg-wash-a {
          width: 24rem;
          height: 24rem;
          left: -7rem;
          top: -5rem;
          background: radial-gradient(circle, rgba(45,212,191,0.22), rgba(45,212,191,0.06) 56%, transparent 78%);
        }

        .service-bg-wash-b {
          width: 20rem;
          height: 20rem;
          right: -6rem;
          top: 0;
          background: radial-gradient(circle, rgba(59,130,246,0.2), rgba(59,130,246,0.05) 56%, transparent 78%);
          animation-delay: -5s;
        }

        .service-bg-wash-c {
          width: 18rem;
          height: 18rem;
          left: 42%;
          bottom: -7rem;
          background: radial-gradient(circle, rgba(251,191,36,0.18), rgba(251,191,36,0.04) 56%, transparent 78%);
          animation-delay: -9s;
        }

        .service-bg-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 4rem 4rem;
          opacity: 0.28;
          mask-image: radial-gradient(circle at center, black 20%, rgba(0,0,0,0.82) 54%, transparent 82%);
          animation: service-grid-move 22s linear infinite;
        }

        .service-bg-orbit {
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
          animation: service-spin 28s linear infinite;
        }

        .service-bg-orbit-a {
          width: 24rem;
          height: 24rem;
          border-style: solid;
          opacity: 0.45;
        }

        .service-bg-orbit-b {
          width: 16rem;
          height: 16rem;
          border-style: dashed;
          opacity: 0.58;
          animation-direction: reverse;
          animation-duration: 18s;
        }

        .service-bg-orbit-c {
          width: 9rem;
          height: 9rem;
          border-style: dotted;
          opacity: 0.42;
          animation-duration: 14s;
        }

        .service-bg-card {
          width: 11rem;
          display: grid;
          gap: 0.5rem;
          border-radius: 1.05rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: linear-gradient(180deg, rgba(6,12,24,0.72), rgba(16,24,40,0.42));
          backdrop-filter: blur(12px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.22);
          padding: 1rem;
          animation: service-float 9.5s ease-in-out infinite;
        }

        .service-bg-card-a {
          left: 16%;
          top: 22%;
          --service-rotate: -7deg;
        }

        .service-bg-card-b {
          right: 17%;
          top: 31%;
          --service-rotate: 8deg;
          animation-delay: -3s;
        }

        .service-bg-card-c {
          right: 22%;
          bottom: 18%;
          --service-rotate: -4deg;
          animation-delay: -6s;
        }

        .service-bg-card-label {
          width: fit-content;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgba(45,212,191,0.94), rgba(14,165,233,0.82));
          color: #effcff;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          padding: 0.4rem 0.75rem;
          text-transform: uppercase;
        }

        .service-bg-card-label-alt {
          background: linear-gradient(90deg, rgba(59,130,246,0.94), rgba(99,102,241,0.8));
        }

        .service-bg-card-label-accent {
          background: linear-gradient(90deg, rgba(251,191,36,0.95), rgba(244,114,182,0.75));
        }

        .service-bg-card-line {
          width: 100%;
          height: 0.55rem;
          border-radius: 9999px;
          background: rgba(148,163,184,0.18);
        }

        .service-bg-card-line-short {
          width: 68%;
        }

        .service-bg-pip {
          width: 0.72rem;
          height: 0.72rem;
          border-radius: 9999px;
          background: rgba(255,255,255,0.95);
          box-shadow:
            0 0 16px rgba(45,212,191,0.9),
            0 0 28px rgba(59,130,246,0.28);
          animation: service-pulse 5.2s ease-out infinite;
        }

        .service-bg-pip-a {
          left: 45%;
          top: 28%;
        }

        .service-bg-pip-b {
          left: 58%;
          top: 54%;
          animation-delay: -1.7s;
          box-shadow:
            0 0 16px rgba(251,191,36,0.88),
            0 0 28px rgba(251,191,36,0.2);
        }

        .service-bg-pip-c {
          left: 34%;
          top: 62%;
          animation-delay: -3.1s;
          box-shadow:
            0 0 16px rgba(99,102,241,0.88),
            0 0 28px rgba(99,102,241,0.24);
        }

        .service-bg-flow {
          width: min(100%, 68rem);
          height: auto;
          opacity: 0.82;
          filter: drop-shadow(0 0 14px rgba(45,212,191,0.14));
        }

        .service-bg-flow path {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 2.2;
          stroke-dasharray: 10 16;
          animation: service-dash 11s linear infinite;
        }

        .service-bg-flow path:nth-child(1) {
          stroke: rgba(45,212,191,0.72);
        }

        .service-bg-flow path:nth-child(2) {
          stroke: rgba(59,130,246,0.62);
          animation-direction: reverse;
        }

        .service-bg-flow path:nth-child(3) {
          stroke: rgba(251,191,36,0.54);
        }

        @keyframes service-drift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, 0.9rem, 0) scale(1.08);
          }
        }

        @keyframes service-grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4rem);
          }
        }

        @keyframes service-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes service-float {
          0%,
          100% {
            transform: translateY(0) rotate(var(--service-rotate, 0deg));
          }
          50% {
            transform: translateY(-0.7rem) rotate(var(--service-rotate, 0deg));
          }
        }

        @keyframes service-pulse {
          0% {
            transform: scale(0.72);
            opacity: 0.92;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes service-dash {
          to {
            stroke-dashoffset: -160;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceHeroBackground;