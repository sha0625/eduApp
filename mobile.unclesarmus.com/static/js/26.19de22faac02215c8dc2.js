webpackJsonp([26],{D7Ct:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("vP6+"),s=(o.a,{components:{FormPreview:o.a},data:function(){return{list:"",info:[]}},created:function(){this.getList()},methods:{getList:function(){console.log("用户信息："),console.log(this.$store),this.$http.get("http://139.199.168.158:8080/admin/supervisormystudents?supervisorname="+this.$store.getters.username).then(function(e){console.log("获取学员姓名及课时情况"),console.log(e),e=e.data,1===e.code&&console.log("获取我的学生成功")}),this.listLoading=!1}}}),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._l(e.list,function(t,o){return n("form-preview",{key:o,attrs:{"header-label":t.STUDENT_NAME,"header-value":t.SUBJECT_B,"body-items":e.info[o]}})}),e._v(" "),n("br")],2)},i=[],l={render:r,staticRenderFns:i},a=l,u=n("C7Lr"),c=u(s,a,!1,null,null,null);t.default=c.exports}});
//# sourceMappingURL=26.19de22faac02215c8dc2.js.map