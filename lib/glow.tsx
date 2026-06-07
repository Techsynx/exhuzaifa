export const IceGlow = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      color: "white",
      textShadow:
        "0 0 6px #fff, 0 0 15px #c8e8ff, 0 0 30px #6bb8ff",
    }}
  >
    {children}
  </span>
);
