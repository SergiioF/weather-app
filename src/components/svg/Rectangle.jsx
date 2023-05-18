import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const Rectangle = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={338}
    height={176}
    preserveAspectRatio="none"
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M0 66.859c0-34.967 0-52.45 11.39-61.46C22.778-3.608 39.791.42 73.82 8.473l230.314 54.512c16.251 3.847 24.376 5.77 29.121 11.769C338 80.752 338 89.102 338 105.801V132c0 20.742 0 31.113-6.444 37.556C325.113 176 314.742 176 294 176H44c-20.742 0-31.113 0-37.556-6.444C0 163.113 0 152.742 0 132V66.859Z"
    />
    <Defs>
      <LinearGradient id="a" x1={338} x2={0} y1={106} y2={99.5} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#1C9CF6" />
        <Stop offset={1} stopColor="#19C3FB" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Rectangle;
