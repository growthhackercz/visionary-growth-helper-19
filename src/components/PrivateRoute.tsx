
interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // Remove authentication check and always render children
  return <>{children}</>;
};
