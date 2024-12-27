"use client";

export function AlgorandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" className="text-emerald-500" />
      <path d="M8 14l4-4 4 4" className="text-emerald-500" />
    </svg>
  );
}

export function XRP() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="c">
          <stop stopColor="#FFF" stopOpacity=".5" offset="0%" />
          <stop stopOpacity=".5" offset="100%" />
        </linearGradient>
        <filter
          x="-5.8%"
          y="-4.2%"
          width="111.7%"
          height="111.7%"
          filterUnits="objectBoundingBox"
          id="a"
        >
          <feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation=".5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <circle id="b" cx="12" cy="12" r="10" />
      </defs>
      <g fill="none">
        <g transform="translate(1)">
          <use fill="#000" filter="url(#a)" />
          <use fill="#23292F" fillRule="evenodd" />
          <use
            fill="url(#c)"
            fillRule="evenodd"
            // style="mix-blend-mode:soft-light"
          />
          <circle
            strokeOpacity=".097"
            stroke="#000"
            cx="12"
            cy="12"
            r="10"
          />
        </g>
        <path
          d="M22.363 8h2.602l-5.414 5.361a5.059 5.059 0 01-7.102 0L7.032 8h2.605l4.113 4.071a3.2 3.2 0 004.496 0L22.363 8zM9.605 22.906H7l5.45-5.393a5.059 5.059 0 017.1 0L25 22.906h-2.605L18.25 18.8a3.2 3.2 0 00-4.496 0l-4.149 4.106z"
          fill="#FFF"
        />
      </g>
    </svg>
  );
}
export function Tron() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          x="-5.8%"
          y="-4.2%"
          width="111.7%"
          height="111.7%"
          filterUnits="objectBoundingBox"
          id="a"
        >
          <feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation=".5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <filter id="d">
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
          />
        </filter>
        <filter
          x="-19.7%"
          y="-18.8%"
          width="139.5%"
          height="137.5%"
          filterUnits="objectBoundingBox"
          id="e"
        >
          <feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation=".5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.204257246 0"
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="c">
          <stop stopColor="#FFF" stopOpacity=".5" offset="0%" />
          <stop stopOpacity=".5" offset="100%" />
        </linearGradient>
        <circle id="b" cx="16" cy="15" r="15" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <use fill="#000" filter="url(#a)" />
        <use fill="#EF0027" />
        <use fill="url(#c)" />
        <circle
          strokeOpacity=".097"
          stroke="#000"
          cx="16"
          cy="15"
          r="14.5"
        />
        <g filter="url(#d)">
          <g filter="url(#e)" transform="translate(7.5 6.25)">
            <path
              d="M14.432 2.663L0 .007 7.595 19.12 18.178 6.225l-3.746-3.562zm-.232 1.17l2.208 2.099-6.038 1.093 3.83-3.192zM9.058 6.806L2.694 1.528l10.402 1.914-4.038 3.364zm-.453.934l-1.038 8.58L1.972 2.237 8.605 7.74zm.96.455l6.687-1.21-7.67 9.343.983-8.133z"
              fill="#FFF"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
export function Litecoin() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 32 32"
    >
      <path
        fill="#FFF"
        fillRule="evenodd"
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-5.573-12.786L9.252 24h12.875L23 20.429h-7.722l.848-3.483 1.427-.571.68-2.75-1.41.571L18.342 8h-5.129l-2.081 8.429-1.444.58L9 19.768l1.427-.554z"
      />
    </svg>
  );
}

export function BitcoinCash() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 32 32"
    >
      <path
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm5.236-21.309c-.777-1.972-2.722-2.15-4.988-1.71l-.807-2.813-1.712.491.785 2.74c-.45.128-.907.269-1.362.41l-.79-2.758-1.712.49.806 2.813c-.369.114-.73.225-1.086.327l-.002-.008-2.362.676.525 1.829s1.257-.387 1.243-.357c.693-.2 1.035.139 1.2.467l.92 3.205c.047-.013.11-.03.184-.04l-.181.052 1.287 4.49c.032.227.003.612-.481.752.027.013-1.245.356-1.245.356l.246 2.143 2.229-.64c.414-.118.824-.228 1.226-.34l.816 2.845 1.71-.49-.806-2.815a65.74 65.74 0 001.371-.38l.803 2.803 1.712-.491-.813-2.84c2.831-.991 4.638-2.294 4.113-5.07-.422-2.234-1.725-2.912-3.472-2.836.848-.79 1.214-1.859.643-3.301zm-.651 6.77c.61 2.127-3.1 2.929-4.26 3.263l-1.08-3.77c1.16-.333 4.704-1.71 5.34.508zm-2.322-5.09c.554 1.935-2.547 2.58-3.513 2.857l-.98-3.419c.966-.277 3.914-1.455 4.493.562z"
        fill="#fff"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function Dash() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="c">
          <stop stopColor="#FFF" stopOpacity=".5" offset="0%" />
          <stop stopOpacity=".5" offset="100%" />
        </linearGradient>
        <filter
          x="-5.8%"
          y="-4.2%"
          width="111.7%"
          height="111.7%"
          filterUnits="objectBoundingBox"
          id="a"
        >
          <feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation=".5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <circle id="b" cx="15" cy="15" r="15" />
      </defs>
      <g fill="none">
        <g transform="translate(1)">
          <use fill="#000" filter="url(#a)" />
          <use fill="#008CE7" fillRule="evenodd" />
          <use fill="url(#c)" fillRule="evenodd" />
          <circle
            strokeOpacity=".097"
            stroke="#000"
            cx="15"
            cy="15"
            r="14.5"
          />
        </g>
        <g fill="#FFF">
          <path d="M18.777 8.004H12.23l-.542 3.03 5.906.008c2.908 0 3.77 1.056 3.743 2.809-.012.898-.404 2.417-.57 2.908-.447 1.313-1.369 2.808-4.822 2.805l-5.74-.004-.543 3.034h6.532c2.302 0 3.283-.27 4.32-.748 2.298-1.06 3.667-3.33 4.217-6.294.815-4.41-.202-7.548-5.954-7.548z" />
          <path d="M15.826 15.018c.214-.886.28-1.242.28-1.242h-6.7c-1.714 0-1.959 1.115-2.121 1.792a27.99 27.99 0 00-.281 1.242h6.701c1.713 0 1.959-1.115 2.12-1.792z" />
        </g>
      </g>
    </svg>
  );
}

export function Doge() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 32 32"
    >
      <path
        fill="#FFF"
        fillRule="evenodd"
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-5.518-15.104V24h6.549c1.21 0 2.257-.21 3.142-.627.885-.419 1.607-.99 2.168-1.715.56-.724.977-1.572 1.25-2.543.273-.971.409-2.01.409-3.115a11.47 11.47 0 00-.41-3.115c-.272-.97-.689-1.819-1.25-2.543-.56-.725-1.282-1.296-2.167-1.715C19.288 8.21 18.24 8 17.03 8h-6.549v6.61H9v2.286h1.482zm2.766-2.285v-4.325h2.721c1.077 0 1.958.145 2.644.437.686.291 1.224.694 1.615 1.21a4.4 4.4 0 01.796 1.815c.14.695.21 1.445.21 2.252a11.4 11.4 0 01-.21 2.252c-.14.695-.405 1.3-.796 1.815-.391.516-.93.919-1.615 1.21-.686.292-1.567.437-2.644.437h-2.721v-4.818h4.314v-2.285h-4.314z"
      />
    </svg>
  );
}

export function BNBSmartChain() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 32 32"
    >
      <path
        fill="#FFF"
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-3.884-17.596L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26 2.26L10.52 16l-2.26-2.26L6 16zm6.116 1.596l-2.263 2.257.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48l-3.884-3.884zM21.48 16l2.26 2.26L26 16l-2.26-2.26L21.48 16zm-3.188-.002h.001L16 13.706 14.305 15.4l-.195.195-.401.402-.004.003.004.003 2.29 2.291 2.294-2.293.001-.001-.002-.001z"
      />
    </svg>
  );
}
export function Polygon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="c">
          <stop stopColor="#FFF" stopOpacity=".5" offset="0%" />
          <stop stopOpacity=".5" offset="100%" />
        </linearGradient>
        <filter
          x="-5.8%"
          y="-4.2%"
          width="111.7%"
          height="111.7%"
          filterUnits="objectBoundingBox"
          id="a"
        >
          <feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation=".5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <circle id="b" cx="16" cy="15" r="15" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <use fill="#000" filter="url(#a)" />
        <use fill="#6F41D8" />
        <use fill="url(#c)" />
        <circle
          strokeOpacity=".097"
          stroke="#000"
          cx="16"
          cy="15"
          r="14.5"
        />
        <path
          d="M21.092 11.693c-.369-.215-.848-.215-1.254 0l-2.879 1.654-1.955 1.078-2.879 1.653c-.369.216-.848.216-1.254 0l-2.288-1.294c-.369-.215-.627-.61-.627-1.042V11.19c0-.431.221-.826.627-1.042l2.25-1.258c.37-.216.85-.216 1.256 0l2.25 1.258c.37.216.628.611.628 1.042v1.654l1.955-1.115v-1.653a1.16 1.16 0 00-.627-1.042l-4.17-2.372c-.369-.216-.848-.216-1.254 0L6.627 9.034A1.16 1.16 0 006 10.076v4.78c0 .432.221.827.627 1.043l4.244 2.372c.369.215.849.215 1.254 0l2.879-1.618 1.955-1.114 2.879-1.617c.369-.216.848-.216 1.254 0l2.251 1.258c.37.215.627.61.627 1.042v2.552c0 .431-.22.826-.627 1.042l-2.25 1.294c-.37.216-.85.216-1.255 0l-2.251-1.258c-.37-.216-.628-.611-.628-1.042v-1.654l-1.955 1.115v1.653c0 .431.221.827.627 1.042l4.244 2.372c.369.216.848.216 1.254 0l4.244-2.372c.369-.215.627-.61.627-1.042v-4.78a1.16 1.16 0 00-.627-1.042l-4.28-2.409z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}

export function Arbitrum() {}
export function Optimism() {}
export function Base() {}

export function Avalanche() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm.243 7h-.473c-.592 0-1.039.343-1.341 1.042l-2.327 5.896h-1.761c-.528.002-.956.448-.96 1v.014c.004.553.432.999.96 1.001h.946l-2.221 5.621a1.235 1.235 0 00-.066.384c0 .315.092.562.263.754.17.192.407.288.71.288a.933.933 0 00.552-.192c.17-.123.289-.302.38-.507l2.446-6.348h1.696c.527-.002.955-.449.96-1.001v-.027c-.005-.553-.433-1-.96-1.001h-.907l1.866-4.867L21.093 22.3c.092.205.21.384.381.507.161.122.354.19.553.192.302 0 .539-.096.71-.288.17-.192.262-.439.262-.754a.944.944 0 00-.065-.384l-5.35-13.532C17.28 7.342 16.834 7 16.243 7z"
        fill="#FFF"
        fillRule="evenodd"
      />
    </svg>
  );
}
export function Solana() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="c">
          <stop stopColor="#FFF" stopOpacity=".5" offset="0%" />
          <stop stopOpacity=".5" offset="100%" />
        </linearGradient>
        <filter
          x="-5.8%"
          y="-4.2%"
          width="111.7%"
          height="111.7%"
          filterUnits="objectBoundingBox"
          id="a"
        >
          <feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation=".5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <circle id="b" cx="16" cy="15" r="15" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <use fill="#000" filter="url(#a)" />
        <use fill="#66F9A1" />
        <use fill="url(#c)" />
        <circle
          strokeOpacity=".097"
          stroke="#000"
          cx="16"
          cy="15"
          r="14.5"
        />
        <path
          d="M9.925 18.687a.59.59 0 01.415-.17h14.366a.29.29 0 01.207.497l-2.838 2.815a.59.59 0 01-.415.171H7.294a.291.291 0 01-.207-.498l2.838-2.815zm0-10.517A.59.59 0 0110.34 8h14.366c.261 0 .392.314.207.498l-2.838 2.815a.59.59 0 01-.415.17H7.294a.291.291 0 01-.207-.497L9.925 8.17zm12.15 5.225a.59.59 0 00-.415-.17H7.294a.291.291 0 00-.207.498l2.838 2.815c.11.109.26.17.415.17h14.366a.291.291 0 00.207-.498l-2.838-2.815z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}
