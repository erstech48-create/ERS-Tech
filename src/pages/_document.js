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
  if(m("(prefers-reduced-motion: reduce)").matches)return;
  var d=document.documentElement,W=innerWidth,H=innerHeight,mob=W<768;
  var nav=mob?72:82;
  if (!W || !H || H - nav < 120) return;
  var SW=mob?430:1920,SH=mob?860:984,MX=mob?560:2500;
  var s=Math.min(W/SW,(H-nav)/SH);
  var sw=Math.min(Math.max(W/s,SW),MX);
  d.classList.add("hs-anim");
  if(mob)d.classList.add("hs-m");
  var st=d.style;
  st.setProperty("--hs-scale",String(s));
  st.setProperty("--hs-ox",((W-sw*s)/2)+"px");
  st.setProperty("--hs-oy",(nav+(H-nav-SH*s)/2)+"px");
  st.setProperty("--hs-sw",sw+"px");
  st.setProperty("--hs-dx",(sw-SW)+"px");
  st.setProperty("--hs-vh",H+"px");
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
