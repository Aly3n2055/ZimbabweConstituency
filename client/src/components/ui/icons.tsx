import { SVGProps } from "react";

export function ZanupfLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="100" height="100" rx="5" fill="#000000" />
      <rect x="5" y="5" width="90" height="90" rx="3" fill="#FCD116" />
      <text
        x="50"
        y="60"
        fontFamily="Arial"
        fontSize="24"
        fontWeight="bold"
        fill="#000000"
        textAnchor="middle"
      >
        ZANU PF
      </text>
    </svg>
  );
}

export function ZimbabweFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 900 450"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="900" height="450" fill="#006400" />
      <rect width="900" height="64.3" fill="#FFD200" y="64.3" />
      <rect width="900" height="64.3" fill="#FFFFFF" y="128.6" />
      <rect width="900" height="64.3" fill="#000000" y="192.9" />
      <rect width="900" height="64.3" fill="#FFFFFF" y="257.2" />
      <rect width="900" height="64.3" fill="#FF3200" y="321.5" />
      <polygon points="0,0 450,225 0,450" fill="#FFFFFF" />
      <polygon points="164,225 0,110 0,340" fill="#000000" />
      <polygon points="160,225 46,225 103,180" fill="#FF3200" />
    </svg>
  );
}

export function KuwadzanaWestLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="50" cy="50" r="45" fill="#008751" />
      <circle cx="50" cy="50" r="40" fill="#FFFFFF" />
      <path
        d="M25 50 L40 35 L40 45 L60 45 L60 35 L75 50 L60 65 L60 55 L40 55 L40 65 Z"
        fill="#008751"
      />
      <path
        d="M22 75 C35 85, 65 85, 78 75"
        stroke="#FCD116"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M22 25 C35 15, 65 15, 78 25"
        stroke="#CE1126"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}
