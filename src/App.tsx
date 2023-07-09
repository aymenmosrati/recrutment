import "./App.scss";
import JWTAuthRedux from "./contexts/JWTAuthRedux";
import routes, { RenderRoutes } from "./routes";

function App() {
  return (
    <JWTAuthRedux>
      <RenderRoutes routes={routes} />
    </JWTAuthRedux>
  );
}

export default App;
