import "@/styles/globals.css";
import "@/styles/motion.css";
import "@/styles/scroll-story.css";
import AppLayout from "../corelayout/AppLayout/index";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { Provider } from "react-redux";
import store from "../redux/store";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Poppins } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/utils/schemas";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const ToastContainer = dynamic(
  () =>
    import("react-toastify").then((mod) => {
      require("react-toastify/dist/ReactToastify.css");
      return mod.ToastContainer;
    }),
  { ssr: false }
);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
      </Head>
      <style jsx global>{`
        html, body {
          font-family: ${poppins.style.fontFamily}, sans-serif;
        }
        :root {
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>
      <div className={`${poppins.className} ${poppins.variable}`}>
        <Provider store={store}>
          <SmoothScroll>
            <AppLayout>
              <Component {...pageProps} />
              <ToastContainer
                position="top-center"
                theme="light"
                hideProgressBar={true}
                pauseOnHover
              />
            </AppLayout>
          </SmoothScroll>
        </Provider>
      </div>
    </>
  );
}
