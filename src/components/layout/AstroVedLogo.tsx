
interface AstroVedLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function AstroVedLogo({ showText = true, size = 'md', className = '' }: AstroVedLogoProps) {
  let iconWidth = 36;
  let iconHeight = 36;
  let textSizeClass = 'text-xl font-black tracking-tight';

  if (size === 'sm') {
    iconWidth = 24;
    iconHeight = 24;
    textSizeClass = 'text-sm font-normal tracking-tight';
  } else if (size === 'lg') {
    iconWidth = 48;
    iconHeight = 48;
    textSizeClass = 'text-2xl font-black tracking-tight';
  } else if (size === 'xl') {
    iconWidth = 80;
    iconHeight = 80;
    textSizeClass = 'text-4xl font-normal tracking-tight';
  }

  return (
    <div className={`flex items-center justify-center gap-2 select-none ${className}`}>
      {/* Stylized Modern "A" with inner orange/amber diamond representing the exact logo design */}
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
      >
        {/* Outer stylized A shape in AstroVed Brand Violet-Blue */}
        <path
          d="M50 12L15 82H33L50 46L67 82H85L50 12Z"
          fill="#5C5EFF"
        />
        {/* Inner white gap triangle of 'A' */}
        <path
          d="M50 32L35 68H65L50 32Z"
          fill="#FFFFFF"
        />
        {/* Double-colored precise diamond flame matching uploaded image */}
        {/* Bottom orange core diamond */}
        <path
          d="M50 48L60 61L50 74L40 61L50 48Z"
          fill="#EA580C"
        />
        {/* Top gold diamond overlay */}
        <path
          d="M50 48L55 54.5L50 61L45 54.5L50 48Z"
          fill="#F59E0B"
        />
      </svg>
      {showText && (
        <span className={`font-sans tracking-tight font-normal text-[#5C5EFF] leading-none ${textSizeClass}`}>
          Astro<span className="text-[#5C5EFF]">Ved</span>
        </span>
      )}
    </div>
  );
}
