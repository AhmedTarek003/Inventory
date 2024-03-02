import Spinner from "react-bootstrap/Spinner";

const LoadingLoader = () => {
  return (
    <div
      className="loader"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "var(--overlay-color)",
        width: "100%",
        height: "100%",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" style={{ width: "150px", height: "150px" }} />
    </div>
  );
};

export default LoadingLoader;
