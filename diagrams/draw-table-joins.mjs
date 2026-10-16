import rough from 'roughjs';
import fs from 'fs';
const gen = rough.generator();
const W=1600,H=1060;
const font = fs.readFileSync('/tmp/rough/ph.woff').toString('base64');
let out=[];
const ink='#1f2a44', blue='#2b6cb0', red='#c0392b', green='#2f855a', gray='#6b7280';
function draw(d, extra=''){ for (const p of gen.toPaths(d)) out.push(`<path d="${p.d}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill||'none'}" ${extra}/>`); }
function text(x,y,s,size=22,color=ink,anchor='start',weight=''){ s=s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); out.push(`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}" ${weight}>${s}</text>`); }
let seed=1;
function box(x,y,w,title,sub,rows,opts={}){
  const lh=27, h=78+rows.length*lh+14;
  draw(gen.rectangle(x,y,w,h,{roughness:1.6,bowing:1.4,stroke:opts.stroke||ink,strokeWidth:2.4,fill:opts.fill||'#fffdf5',fillStyle:'hachure',hachureGap:9,fillWeight:0.6,seed:seed++, strokeLineDash: opts.dash}));
  draw(gen.line(x+10,y+62,x+w-10,y+64,{roughness:1.4,stroke:opts.stroke||ink,strokeWidth:1.6,seed:seed++}));
  text(x+16,y+32,title,29,opts.stroke||ink);
  text(x+16,y+54,sub,17,gray);
  rows.forEach((r,i)=>{ const key=r.startsWith('*'); text(x+20,y+92+i*lh,r.replace(/^\*/,''),20,key?red:ink); });
  return {x,y,w,h};
}
function arrow(x1,y1,x2,y2,label,lx,ly,color=blue,dash){
  draw(gen.curve([[x1,y1],[(x1+x2)/2+ (y2-y1)*0.06,(y1+y2)/2-(x2-x1)*0.06],[x2,y2]],{roughness:1.2,stroke:color,strokeWidth:2.6,seed:seed++,strokeLineDash:dash}));
  const a=Math.atan2(y2-y1,x2-x1), L=18;
  draw(gen.linearPath([[x2-L*Math.cos(a-0.45),y2-L*Math.sin(a-0.45)],[x2,y2],[x2-L*Math.cos(a+0.45),y2-L*Math.sin(a+0.45)]],{roughness:0.8,stroke:color,strokeWidth:2.6,seed:seed++}));
  if(label){ (Array.isArray(label)?label:[label]).forEach((l,i)=>text(lx,ly+i*22,l,19,color,'middle')); }
}
// background
out.push(`<rect width="${W}" height="${H}" fill="#fbf8ef"/>`);
text(W/2,52,'Meta creative dashboard: how the tables join',40,ink,'middle');
text(W/2,84,'Keys in red. Meta names checked against developers.facebook.com (Graph API v26.0) on Oct 15, 2026.',19,gray,'middle');

const ins = box(30,120,340,'ad_insights_daily','Insights API · level=ad · time_increment=1',
 ['*ad_id','date_start','impressions, spend','actions [video_view = 3-sec]','video_play_actions','video_avg_time_watched_actions','inline_link_clicks','attribution_setting']);
const ads = box(450,120,290,'ads','the creative ID map (ad object)',
 ['*id  (= ad_id)','*creative { id }','adset_id','campaign_id','name']);
const cr = box(830,120,330,'ad_creatives','ad creative object',
 ['*id','*effective_object_story_id','url_tags','video_id','thumbnail_url']);
const pp = box(1250,120,320,'page_posts','Page post + comments edge',
 ['*id (post ID)','message','created_time','permalink_url','comments (summary=1)']);
function badge(x,y,n,color=blue){ draw(gen.circle(x,y,34,{roughness:1.2,stroke:color,strokeWidth:2.2,fill:'#fbf8ef',fillStyle:'solid',seed:seed++})); text(x,y+8,String(n),24,color,'middle'); }
arrow(370,215,450,215); badge(410,180,1);
arrow(740,235,830,235); badge(785,200,2);
arrow(1160,235,1250,235); badge(1205,200,3);

const ga = box(260,620,380,'ga4_sessions','your GA4 export (your column names)',
 ['*utm_content  (= ad_id)','session_id','engaged_session','add_to_cart, purchase'],{stroke:green,fill:'#f3fbf5'});
const od = box(760,620,380,'orders','e.g. Shopify (your column names)',
 ['*utm_content  (= ad_id)','order_id, order_date','revenue','new_vs_returning'],{stroke:green,fill:'#f3fbf5'});

arrow(1030,345,950,616,null,0,0,red);
arrow(980,345,470,616,null,0,0,red);
text(1190,470,'url_tags on the creative:',20,red);
text(1190,494,'utm_content={{ad.id}}',20,red);
text(1190,518,'rides along on every click',20,red);
badge(1040,440,4,red);
arrow(380,616,150,432,null,0,0,green); badge(230,520,5,green);
arrow(860,616,300,432,null,0,0,green);

const L=[[blue,'1  ad_insights_daily.ad_id = ads.id'],[blue,'2  ads.creative.id = ad_creatives.id'],[blue,'3  ad_creatives.effective_object_story_id = page_posts.id'],
 [red,'4  url_tags puts the ad ID in utm_content on every click'],[green,'5  ga4_sessions / orders .utm_content = ad_id  (aggregate each side before joining)']];
L.forEach(([c,t],i)=>text(60+Math.floor(i/3)*740,880+(i%3)*32,t,21,c));

text(40,1010,'Grain: one row per ad per day. Several ads can share one post, so roll up by post ID too. A spec sketch, not a full schema.',19,gray);
text(40,1038,'Brinker Analytics · brinker-analytics/meta-creative-dashboard-spec · CC BY 4.0',17,gray);
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
<title id="t">Meta creative dashboard: how the tables join</title>
<desc id="d">Hand-drawn diagram. ad_insights_daily joins to ads on ad_id = id; ads joins to ad_creatives on creative.id = id; ad_creatives joins to page_posts on effective_object_story_id = post id. The creative url_tags put utm_content={{ad.id}} on every click, so GA4 sessions and orders join back to ad_insights_daily on ad_id. </desc>
<defs><style>@font-face{font-family:'PH';src:url(data:font/woff;base64,${font}) format('woff');} text{font-family:'PH','Patrick Hand','Comic Neue',cursive;}</style></defs>
${out.join('\n')}
</svg>`;
fs.writeFileSync(process.argv[2],svg);
