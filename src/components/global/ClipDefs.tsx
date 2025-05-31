const ClipDefs = () => {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        {/* you can add multiple here like clipPath */}
        <clipPath id="destinationCardClip" clipPathUnits="objectBoundingBox">
          {/* Responsive, scalable path (0.0–1.0) */}
          <path
            d="
            M 0.03 0.22
            L 0.22 0.22
            Q 0.235 0.22, 0.25 0.17
            Q 0.255 0.11, 0.25 0.06
            Q 0.26 0.02, 0.28 0
            Q 0.39 0.03, 0.5 0.06
            L 1 0
            L 1 1
            L 0 1
            L 0 0.22
            Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ClipDefs;
