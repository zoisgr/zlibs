let t,e=0;function s(e){t=e}function n(){t=null,e=0}const i=Symbol("haunted.phase"),r=Symbol("haunted.hook"),o=Symbol("haunted.update"),a=Symbol("haunted.commit"),l=Symbol("haunted.effects"),h=Symbol("haunted.layoutEffects");class u{constructor(t,e){this.update=t,this.host=e,this[r]=new Map,this[l]=[],this[h]=[]}run(t){s(this);let e=t();return n(),e}_runEffects(t){let e=this[t];s(this);for(let t of e)t.call(this);n()}runEffects(){this._runEffects(l)}runLayoutEffects(){this._runEffects(h)}teardown(){this[r].forEach(t=>{"function"==typeof t.teardown&&t.teardown()})}}const c=Promise.resolve().then.bind(Promise.resolve());function d(){let t,e=[];function s(){t=null;let s=e;e=[];for(var n=0,i=s.length;n<i;n++)s[n]()}return function(n){e.push(n),null==t&&(t=c(s))}}const p=d(),m=d();class f{constructor(t,e){this.renderer=t,this.host=e,this.state=new u(this.update.bind(this),e),this[i]=null,this._updateQueued=!1}update(){this._updateQueued||(p(()=>{let t=this.handlePhase(o);m(()=>{this.handlePhase(a,t),m(()=>{this.handlePhase(l)})}),this._updateQueued=!1}),this._updateQueued=!0)}handlePhase(t,e){switch(this[i]=t,t){case a:return this.commit(e),void this.runEffects(h);case o:return this.render();case l:return this.runEffects(l)}this[i]=null}render(){return this.state.run(()=>this.renderer.call(this.host,this.host))}runEffects(t){this.state._runEffects(t)}teardown(){this.state.teardown()}}function _(t){class e extends f{constructor(t,e,s){super(t,s||e),this.frag=e}commit(e){t(e,this.frag)}}return function(t,s,n){const i=(n||s||{}).baseElement||HTMLElement,{observedAttributes:r=[],useShadowDOM:o=!0,shadowRootInit:a={}}=n||s||{};class l extends i{constructor(){super(),!1===o?this._scheduler=new e(t,this):(this.attachShadow({mode:"open",...a}),this._scheduler=new e(t,this.shadowRoot,this))}static get observedAttributes(){return t.observedAttributes||r||[]}connectedCallback(){this._scheduler.update()}disconnectedCallback(){this._scheduler.teardown()}attributeChangedCallback(t,e,s){if(e===s)return;let n=""===s||s;Reflect.set(this,((t="")=>t.replace(/-+([a-z])?/g,(t,e)=>e?e.toUpperCase():""))(t),n)}}const h=new Proxy(i.prototype,{getPrototypeOf:t=>t,set(t,e,s,n){let i;if(e in t){if(i=Object.getOwnPropertyDescriptor(t,e),i&&i.set)return i.set.call(n,s),!0;Reflect.set(t,e,s)}return i="symbol"==typeof e||"_"===e[0]?{enumerable:!0,configurable:!0,writable:!0,value:s}:function(t){let e=t;return Object.freeze({enumerable:!0,configurable:!0,get:()=>e,set(t){e=t,this._scheduler.update()}})}(s),Object.defineProperty(n,e,i),i.set&&i.set.call(n,s),!0}});return Object.setPrototypeOf(l.prototype,h),l}}class g{constructor(t,e){this.id=t,this.state=e}}function v(s,...n){let i=e++,o=t[r],a=o.get(i);return a||(a=new s(i,t,...n),o.set(i,a)),a.update(...n)}function b(t){return v.bind(null,t)}function x(t){return b(class extends g{constructor(e,s,n,i){super(e,s),t(s,this)}update(t,e){this.callback=t,this.lastValues=this.values,this.values=e}call(){this.values&&!this.hasChanged()||this.run()}run(){this.teardown(),this._teardown=this.callback.call(this.state)}teardown(){"function"==typeof this._teardown&&this._teardown()}hasChanged(){return!this.lastValues||this.values.some((t,e)=>this.lastValues[e]!==t)}})}function w(t,e){t[l].push(e)}const y=x(w),E=b(class extends g{constructor(t,e,s){super(t,e),this._updater=this._updater.bind(this),this._ranEffect=!1,this._unsubscribe=null,w(e,this)}update(t){if(this.state.virtual)throw new Error("can't be used with virtual components");return this.Context!==t&&(this._subscribe(t),this.Context=t),this.value}call(){this._ranEffect||(this._ranEffect=!0,this._unsubscribe&&this._unsubscribe(),this._subscribe(this.Context),this.state.update())}_updater(t){this.value=t,this.state.update()}_subscribe(t){const e={Context:t,callback:this._updater};this.state.host.dispatchEvent(new CustomEvent("haunted.context",{detail:e,bubbles:!0,cancelable:!0,composed:!0}));const{unsubscribe:s,value:n}=e;this.value=s?n:t.defaultValue,this._unsubscribe=s}teardown(){this._unsubscribe&&this._unsubscribe()}});const N=b(class extends g{constructor(t,e,s,n){super(t,e),this.value=s(),this.values=n}update(t,e){return this.hasChanged(e)&&(this.values=e,this.value=t()),this.value}hasChanged(t=[]){return t.some((t,e)=>this.values[e]!==t)}}),V=(t,e)=>N(()=>t,e);const C=x((function(t,e){t[h].push(e)})),S=b(class extends g{constructor(t,e,s){super(t,e),this.updater=this.updater.bind(this),"function"==typeof s&&(s=s()),this.makeArgs(s)}update(){return this.args}updater(t){if("function"==typeof t){const e=t,[s]=this.args;t=e(s)}this.makeArgs(t),this.state.update()}makeArgs(t){this.args=Object.freeze([t,this.updater])}}),T=b(class extends g{constructor(t,e,s,n,i){super(t,e),this.dispatch=this.dispatch.bind(this),this.currentState=void 0!==i?i(n):n}update(t){return this.reducer=t,[this.currentState,this.dispatch]}dispatch(t){this.currentState=this.reducer(this.currentState,t),this.state.update()}}),A=t=>N(()=>({current:t}),[]);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const k=new WeakMap,P=t=>(...e)=>{const s=t(...e);return k.set(s,!0),s},L=t=>"function"==typeof t&&k.has(t),M=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,$=(t,e,s=null,n=null)=>{for(;e!==s;){const s=e.nextSibling;t.insertBefore(e,n),e=s}},O=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},H={},j={},I=`{{lit-${String(Math.random()).slice(2)}}}`,R=`\x3c!--${I}--\x3e`,B=new RegExp(`${I}|${R}`);class F{constructor(t,e){this.parts=[],this.element=e;const s=[],n=[],i=document.createTreeWalker(e.content,133,null,!1);let r=0,o=-1,a=0;const{strings:l,values:{length:h}}=t;for(;a<h;){const t=i.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let n=0;for(let t=0;t<s;t++)W(e[t].name,"$lit$")&&n++;for(;n-- >0;){const e=l[a],s=D.exec(e)[2],n=s.toLowerCase()+"$lit$",i=t.getAttribute(n);t.removeAttribute(n);const r=i.split(B);this.parts.push({type:"attribute",index:o,name:s,strings:r}),a+=r.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),i.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(I)>=0){const n=t.parentNode,i=e.split(B),r=i.length-1;for(let e=0;e<r;e++){let s,r=i[e];if(""===r)s=z();else{const t=D.exec(r);null!==t&&W(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),s=document.createTextNode(r)}n.insertBefore(s,t),this.parts.push({type:"node",index:++o})}""===i[r]?(n.insertBefore(z(),t),s.push(t)):t.data=i[r],a+=r}}else if(8===t.nodeType)if(t.data===I){const e=t.parentNode;null!==t.previousSibling&&o!==r||(o++,e.insertBefore(z(),t)),r=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(s.push(t),o--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(I,e+1));)this.parts.push({type:"node",index:-1}),a++}}else i.currentNode=n.pop()}for(const t of s)t.parentNode.removeChild(t)}}const W=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},Q=t=>-1!==t.index,z=()=>document.createComment(""),D=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class U{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=M?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],s=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let i,r=0,o=0,a=n.nextNode();for(;r<s.length;)if(i=s[r],Q(i)){for(;o<i.index;)o++,"TEMPLATE"===a.nodeName&&(e.push(a),n.currentNode=a.content),null===(a=n.nextNode())&&(n.currentNode=e.pop(),a=n.nextNode());if("node"===i.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(a.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,i.name,i.strings,this.options));r++}else this.__parts.push(void 0),r++;return M&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const q=` ${I} `;class G{constructor(t,e,s,n){this.strings=t,this.values=e,this.type=s,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let n=0;n<t;n++){const t=this.strings[n],i=t.lastIndexOf("\x3c!--");s=(i>-1||s)&&-1===t.indexOf("--\x3e",i+1);const r=D.exec(t);e+=null===r?t+(s?q:R):t.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+I}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}class J extends G{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,s=e.firstChild;return e.removeChild(s),$(e,s.firstChild),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const K=t=>null===t||!("object"==typeof t||"function"==typeof t),X=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class Y{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new Z(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let n=0;n<e;n++){s+=t[n];const e=this.parts[n];if(void 0!==e){const t=e.value;if(K(t)||!X(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class Z{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===H||K(t)&&t===this.value||(this.value=t,L(t)||(this.committer.dirty=!0))}commit(){for(;L(this.value);){const t=this.value;this.value=H,t(this)}this.value!==H&&this.committer.commit()}}class tt{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(z()),this.endNode=t.appendChild(z())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=z()),t.__insert(this.endNode=z())}insertAfterPart(t){t.__insert(this.startNode=z()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;L(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=H,t(this)}const t=this.__pendingValue;t!==H&&(K(t)?t!==this.value&&this.__commitText(t):t instanceof G?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):X(t)?this.__commitIterable(t):t===j?(this.value=j,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof U&&this.value.template===e)this.value.update(t.values);else{const s=new U(e,t.processor,this.options),n=s._clone();s.update(t.values),this.__commitNode(n),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,n=0;for(const i of t)s=e[n],void 0===s&&(s=new tt(this.options),e.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(e[n-1])),s.setValue(i),s.commit(),n++;n<e.length&&(e.length=n,this.clear(s&&s.endNode))}clear(t=this.startNode){O(this.startNode.parentNode,t.nextSibling,this.endNode)}}class et{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;L(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=H,t(this)}if(this.__pendingValue===H)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=H}}class st extends Y{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new nt(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class nt extends Z{}let it=!1;try{const t={get capture(){return it=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class rt{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;L(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=H,t(this)}if(this.__pendingValue===H)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=ot(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=H}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const ot=t=>t&&(it?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;class at{handleAttributeExpressions(t,e,s,n){const i=e[0];if("."===i){return new st(t,e.slice(1),s).parts}return"@"===i?[new rt(t,e.slice(1),n.eventContext)]:"?"===i?[new et(t,e.slice(1),s)]:new Y(t,e,s).parts}handleTextExpression(t){return new tt(t)}}const lt=new at;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function ht(t){let e=ut.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},ut.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const n=t.strings.join(I);return s=e.keyString.get(n),void 0===s&&(s=new F(t,t.getTemplateElement()),e.keyString.set(n,s)),e.stringsArray.set(t.strings,s),s}const ut=new Map,ct=new WeakMap,dt=(t,e,s)=>{let n=ct.get(e);void 0===n&&(O(e,e.firstChild),ct.set(e,n=new tt(Object.assign({templateFactory:ht},s))),n.appendInto(e)),n.setValue(t),n.commit()};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const pt=(t,...e)=>new G(t,e,"html",lt),mt=(t,...e)=>new J(t,e,"svg",lt),{component:ft,createContext:_t}=function({render:t}){const e=_(t),s=function(t){return e=>{const s={Provider:class extends HTMLElement{constructor(){super(),this.listeners=new Set,this.addEventListener("haunted.context",this)}disconnectedCallback(){this.removeEventListener("haunted.context",this)}handleEvent(t){const{detail:e}=t;e.Context===s&&(e.value=this.value,e.unsubscribe=this.unsubscribe.bind(this,e.callback),this.listeners.add(e.callback),t.stopPropagation())}unsubscribe(t){this.listeners.delete(t)}set value(t){this._value=t;for(let e of this.listeners)e(t)}get value(){return this._value}},Consumer:t((function({render:t}){return t(E(s))})),defaultValue:e};return s}}(e);return{component:e,createContext:s}}({render:dt});export{Y as AttributeCommitter,Z as AttributePart,f as BaseScheduler,et as BooleanAttributePart,at as DefaultTemplateProcessor,rt as EventPart,g as Hook,tt as NodePart,st as PropertyCommitter,nt as PropertyPart,J as SVGTemplateResult,u as State,F as Template,U as TemplateInstance,G as TemplateResult,ft as component,_t as createContext,z as createMarker,lt as defaultTemplateProcessor,P as directive,b as hook,pt as html,L as isDirective,X as isIterable,K as isPrimitive,Q as isTemplatePartActive,H as noChange,j as nothing,ct as parts,O as removeNodes,dt as render,$ as reparentNodes,mt as svg,ut as templateCaches,ht as templateFactory,V as useCallback,E as useContext,y as useEffect,C as useLayoutEffect,N as useMemo,T as useReducer,A as useRef,S as useState};
