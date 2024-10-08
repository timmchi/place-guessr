// calculating distance between guess marker and answer marker
const haversine_distance = (mk1, mk2) => {
  var R = 6371.071; // Radius of the Earth in km
  // Convert degrees to radians
  var rlat1 = mk1.lat * (Math.PI / 180);
  var rlat2 = mk2.lat * (Math.PI / 180);
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
};

// Score based on distance https://www.reddit.com/r/geoguessr/comments/zqwgnr/comment/j12rjkq/
// score = 5000 * e ^ ( -10 * distance / mapsize )
// 14916.862 KM mapsize, world map
// 2.71828 e
const calculateScore = (distance, mapSize = 14916.862) => {
  const score = 5000 * 2.71828 ** ((-10 * distance) / mapSize);

  return score;
};

module.exports = { haversine_distance, calculateScore };
