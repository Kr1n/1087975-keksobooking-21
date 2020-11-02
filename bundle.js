(()=>{"use strict";window.util={getRandomInt:(e,t)=>Math.floor(e+Math.random()*Math.floor(t-e)),removeAllChildNodes:e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},debounce:function(e){let t=null;return function(...n){t&&window.clearTimeout(t),t=window.setTimeout((function(){e(...n)}),500)}}},(()=>{const e=document.querySelector(".map"),t=["palace","flat","house","bungalow"],n=["12:00","13:00","14:00"],o=["12:00","13:00","14:00"],r=["wifi","dishwasher","parking","washer","elevator","conditioner"],i=["http://o0.github.io/assets/images/tokyo/hotel1.jpg","http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg"],d=[];window.data={createOffersArray:function(c=8){let u,a;for(let s=1;s<=c;s++)u=window.util.getRandomInt(window.pin.pinWidth/2,e.clientWidth-window.pin.pinWidth/2),a=window.util.getRandomInt(130,630),d[s-1]={author:{avatar:"img/avatars/user0"+s+".png"},offer:{title:"Заголовок "+s,address:u+", "+a,price:window.util.getRandomInt(1e3,3e3),type:t[window.util.getRandomInt(0,t.length)],rooms:window.util.getRandomInt(1,3),guests:window.util.getRandomInt(1,3),checkin:n[window.util.getRandomInt(0,n.length)],checkout:o[window.util.getRandomInt(0,o.length)],features:r,description:"Описание "+s,photos:i},location:{x:u,y:a}};return d},offers:d}})(),(()=>{window.backend={load:(t,n)=>{n||(n=e);let o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(function(){200===o.status?t(o.response):n("Статус ответа: "+o.status+" "+o.statusText)})),o.addEventListener("error",(function(){n("Произошла ошибка соединения")})),o.addEventListener("timeout",(function(){n("Запрос не успел выполниться за "+o.timeout+"мс")})),o.timeout=5e3,o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send()},save:(t,n,o)=>{o||(o=e);let r=new XMLHttpRequest;r.responseType="json",r.addEventListener("load",(function(){200===r.status?n(r.response):o("Статус ответа: "+r.status+" "+r.statusText)})),r.addEventListener("error",(function(){o("Произошла ошибка соединения")})),r.addEventListener("timeout",(function(){o("Запрос не успел выполниться за "+r.timeout+"мс")})),r.timeout=5e3,r.open("POST","https://21.javascript.pages.academy/keksobooking"),r.send(t)}};let e=e=>{let t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}})(),(()=>{window.filters={applyFilters:function(e){return d=c(e),d=u(d),d=a(d),d=s(d),d=l(d),d}};const e=document.querySelector("#housing-type"),t=document.querySelector("#housing-price"),n=document.querySelector("#housing-rooms"),o=document.querySelector("#housing-guests"),r=document.querySelector("#housing-features"),i=r.querySelectorAll("input");let d;const c=t=>t.filter((t=>"any"===e.value||e.value===t.offer.type)),u=e=>e.filter((e=>{switch(t.value){case"low":return Number(e.offer.price)<=1e4;case"middle":return Number(e.offer.price)>1e4&&Number(e.offer.price)<=5e4;case"high":return Number(e.offer.price)>5e4;default:return!0}})),a=e=>e.filter((e=>"any"===n.value||n.value===e.offer.rooms.toString())),s=e=>e.filter((e=>{switch(o.value){case"any":return!0;case"0":return Number(e.offer.guests)>2||0===Number(e.offer.guests);default:return Number(o.value)===e.offer.guests}})),l=e=>{let t=[];return i.forEach((e=>{e.checked&&t.push(e.defaultValue)})),t.length?e.filter((e=>{let n=!0;return t.every((t=>n=-1!==e.offer.features.indexOf(t))),n})):e},m=e=>{window.pin.closePinCard(),window.map.renderMapPins()};e.addEventListener("change",window.util.debounce(m)),t.addEventListener("change",window.util.debounce(m)),n.addEventListener("change",window.util.debounce(m)),o.addEventListener("change",window.util.debounce(m)),r.addEventListener("change",window.util.debounce(m))})(),(()=>{window.card={createPinCard:o,renderPinCard:function(t){let n=e.querySelectorAll(".map__card"),r=document.createElement("div");n.forEach((e=>e.remove())),r.appendChild(o(t)),e.querySelector(".map__filters-container").insertAdjacentHTML("beforebegin",r.innerHTML),e.querySelector(".popup__close").addEventListener("click",(function(e){window.pin.closePinCard(e.target)})),e.querySelector(".popup__close").addEventListener("keydown",(function(e){"Enter"===e.key&&window.pin.closePinCard()})),document.addEventListener("keydown",window.pin.onPinCardEscPress)}};const e=document.querySelector(".map"),t=document.querySelector("#card"),n={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"};function o(e){let o,r=t.cloneNode(!0).content,i=n[e.offer.type],d=document.createDocumentFragment();for(let t=0;t<e.offer.photos.length;t++)o=r.querySelector(".popup__photos img").cloneNode(!0),o.src=e.offer.photos[t],d.appendChild(o);let c,u=document.createDocumentFragment();for(let t=0;t<e.offer.features.length;t++)c=document.createElement("li"),c.classList.add("popup__feature"),c.classList.add("popup__feature--"+e.offer.features[t]),u.appendChild(c);r.querySelector(".popup__title").textContent=e.offer.title,r.querySelector(".popup__text--address").textContent=e.offer.address,r.querySelector(".popup__text--price").textContent=e.offer.price+"₽/ночь",r.querySelector(".popup__type").textContent=i,r.querySelector(".popup__text--capacity").textContent=e.offer.rooms+" комнаты для "+e.offer.guests+" гостей",r.querySelector(".popup__text--time").textContent="Заезд после "+e.offer.checkin+", выезд до "+e.offer.checkout,r.querySelector(".popup__description").textContent=e.offer.description,r.querySelector("img").src=e.author.avatar;let a=r.querySelector(".popup__photos");window.util.removeAllChildNodes(a),a.appendChild(d);let s=r.querySelector(".popup__features");return window.util.removeAllChildNodes(s),s.appendChild(u),r}})(),(()=>{document.querySelector(".map__pin--main");const e=document.querySelector(".map");function t(){let t=e.querySelector(".popup");t&&t.classList.add("hidden"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&(e.preventDefault(),t())}window.pin={onPinCardEscPress:n,onMainPinEnterPress:function(e){"Enter"===e.key&&window.map.setActiveState()},onMainPinMousePress:function(e){"object"==typeof e&&0===e.button&&window.map.setActiveState()},closePinCard:t,pinWidth:50,pinHeight:70}})(),(()=>{const e=document.querySelector("#pin"),t=document.querySelector(".map"),n=document.querySelectorAll(".ad-form fieldset"),o=document.querySelectorAll(".map__filters > *"),r=document.querySelector(".ad-form"),i=document.querySelector(".map__pin--main");function d(t){let n=e.cloneNode(!0).content;return n.querySelector(".map__pin").style="left: "+(t.location.x-window.pin.pinWidth/2)+"px; top: "+(t.location.y-window.pin.pinHeight)+"px;",n.querySelector("img").src=t.author.avatar,n.querySelector("img").alt=t.offer.title,n}function c(){t.querySelectorAll(".map__pins button").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()}));let e=t.querySelector(".map__pins"),n=document.createDocumentFragment(),o=window.filters.applyFilters(window.data.offers);const r=5<o.length?5:o.length;for(let e=0;e<r;e++)n.appendChild(d(o[e]));e.appendChild(n);let i=t.querySelectorAll(".map__pin");for(let e=0;e<r;e++)i[e+1].addEventListener("click",(()=>window.card.renderPinCard(o[e])))}function u(e){window.data={offers:e},c()}t.classList.remove("map--faded"),window.map={renderMapPins:c,setActiveState:function(){n.forEach((e=>e.disabled=!1)),o.forEach((e=>e.disabled=!1)),r.classList.remove("ad-form--disabled"),t.classList.remove("map--faded"),window.backend.load(u),i.removeEventListener("mousedown",window.pin.onMainPinMousePress),i.removeEventListener("keydown",window.pin.onMainPinEnterPress)},setNonActiveState:function(){n.forEach((e=>e.disabled=!0)),o.forEach((e=>e.disabled=!0)),r.classList.add("ad-form--disabled"),t.classList.add("map--faded"),i.addEventListener("mousedown",window.pin.onMainPinMousePress),i.addEventListener("keydown",window.pin.onMainPinMousePress)}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".map__pin--main"),n=document.querySelector(".ad-form__reset"),o=document.querySelector(".ad-form"),r=document.querySelector("#address"),i=(document.querySelectorAll(".ad-form fieldset"),document.querySelector("#room_number")),d=document.querySelector("#capacity"),c=document.querySelector("#type"),u=document.querySelector("#price"),a=document.querySelector("#timein"),s=document.querySelector("#timeout"),l=document.querySelector(".ad-form__field input[type=file]"),m=document.querySelector(".ad-form-header__preview img"),p=document.querySelector(".ad-form__upload input[type=file]"),f=document.querySelector(".ad-form__photo");let y;window.form={setAddressValue:function(e,t){r.value=Math.floor(e)+", "+Math.floor(t)}};const w=(t,n)=>{let o=t.name.toLowerCase();if(e.some((e=>o.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{n.src=e.result})),e.readAsDataURL(t)}};l.addEventListener("change",(()=>{w(l.files[0],m)})),p.addEventListener("change",(()=>{let e=document.createElement("img");e.setAttribute("width","70"),e.setAttribute("height","70"),e.setAttribute("alt","Предпросмотр картинки пользователя"),f.appendChild(e),w(p.files[0],f.querySelector("img"))}));const h=()=>{const e=d[d.selectedIndex].value,t=i[i.selectedIndex].value;"0"===e&&"100"===t?d.setCustomValidity(""):e!==t?d.setCustomValidity("Количество гостей и комнат не совпадает"):d.setCustomValidity("")};i.addEventListener("input",h),d.addEventListener("input",h),c.addEventListener("input",(e=>{switch(e.target.options.selectedIndex){case 0:u.setAttribute("min","0");break;case 1:u.setAttribute("min","1000");break;case 2:u.setAttribute("min","5000");break;case 3:u.setAttribute("min","10000");break;default:u.setAttribute("min","0")}})),a.addEventListener("input",(e=>{s.options.selectedIndex=e.target.options.selectedIndex})),s.addEventListener("input",(e=>{a.options.selectedIndex=e.target.options.selectedIndex}));const v=e=>{"Escape"===e.key&&(e.preventDefault(),S(),document.removeEventListener("keydown",v),document.removeEventListener("click",g))},g=e=>{S(),document.removeEventListener("keydown",v),document.removeEventListener("click",g)},S=()=>y.remove(),q=e=>{const t=document.querySelector("#error");document.querySelector("main").appendChild(t.cloneNode(!0).content),y=document.querySelector(".error"),document.addEventListener("keydown",v),document.addEventListener("click",g)},_=e=>{const t=document.querySelector("#success");document.querySelector("main").appendChild(t.cloneNode(!0).content),y=document.querySelector(".success"),document.addEventListener("keydown",v),document.addEventListener("click",g)};o.addEventListener("submit",(e=>{e.preventDefault(),window.backend.save(new FormData(o),_,q)})),n.addEventListener("click",(e=>{for(e.preventDefault(),window.form.setAddressValue(t.offsetLeft+document.mainPin.mainPinWidth/2,t.offsetTop+document.mainPin.mainPinHeight),document.querySelector("#title").value="",document.querySelector("#type").selectedIndex=1,document.querySelector("#price").value="",document.querySelector("#room_number").selectedIndex=0,document.querySelector("#capacity").selectedIndex=2,document.querySelector("#description").value="",document.querySelector("#timein").selectedIndex=0,document.querySelector("#timeout").selectedIndex=0,document.querySelector("#avatar").value="",document.querySelector("#images").value="",document.querySelector(".ad-form-header__preview img").src="img/muffin-grey.svg";f.firstChild;)f.removeChild(f.firstChild);document.querySelectorAll(".features input").forEach((e=>e.checked=0))}))})(),(()=>{const e=document.querySelector(".map");let t=document.querySelector(".map__pin--main"),n={},o=!1;function r(e){if(e.preventDefault(),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",r),o){var n=function(e){e.preventDefault(),t.removeEventListener("click",n)};t.addEventListener("click",n)}}function i(r){o=!0;let i=n.x-r.clientX,d=n.y-r.clientY;n={x:r.clientX,y:r.clientY};let c=t.offsetLeft-i;c<-31?c=-31:c>e.offsetWidth-31&&(c=e.offsetWidth-31);let u=t.offsetTop-d;u<46?u=46:u>546&&(u=546),t.style.top=u+"px",t.style.left=c+"px",window.form.setAddressValue(t.offsetLeft+31,t.offsetTop+84)}document.mainPin={mainPinWidth:62,mainPinHeight:84},t.addEventListener("mousedown",(function(e){e.preventDefault(),o=!1,n={x:e.clientX,y:e.clientY},document.addEventListener("mousemove",i),document.addEventListener("mouseup",r)}))})(),(()=>{const e=document.querySelector(".map__pin--main");window.map.setNonActiveState(),window.form.setAddressValue(e.offsetLeft+document.mainPin.mainPinWidth/2,e.offsetTop+document.mainPin.mainPinHeight)})()})();