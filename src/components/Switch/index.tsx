// import { useAppSelector } from "../../hooks/hooksRedux";
import "./_index.scss";

type SwitchProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const Index = (props: SwitchProps) => {
  // const { ...rest } = props;
  // const { switchT } = useAppSelector((state) => state.switchToggel);
  // return (
  //   <div className={`switch ${switchT === true ? "right" : "left"}`} {...rest}>
  //     <div className="insid-Switch"> </div>
  //   </div>
  // );
};

export default Index;