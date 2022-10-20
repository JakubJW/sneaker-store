(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{551:function(t,e,r){"use strict";var n=r(1),o=(r(38),r(59),r(234),r(9),r(3),r(8),r(46),r(91),r(10),r(7),r(12),r(13),r(4)),l=r(98),c=r(124);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(l.a,Object(c.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(r.valid=e(input)))})):r.valid=e(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},565:function(t,e,r){"use strict";r.r(e);var n=r(517),o=r(221),l=r(223),c=r(551),d=r(526),f=(r(30),{layout:"empty",data:function(){return{name:"",surname:"",email:"",password:"",error:"",rules:{required:function(t){return!!t||"Pole wymagane."}},valid:!1}},methods:{validate:function(){var t=this;this.$refs.form.validate(),this.$fire.auth.createUserWithEmailAndPassword(this.email,this.password).then((function(data){console.log(data),t.$nuxt.$emit("loggedIn"),t.$router.push("/")})).catch((function(t){console.log(t)}))}}}),h=r(50),component=Object(h.a)(f,(function(){var t=this,e=t._self._c;return e(n.a,[e(l.a,{staticClass:"d-flex justify-center mt-10",attrs:{elevation:"0"}},[e(l.a,{attrs:{width:"300px",elevation:"0"}},[e("div",{staticClass:"text-center mb-10"},[e("div",{staticClass:"text-md-h4 grey-darken-2--text font-weight-light"},[t._v("Zarejestruj się w \n                    "),e("span",{staticClass:"text-uppercase"},[t._v("sneaker")]),t._v(" "),e("span",{staticClass:"text-uppercase font-weight-regular"},[t._v("store")])])]),t._v(" "),e(c.a,{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e(d.a,{attrs:{label:"Imię",type:"text",rules:[t.rules.required]},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),e(d.a,{attrs:{label:"Nazwisko",type:"text",rules:[t.rules.required]},model:{value:t.surname,callback:function(e){t.surname=e},expression:"surname"}}),t._v(" "),e(d.a,{attrs:{color:"success",label:"E-mail",type:"e-mail",rules:[t.rules.required]},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),e(d.a,{attrs:{color:"success",type:"password",label:"Hasło",rules:[t.rules.required]},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),e(o.a,{staticClass:"my-3 white--text warning",on:{click:t.validate}},[t._v("Zarejestruj się")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);