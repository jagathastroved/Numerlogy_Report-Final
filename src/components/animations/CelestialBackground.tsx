import Particles from './Particles';

export default function CelestialBackground() {
  const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22', '33'];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#05060A]">

      
      {/* Dark overlay to ensure text remains readable if the image is too bright */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-[#0A0A14] opacity-80" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating Numerology Numbers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {NUMBERS?.map((num, i) => {
          const left = Math.random() * 90 + 5;
          const top = Math.random() * 90 + 5;
          const delay = Math.random() * 8;
          const duration = Math.random() * 10 + 10;
          const scale = Math.random() * 1.5 + 0.5;

          return (
            <div
              key={`num-${i}`}
              className="absolute text-[#d4af37] font-display font-black opacity-[0.15] animate-float select-none mix-blend-screen"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                fontSize: `${scale * 3}rem`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            >
              {num}
            </div>
          );
        })}
      </div>

      {/* Animated Particles background overlay (React Bits style) */}
      <Particles
        particleColors={["#ffffff", "#d4af37", "#a8a8ff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      {/* Glowing mystical accents to match the astrology theme */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#6868F9] rounded-full mix-blend-screen blur-[120px] animate-pulse-glow" style={{ opacity: 0.15 }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#F4742E] rounded-full mix-blend-screen blur-[100px] animate-pulse-glow" style={{ animationDelay: '3s', opacity: 0.1 }} />
    </div>
  );
}
