webpackJsonp([22],{MYfs:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("vP6+"),l=a("ryJa"),n=a.n(l),s=(o.a,{components:{FormPreview:o.a},data:function(){return{list:[],info:[]}},created:function(){this.getList()},methods:{getList:function(){var t=this;console.log(this.$store.getters),this.$http.get("http://139.199.168.158:8080/admin/teacher_allevents?id="+this.$store.getters.userid).then(function(e){if(e=e.data,console.log(e),1===e.code){console.log("获取排课记录成功");for(var a=0;a<e.data.length;a++)if(n()(e.data[a].COURSE_TIME).format("YYYY-MM-DD")==n()().format("YYYY-MM-DD")){var o={date:n()(e.data[a].COURSE_TIME).format("YYYY-MM-DD"),studentname:e.data[a].STUDENT_NAME};t.info.push([{label:"时间：",value:n()(e.data[a].COURSE_TIME).format("HH:mm:ss")},{label:"课程：",value:e.data[a].SUBJECT_NAME},{label:"教室：",value:e.data[a].ROOM_ID}]),t.list.push(o)}}else console.log("排课记录失败")}),this.$http.get("http://139.199.168.158:8080/admin/teacher_homework?id="+this.$store.getters.userid).then(function(e){if(e=e.data,console.log(e),1===e.code){console.log("获取作业成功"),console.log(e);for(var a=0;a<e.data.length;a++)if(n()(e.data[a].SUBMISSION_DATE).format("YYYY-MM-DD")==n()().format("YYYY-MM-DD")){var o={date:n()(e.data[a].SUBMISSION_DATE).format("YYYY-MM-DD"),studentname:e.data[a].STUDENT_NAME};t.info.push([{label:"ID：",value:e.data[a].HOMEWORK_ID},{label:"课程：",value:e.data[a].SUBJECT_NAME}]),t.list.push(o)}}else console.log("获取作业失败")})}}}),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._l(t.list,function(e,o){return a("form-preview",{key:o,attrs:{"header-label":e.studentname,"header-value":e.date,"body-items":t.info[o]}})}),t._v(" "),a("br")],2)},i=[],d={render:r,staticRenderFns:i},u=d,f=a("C7Lr"),c=f(s,u,!1,null,null,null);e.default=c.exports}});
//# sourceMappingURL=22.625b6a0157effb0687e3.js.map