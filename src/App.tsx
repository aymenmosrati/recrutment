import "./App.scss";
import routes, { RenderRoutes } from "./routes";

function App() {
  return (
    <>
      <RenderRoutes routes={routes} />
    </>
  );
}

export default App;
