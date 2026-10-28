import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../../components/Footer/index"));
const Header = dynamic(() => import("../../components/Header/index"));

const AppLayout = ({ children }) => {
  const router = useRouter();

  const isUnRestrictedRoute = (pathname) => {
    return (
      pathname === "/sitemap.xml" ||
      pathname === "/sitmap.xml" ||
      pathname === "/rss.xml"
    );
  };
  return isUnRestrictedRoute(router.pathname) ? (
    children
  ) : (
    <>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
