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

  return <span className="flex-1 text-center truncate">{description}</span>;
};

export default TrackerDescription;
