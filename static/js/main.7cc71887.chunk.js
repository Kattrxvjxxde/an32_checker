(this.webpackJsonpan32_checker=this.webpackJsonpan32_checker||[]).push([[0],{46:function(e,t,n){},53:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(9),i=n.n(r),s=(n(46),n(83)),o=n(84),l=n(85),u=n(86),j=n(88),b=n(12),h=n(82),x=n(87),d=n(5),m=function(e){var t=e.label,n=e.name,a=e.value,c=e.handleChange;return Object(d.jsx)(x.a,{label:t,name:n,type:"number",value:a,onChange:c})},g=320,O=Object(h.a)((function(){return{containerBox:{marginTop:40,display:"flex",justifyContent:"space-evenly"},figureContainer:{width:200,height:360,position:"relative"},noteFigure:{top:0,right:0,bottom:0,left:0,margin:"auto",width:"80%",borderTop:"1rem solid #696969",borderBottom:"1rem solid #696969",position:"absolute"},criticalFigure:{top:0,right:0,bottom:0,left:0,margin:"auto",width:"80%",background:"#ffd800",opacity:.7,position:"absolute",textAlign:"center"},criticalStr:{top:0,right:0,bottom:0,left:0,margin:"auto",position:"absolute",color:"#f90",fontSize:"1.2rem",fontFamily:"Impact"},resultContainer:{textAlign:"center"}}})),f=function(e){var t=O(),n=e.interval,a=e.criticalSec,c=n>a?g:g*n/a,r=a>n?g:g*a/n,i=0===n?"ERROR":"".concat(n," ms"),s="ERROR";return 0!==n&&(s=a>0?"".concat(a," ms"):"\u306a\u3057"),Object(d.jsxs)(j.a,{className:t.containerBox,children:[Object(d.jsxs)(j.a,{className:t.figureContainer,children:[a>0&&Object(d.jsx)(j.a,{className:t.criticalFigure,sx:{height:r}}),Object(d.jsx)(j.a,{className:t.noteFigure,sx:{height:c}})]}),Object(d.jsx)(j.a,{children:Object(d.jsxs)(j.a,{sx:{textAlign:"center"},children:[Object(d.jsxs)("div",{children:["\u3010\u30ce\u30fc\u30c4\u9593\u3011",Object(d.jsx)("br",{}),i]}),Object(d.jsx)("br",{}),Object(d.jsxs)("div",{children:["\u3010CRITICAL\u7bc4\u56f2\u3011",Object(d.jsx)("br",{}),s]})]})})]})},p=Object(h.a)((function(){return{flexBox:{display:"flex",justifyContent:"space-evenly"}}})),v=function(){var e=p(),t=c.a.useState(230),n=Object(b.a)(t,2),a=n[0],r=n[1],i=c.a.useState(24),s=Object(b.a)(i,2),o=s[0],l=s[1],u=/^\d*$/,h=function(e){if(u.test(e.target.value)){var t=Number(e.target.value.replace(/^0+/,""));switch(e.target.name){case"bpm":return r(t);case"noteType":return l(t);default:return}}},x=c.a.useMemo((function(){return a*o===0?0:Math.round(24e7/(a*o))/1e3}),[a,o]),g=c.a.useMemo((function(){return Math.round(1e6/12-24e7/(a*o))/1e3}),[a,o]);return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)(j.a,{className:e.flexBox,children:[Object(d.jsx)(m,{label:"BPM",name:"bpm",value:a,handleChange:h}),Object(d.jsx)(m,{label:"NOTE TYPE",name:"noteType",value:o,handleChange:h})]}),Object(d.jsx)(f,{interval:x,criticalSec:g})]})},C=function(){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(s.a,{position:"static",children:Object(d.jsx)(o.a,{children:Object(d.jsx)(l.a,{children:"\u3042\u3093\u307f\u3064\u30c1\u30a7\u30c3\u30ab\u30fc"})})}),Object(d.jsx)(u.a,{maxWidth:"sm",children:Object(d.jsx)(j.a,{sx:{m:"30px 0"},children:Object(d.jsx)(v,{})})})]})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,91)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};i.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(C,{})}),document.getElementById("root")),y()}},[[53,1,2]]]);
//# sourceMappingURL=main.7cc71887.chunk.js.map