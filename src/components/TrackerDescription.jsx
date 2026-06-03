const TrackerDescription = ({
  brand,
  country,
  vertical,
  trafficSource,
  trackerDescription,
}) => {
  const description = `${brand}_${country}_${vertical}_${trafficSource}${
    trackerDescription.trim() ? `_${trackerDescription}` : ""
  }`;

  return (
    <span className="flex-1 text-left text-sm font-mono font-semibold text-white/90 truncate">
      {description}
    </span>
  );
};

export default TrackerDescription;
