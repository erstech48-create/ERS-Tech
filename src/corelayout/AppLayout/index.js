import { useRouter } from "next/router";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";

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
