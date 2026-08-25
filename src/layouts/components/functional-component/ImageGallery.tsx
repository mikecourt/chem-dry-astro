export type CropSide = "left" | "right";

export type PairFrame = {
  src: string;
  crop?: CropSide;
  alt: string;
};

export type BeforeAfterPair = {
  before: PairFrame;
  after: PairFrame;
  service: string;
  city: string;
  featured?: boolean;
  /**
   * Optional intact combined frame for the featured job. Desktop shows this
   * full-width photo; mobile still stacks the cropped before / after pair.
   */
  combinedSrc?: string;
  combinedLeftLabel?: "Before" | "After";
  combinedRightLabel?: "Before" | "After";
};

const chipClass =
  "absolute z-10 bg-primary text-white text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded pointer-events-none";

function CroppedFrame({
  frame,
  label,
}: {
  frame: PairFrame;
  label: "Before" | "After";
}) {
  const isRight = frame.crop === "right";

  return (
    <div className="relative overflow-hidden bg-light">
      <span className={`${chipClass} top-3 left-3`}>{label}</span>
      <div className="aspect-[4/3] overflow-hidden">
        {frame.crop ? (
          <img
            src={frame.src}
            alt={frame.alt}
            width={800}
            height={600}
            className={`h-full w-[200%] max-w-none object-cover ${
              isRight ? "-translate-x-1/2" : ""
            }`}
            loading="lazy"
          />
        ) : (
          <img
            src={frame.src}
            alt={frame.alt}
            width={800}
            height={600}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

function PairCaption({ service, city }: { service: string; city: string }) {
  return (
    <figcaption className="mt-3 text-center text-sm md:text-base text-text">
      {service} · {city}
    </figcaption>
  );
}

function SplitPair({ pair }: { pair: BeforeAfterPair }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
          <CroppedFrame frame={pair.before} label="Before" />
          <CroppedFrame frame={pair.after} label="After" />
        </div>
      </div>
      <PairCaption service={pair.service} city={pair.city} />
    </figure>
  );
}

function FeaturedCombined({ pair }: { pair: BeforeAfterPair }) {
  const leftLabel = pair.combinedLeftLabel ?? "After";
  const rightLabel = pair.combinedRightLabel ?? "Before";

  return (
    <figure className="m-0">
      {/* Desktop / tablet: intact half-and-half job photo */}
      <div className="relative hidden md:block overflow-hidden rounded-2xl shadow-lg">
        <span className={`${chipClass} top-4 left-4`}>{leftLabel}</span>
        <span className={`${chipClass} top-4 right-4`}>{rightLabel}</span>
        <img
          src={pair.combinedSrc}
          alt={`${pair.service} before and after in ${pair.city}`}
          width={1600}
          height={900}
          className="w-full h-auto"
          loading="eager"
        />
      </div>

      {/* Mobile: before stacked over after */}
      <div className="md:hidden overflow-hidden rounded-xl shadow-sm">
        <div className="grid grid-cols-1 gap-1.5">
          <CroppedFrame frame={pair.before} label="Before" />
          <CroppedFrame frame={pair.after} label="After" />
        </div>
      </div>

      <PairCaption service={pair.service} city={pair.city} />
    </figure>
  );
}

const ImageGallery = ({ pairs }: { pairs: BeforeAfterPair[] }) => {
  const featured = pairs.find((pair) => pair.featured) ?? pairs[0];
  const quiet = pairs.filter((pair) => pair !== featured);

  if (!featured) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {featured.combinedSrc ? (
        <FeaturedCombined pair={featured} />
      ) : (
        <SplitPair pair={featured} />
      )}

      {quiet.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-6 md:gap-y-10">
          {quiet.map((pair) => (
            <SplitPair
              key={`${pair.service}-${pair.city}-${pair.before.src}`}
              pair={pair}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
