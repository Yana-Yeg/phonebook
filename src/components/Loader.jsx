import { ThreeCircles } from "react-loader-spinner";
import "../index.css";

function Loader() {
  return (
    <div className="loader">
      <ThreeCircles color="blue" height={350} width={350} />
    </div>
  );
}

export default Loader;