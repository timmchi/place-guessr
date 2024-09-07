// calculating distance between guess marker and answer marker
export const haversine_distance = (mk1, mk2) => {
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
export const calculateScore = (distance) => {
  const score = 5000 * 2.71828 ** ((-10 * distance) / 14916.862);

  return score;
};

export const calculateDistance = (score) => {
  const distance = -1491.6862 * Math.log(score / 5000);

  return distance;
};

// console.log("5000 km score", calculateScore(5000)); 175.08718187455935

// console.log("1000 km score", calculateScore(1000)); 2557.5661421777627

// console.log("500 km score", calculateScore(500)); 3576.007649724594

// console.log("100 km score", calculateScore(100)); 4675.797466421211

// console.log("0 km score", calculateScore(0)); 5000

export const calculateHpDamage = (score1, score2, multiplier = 1) => {
  const scoreDifference = Math.abs(score1 - score2);

  return scoreDifference * multiplier;
};
