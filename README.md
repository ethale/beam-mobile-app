# Beam Mobile App Directions

I utilized react-native-svg for the SVG logo and had to do some formatting on the SVG XML due to this.

## Installation

Run 'npm i' to install all node_modules needed for this project.

Due to an issue with metro, you have to change

/node_modules/metro-config/src/defaults/blacklist.js

the line with var sharedBlacklist at the top of the file should be:

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

## Tests

Run 'npm test' to run the jest tests for the app.
