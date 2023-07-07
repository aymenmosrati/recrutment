import { RelativeRoutingType, To, useNavigate } from "react-router";

interface NavigateFunction {
  (
    to: To,
    options?: {
      replace?: boolean;
      state?: any;
      relative?: RelativeRoutingType;
    }
  ): void;
  (delta: number): void;
}

export const useAppNavigate = (): NavigateFunction => useNavigate();