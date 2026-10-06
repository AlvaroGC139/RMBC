const C="captura-terciarias-v2";
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(C).then(c=>c.add("./")).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||(u.origin!==location.origin&&u.hostname!=="cdnjs.cloudflare.com"))return;
  e.respondWith(
    fetch(e.request).then(r=>{
      const cp=r.clone();
      caches.open(C).then(c=>c.put(e.request,cp));
      return r;
    }).catch(()=>caches.match(e.request).then(m=>m||caches.match("./")))
  );
});
