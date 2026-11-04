import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
  var p=location.pathname; if(p!=="/"&&p!=="/home")return;
  document.documentElement.classList.add("hs-loading");
  var m=window.matchMedia;
  if(!m("(min-width:1024px)").matches||m("(prefers-reduced-motion: reduce)").matches)return;
  var d=document.documentElement,W=innerWidth,H=innerHeight,nav=82;
  var s=Math.min(W/1920,(H-nav)/984);
  var sw=Math.min(Math.max(W/s,1920),2500);
  d.classList.add("hs-anim");
  var st=d.style;
  st.setProperty("--hs-scale",String(s));
  st.setProperty("--hs-ox",((W-sw*s)/2)+"px");
  st.setProperty("--hs-oy",(nav+(H-nav-984*s)/2)+"px");
  st.setProperty("--hs-sw",sw+"px");
  st.setProperty("--hs-dx",(sw-1920)+"px");
}catch(e){}})();`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
