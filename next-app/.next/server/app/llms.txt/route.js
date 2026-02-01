"use strict";(()=>{var e={};e.id=587,e.ids=[587],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8954:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>g,patchFetch:()=>y,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>h});var r={};o.r(r),o.d(r,{GET:()=>p});var s=o(9303),i=o(8716),a=o(3131),n=o(7070),l=o(7814),u=o(9754);async function p(){let e=(0,l.jg)(),t=(0,u.zV)(),o="https://homebuyerboise.com",r=`# Home Buyer Boise - LLM Context File
# Last Updated: ${new Date().toISOString().split("T")[0]}

## About This Business
Home Buyer Boise is a cash home buying company serving the Treasure Valley in Idaho. We purchase residential properties for cash, allowing homeowners to sell quickly without repairs, fees, or traditional listing hassles.

## Contact Information
- Phone: (208) 405-2275
- Email: connect@buymyhouse.co
- Address: 3024 W Fairview Ave, Boise, ID 83702
- Website: ${o}

## Service Areas
We serve homeowners throughout the Treasure Valley including:
${e.map(e=>`- ${e.charAt(0).toUpperCase()+e.slice(1)}, Idaho`).join("\n")}

## Services Offered
${t.map(e=>`- ${e.replace(/-/g," ").replace(/\b\w/g,e=>e.toUpperCase())}`).join("\n")}

## Key Benefits
- Cash offers within 24 hours
- Close in as little as 7 days
- No repairs needed - we buy as-is
- No realtor commissions or fees
- We pay all closing costs
- Flexible closing timeline (7-60+ days)

## How It Works
1. Contact us with your property details
2. Receive a fair, no-obligation cash offer within 24 hours
3. Accept and choose your closing date
4. Close and get paid - we handle all paperwork

## Target Audience
- Homeowners who need to sell fast
- People facing foreclosure
- Inherited property sellers
- Divorce situations
- Landlords with problem tenants
- Homeowners with properties needing major repairs
- People relocating for work

## URL Structure
- Homepage: ${o}/
- About: ${o}/about
- Contact: ${o}/contact
- Get Quote: ${o}/get-quote
- Areas: ${o}/areas/[city]
- Services: ${o}/services/[service]
- Service+City: ${o}/services/[service]/[city]
- Blog: ${o}/blog/[slug]

## Full Context File
For complete information, see: ${o}/llms-full.txt
`;return new n.NextResponse(r,{headers:{"Content-Type":"text/plain; charset=utf-8"}})}let c=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/llms.txt/route",pathname:"/llms.txt",filename:"route",bundlePath:"app/llms.txt/route"},resolvedPagePath:"C:\\Users\\brost\\OneDrive\\Desktop\\Home-Buyer-Boise-v2\\next-app\\app\\llms.txt\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:d,staticGenerationAsyncStorage:h,serverHooks:m}=c,g="/llms.txt/route";function y(){return(0,a.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:h})}}};var t=require("../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[948,972,218],()=>o(8954));module.exports=r})();