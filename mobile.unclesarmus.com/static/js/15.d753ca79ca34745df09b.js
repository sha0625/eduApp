webpackJsonp([15],{"5bSk":function(e,n,r){n=e.exports=r("UTlt")(!0),n.push([e.i,"\n.weui-form-preview__hd .weui-form-preview__label {\n  color: #000000;\n  font-size: 20px;\n  font-family: Arial, Helvetica, sans-serif;\n  letter-spacing: 1px;\n  font-weight: 500;\n}\n.weui-form-preview__hd .weui-form-preview__value {\n  color: #000000;\n  font-size: 10px;\n  font-family: Arial, Helvetica, sans-serif;\n  letter-spacing: 1px;\n}\n.weui-form-preview__item .weui-form-preview__label {\n  color: #818181;\n  font-size: 10px;\n  font-family: Arial, Helvetica, sans-serif;\n  letter-spacing: 3px;\n}\n.weui-form-preview__item .weui-form-preview__value {\n  color: #818181;\n  font-size: 10px;\n  font-family: Arial, Helvetica, sans-serif;\n  letter-spacing: 3px;\n}\n.vux-form-preview.weui-form-preview {\n  background: #f5f5f5;\n  margin: 0px 10px 15px 10px;\n  box-shadow: 2px 2px 3px 2px rgba(170, 169, 169, 0.3);\n}\n.vux-form-preview.weui-form-preview .weui-form-preview__hd {\n  background: #f8f7f7;\n}\n.vux-form-preview.weui-form-preview .weui-form-preview__bd {\n  background: #faf9f9;\n}\n.vux-header .vux-header-left .vux-header-back {\n  font-size: 12px;\n  color: #ffffff;\n}\n","",{version:3,sources:["D:/Users/RLZ/Documents/My Project/vue-admin-mobile/src/views/student/homework.vue"],names:[],mappings:";AACA;EACE,eAAe;EACf,gBAAgB;EAChB,0CAA0C;EAC1C,oBAAoB;EACpB,iBAAiB;CAClB;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,0CAA0C;EAC1C,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,0CAA0C;EAC1C,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,0CAA0C;EAC1C,oBAAoB;CACrB;AACD;EACE,oBAAoB;EACpB,2BAA2B;EAC3B,qDAAqD;CACtD;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,gBAAgB;EAChB,eAAe;CAChB",file:"homework.vue",sourcesContent:["\n.weui-form-preview__hd .weui-form-preview__label {\n  color: #000000;\n  font-size: 20px;\n  font-family: Arial, Helvetica, sans-serif;\n  letter-spacing: 1px;\n  font-weight: 500;\n}\n.weui-form-preview__hd .weui-form-preview__value {\n  color: #000000;\n  font-size: 10px;\n  font-family: Arial, Helvetica, sans-serif;\n  letter-spacing: 1px;\n}\n.weui-form-preview__item .weui-form-preview__label {\n  color: #818181;\n  font-size: 10px;\n  font-family: Arial, Helvetica, sans-serif;\n  letter-spacing: 3px;\n}\n.weui-form-preview__item .weui-form-preview__value {\n  color: #818181;\n  font-size: 10px;\n  font-family: Arial, Helvetica, sans-serif;\n  letter-spacing: 3px;\n}\n.vux-form-preview.weui-form-preview {\n  background: #f5f5f5;\n  margin: 0px 10px 15px 10px;\n  box-shadow: 2px 2px 3px 2px rgba(170, 169, 169, 0.3);\n}\n.vux-form-preview.weui-form-preview .weui-form-preview__hd {\n  background: #f8f7f7;\n}\n.vux-form-preview.weui-form-preview .weui-form-preview__bd {\n  background: #faf9f9;\n}\n.vux-header .vux-header-left .vux-header-back {\n  font-size: 12px;\n  color: #ffffff;\n}\n"],sourceRoot:""}])},DrCf:function(e,n,r){var i=r("5bSk");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);r("FIqI")("2df36786",i,!0,{})},Nr90:function(e,n,r){"use strict";function i(e){r("DrCf")}Object.defineProperty(n,"__esModule",{value:!0});var o=r("vP6+"),t=r("ryJa"),f=r.n(t),a=(o.a,{components:{FormPreview:o.a},data:function(){var e=this;return{list:[],info:[],buttons:[{style:"default",text:"详情",onButtonClick:function(n){console.log(n),e.$router.push({path:"/homework-check",query:n})}}]}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.$http.get("http://139.199.168.158:8080/admin/student_homework?id="+this.$store.getters.userid).then(function(n){if(n=n.data,1===n.code){console.log("获取作业成功");for(var r=0;r<n.data.length;r++){var i={date:f()(n.data[r].SUBMISSION_DATE).format("YYYY-MM-DD"),label:n.data[r].SUPERVISOR_NAME,param:{value:n.data[r].id}};e.info.push([{label:"ID：",value:n.data[r].HOMEWORK_ID},{label:"课程：",value:n.data[r].SUBJECT_NAME}]),e.list.push(i)}}else console.log("获取作业失败")})}}}),A=function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",[e._l(e.list,function(n,i){return r("form-preview",{key:i,attrs:{"header-label":n.label,"header-value":n.date,"footer-buttons":e.buttons,"body-items":e.info[i],name:n.param}})}),e._v(" "),r("br")],2)},l=[],s={render:A,staticRenderFns:l},p=s,u=r("C7Lr"),v=i,w=u(a,p,!1,v,null,null);n.default=w.exports}});
//# sourceMappingURL=15.d753ca79ca34745df09b.js.map