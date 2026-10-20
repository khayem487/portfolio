export function Icon({ name, size = 20, ...props }) {
  const paths = {
    arrow: (
      <>
        <path d="M4.5 12h15M13 5.5 19.5 12 13 18.5" />
      </>
    ),
    external: (
      <>
        <path d="M8 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3M13 3h8v8M21 3 10 14" />
      </>
    ),
    github: (
      <>
        <path
          d="M9 19c-4.3 1.3-4.3-2-6-2.5M15 22v-3.9a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.7-1.6 6.7-7.3A5.7 5.7 0 0 0 19.2 4a5.3 5.3 0 0 0-.1-4s-1.3-.4-4.3 1.6a14.5 14.5 0 0 0-7.8 0C4-.4 2.7 0 2.7 0a5.3 5.3 0 0 0-.1 4A5.7 5.7 0 0 0 1 8.2c0 5.7 3.4 6.9 6.7 7.3a3.4 3.4 0 0 0-1 2.6V22"
          transform="translate(1.2 1.2) scale(.88)"
        />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="8" width="4" height="13" rx=".5" />
        <path d="M11 21V8h4v2a4.5 4.5 0 0 1 7 3.8V21h-4v-7c0-2-3-2-3 0v7" />
        <circle cx="5" cy="3.5" r="2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    moon: <path d="M20.8 13.1A9 9 0 0 1 10.9 3.2a9 9 0 1 0 9.9 9.9Z" />,
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 5 7 7-7 7" />,
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    document: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8m-8 4h6" />
      </>
    ),
    code: (
      <>
        <path d="m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
