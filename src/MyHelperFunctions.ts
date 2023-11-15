
declare global {
	interface Array<T> {
	  midCeil(): T;
	  midFloor(): T;
	  midRound(): T;
	  last(): T;
	  first(): T;
	  removeAt(index : number): T;
	  removeItem(item : T): T;
	}

	interface BigInt {
		toJSON() : string;
	}

	interface Number {
		mod(n : number) : number;
	}

	
	interface IObject extends Object{
		[key:string] : any
	}

	type JSONType = string|number|boolean|JSONType[]|IJSON|Object|null|undefined

	interface IJSON extends Object{
		[key:string] : JSONType
	}

}

///FOR WEB API FRONT-END MODULES


///CONSOLE///
export function cout(...vars) : void{
	console.log(...vars);
}
export function clog(...x) : void{
	console.log(...x);
}

///OBJECT MODIFICATION///
try{
	if(typeof Storage !== 'undefined'){
		Storage.prototype.setObject = function(key, value) {
			this.setItem(key, JSON.stringify(value));
		}

		Storage.prototype.getObject = function(key) {
			var value = this.getItem(key);
			return value && JSON.parse(value);
		}
	}
}catch(err){ console.debug(err); }
  

Array.prototype.midCeil = function(){
	return this[Math.ceil(this.length/2)];
};
Array.prototype.midFloor = function(){
	return this[Math.floor(this.length/2)];
};
Array.prototype.midRound = function(){
	return this[Math.round(this.length/2)];
};
Array.prototype.last = function(){
	return this[this.length - 1];
};
Array.prototype.first = function(){
	return this[0];
};
Array.prototype.removeAt = function(index){
	return this.splice(index,1);
}
Array.prototype.removeItem = function(item){
	let ind = this.indexOf(item);
	return (this.splice(ind,1) > 0);
}

BigInt.prototype.toJSON = function(){
	return this.toString();
}

///MOD

///note that % operator in js is the Remainder operator and not Modulus
///:. (-1 % 5) gives -1 and not 4 as expected with modulus

Number.prototype.mod = function(n:number) : number {
  return ((this % n) + n) % n;
}

export function mod(n :number, m:number) : number {
  return ((n % m) + m) % m;
}

///Safe Division
export function isInfinity(x : number) : boolean{
    return ((x === -Infinity)||(x === Infinity));
}

export function safeDivide(a : number, b :number, useNaN : boolean=false) : number{
	let INF = Infinity;
	let res;
	
	if(a==0 && b == 0){
		if(useNaN)res = NaN;
		else res = 0;
	}else if(a==0 && isInfinity(b)){
		res = 0 * 1;
	}else if(isInfinity(a) && b==0){
		res = a * 1;
	}else if(isInfinity(a) && isInfinity(b)){
		if(useNaN) res = NaN;
		else if(a==b) res = 1;
		else res = -1;
	}else if(b == 0){
		if(useNaN) res = NaN;
		res = INF*a;
	}else if(isInfinity(b)){
		if(useNaN) res = NaN;
		res = 0 * a;
	}else{
		res = (a/b);
	}

	return res;
}

export function getAverageFrom(arr : Array<number>) : number | null{
    if(!isArray(arr)) return null;
    if(!arr.length) return 0;
	let sum = arr.reduce((_sum,x)=>{return _sum+x;},0);
    return (sum / arr.length);
}

///CSS///

export function getCSSValueInPixels(str : string) : number {
	let num = 0;
    let val = parseFloat(str);
    let unit = str.replace(`${val}`,'').trim();

    switch(unit){
        case 'in':
            num = val*96; break;
        case 'cm':
            num = (val/2.54)*96; break;
        case 'mm':
            num = ((val/100)/2.54)*96; break;
        case 'pt':
            num = (val*72)*96; break;
        case 'pc':
            num = ((val*12)*72)*96; break;
        default: //treat as px
            num = val; break;
    }

	return num;
}

///OBJECT AND HTML///
export function loadHTMLtoObject(query : string, url : string) : void{
	document.querySelector(query)?.setAttribute('data', url);
}

export function docReady(fn : (e:Event) => void) : void {
	// see if DOM is already available
	if (document.readyState === "complete" || document.readyState === "interactive") {
	// call on next available tick
		setTimeout(fn, 1);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

///MEDIA QUERIES///
export let footstrapMediaQueries = {
	xs: '0px',
	sm: '576px',
	md: '768px',
	lg: '992px',
	xl: '1200px',
	xxl: '1400px',
};

export function forMediaQuery(mediaQuery : string, matchFunc : ()=>void, unmatchFunc : ()=>void) : void {
	let match = window.matchMedia(mediaQuery);
	if(match.matches){
		matchFunc();
	}else{
		unmatchFunc();
	}
}

export function checkBootstrapMedia() : string{
	// let qKeys = Object.keys(footstrapMediaQueries);
	let qVals = Object.values(footstrapMediaQueries);

	for(var c=qVals.length-1;c>=0;c--){
		let qVal = qVals[c];
		let match = window.matchMedia(`(max-width: ${qVal})`);
		if(match.matches) return qVal;
	}
	return 'xs';
}

///FORMS///
export function getFormData(query : string | HTMLElement) : FormData | null{
	let formElement;
	if(typeof query === 'string')
		formElement = document.querySelector(query);
	else if(query instanceof HTMLFormElement)
		formElement = query;
	else return null;
	let formData = new FormData(formElement);
	return formData;
}

export function submitForm(query : string, callback : (any)=>void, url : string){
	let formElement = document.querySelector(query) as HTMLFormElement;
	let formData = new FormData(formElement);
	let methodType = formElement.getAttribute('method') as string;
	ajax(formData, url, methodType, callback);
}
var defectForm = function(e:Event){
	e.preventDefault();
	console.debug('Submit has been defected. Please use JS to override form submit');
};
export function defectAllFormSubmits() : void{
	let allForms = document.getElementsByTagName('form');
	for(var form of allForms){
		form.submit = () => {};
		form.addEventListener('submit', defectForm);
	}
}

export function formDataToJSON(formData : FormData, stringify : boolean = false) : any{
	let object = {};
	formData.forEach((value, key) => {
		// Reflect.has in favor of: object.hasOwnProperty(key)
		if(!Reflect.has(object, key)){
			object[key] = value;
			return;
		}
		if(!Array.isArray(object[key])){
			object[key] = [object[key]];
		}
		object[key].push(value);
	});
	if(stringify)
		return JSON.stringify(object);
	return object;
}


///AJAX///

export async function getBase64(file) {
	// console.log(file);
	return new Promise((res,rej)=>{
		let reader = new FileReader();
		
		reader.onload = ()=>{
			return res(reader.result);
		};
		reader.onerror = (err)=>{
			rej(err);
		};
		reader.readAsDataURL(file);
	});
}

export function ajax(data : any, url="", type="POST", success = function(x){},fail = function(x){}){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if(req.readyState == 4){
			console.debug('STATUS:'+req.status);
			if(req.status >= 200 && req.status < 300){
				success(req.responseText);
			}
			else if(req.status>=300){
				fail(req.responseText);
			}else{
				console.log(req.responseText);
			}
		}else{
		}
	};
	req.open(type,url,true);
	// req.setRequestHeader('Content-Type', 'application/json');
	// req.setRequestHeader("Content-Type", "multipart/form-data");
	if(type.toUpperCase()=="POST"){
		req.send(data);
	}else{
		req.send();
	}
}

export function ajaxGET(url:string,callback : (x)=>void,failback=function(x){}){
	ajax("",url,"GET",callback,failback);
}
export function ajaxPOST(data:any,url:string,callback : (x)=>void,failback=function(x){}){
	ajax(data,url,"POST",callback,failback);
}

export function getFileBlob(url : string | URL,type="",callback=(uurl,bblob,bbytes)=>{}){
	var oReq = new XMLHttpRequest();
	oReq.open("GET", url, true);
	oReq.responseType = "arraybuffer";

	oReq.onload = function(oEvent) {
		var arrayBuffer = oReq.response;

		// if you want to access the bytes:
		var byteArray = new Uint8Array(arrayBuffer);
		// ...

		// If you want to use the image in your DOM:
		var _blob = new Blob([arrayBuffer], {type: type});
		// var _blob = new File([arrayBuffer], hash32(url), {type: type});
		var _url = URL.createObjectURL(_blob);
		
		callback(_url,_blob,byteArray);
		//callback(URL,FILEBLOB,FILEDATA);
	};
	oReq.send();
}

export function processAjaxData(contentElement : Element|null, urlPath="", response : IObject|null=null, state : IObject = {}, callback = function(){}){
	var newState = Object.assign({}, state);
	if(response){
	 	newState.html = response.html;
	 	newState.pageTitle = response.pageTitle;
	 	if(contentElement)
	 		contentElement.innerHTML = response.html;
	 	document.title = response.pageTitle;
	}else{
	 	newState.html = '';
	 	newState.pageTitle = '';
	}
	window.history.pushState(newState,newState.pageTitle,urlPath);
	callback();
}

export function setHistoryState(urlPath="", response : IObject|null, state : IObject = {}, callback=function(){}){
	 var newState = Object.assign({}, state);
	 if(response){
	 	newState.html = response.html;
	 	newState.pageTitle = response.pageTitle;
	 	document.title = response.pageTitle;
	 }else{
	 	newState.html = '';
	 	newState.pageTitle = '';
	 }
	 window.history.replaceState(newState,newState.pageTitle,urlPath);
	 callback();
}
export function pushHistoryState(urlPath="", response : IObject|null, state : IObject = {}, callback=function(){}){
	 var newState = Object.assign({}, state);
	 if(response){
	 	newState.html = response.html;
	 	newState.pageTitle = response.pageTitle;
	 	document.title = response.pageTitle;
	 }else{
	 	newState.html = '';
	 	newState.pageTitle = '';
	 }
	 window.history.pushState(newState,newState.pageTitle,urlPath);
	 callback();
}

export function objectToURLParams(obj : IObject){
	var parts:string[] = [];
	for(var key in obj) {
		if(obj.hasOwnProperty(key)) {
			parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
		}
	}
	return "?" + parts.join('&');
}

//ref: https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript
export function parseURLParams(url :string, typecast=false, autoParseObjects=false) {
	var queryStart = url.indexOf("?") + 1,
		queryEnd = url.indexOf("#") + 1 || url.length + 1,
		query = url.slice(queryStart, queryEnd - 1),
		pairs = query.replace(/\+/g, " ").split("&"),
		params = {}, i, n, v, nv, nx;

	if (query === url || query === "") return null;

	for (i = 0; i < pairs.length; i++) {
		nv = pairs[i].split("=", 2);
		n = decodeURIComponent(nv[0]);
		v = decodeURIComponent(nv[1]);
		nx = null;
		if(typecast){
			if(autoParseObjects){
				if(n.includes('[')){
					//test for array
					if(n.includes('[]')){
						n = n.replace('[]','');
						if(!params.hasOwnProperty(n))
							params[n] = [];
					}
					//test for object
					else if(n.includes(']')){
						var nn = n.split('[', 2);
						n = nn[0]; nx = nn[1].replace(']','');
						if(!params.hasOwnProperty(n))
							params[n] = {};
						params[n][nx] = null;
					}
				}
			}
				//test for number
			if(!(isNaN(v)))
				v = Number(v);
			else{
				//test for boolean
				v = v === 'true' || (v === 'false' ? false : v);
				//test for nullable
				v = v === 'undefined' ? undefined : (v === 'null' ? null : v);
			}
			
		}
		
		if (!params.hasOwnProperty(n)){
			params[n] = v;
		}
		else{
					if(typeof params[n] !== 'object'){
						params[n] = [params[n]];
					}
					else if(params[n] instanceof Array)
				params[n].push(nv.length === 2 ? v : null);
			else if(nx != null)
				params[n][nx] = v;
		}
			
	}
	/*for(var param of Object.keys(params)){
		if(params[param] instanceof Array && params[param].length == 1)
			params[param] = params[param][0];
	}*/
	return params;
}

///COOKIES///
//reference: https://www.w3schools.com/js/js_cookies.asp
export function checkCookie(cname : string) {
	let cookey = getCookie(cname);
	if(cookey != "") return true;
	return false;
}
export function setCookie(cname : string, cvalue : string, exdays=1) {
	let d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
}
export function deleteCookie(cname : string){
	document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
export function getCookie(cname : string) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++){
		var c = ca[i];
		while (c.charAt(0) == ' '){
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0){
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
///VERIFY DATA TYPE///
export function isInt(val){
	return (isNumber(val) && Math.trunc(val) === val);
}
export function isNumber(val){
	return !isNaN(Number(val));
}
export function isArray(arr){
	return (typeof arr === 'object' && arr instanceof Array);
}
export function isString(str){
	return (typeof str === 'string');
}
export function isFunction(func){
	return (typeof func === 'function' || func instanceof Function);
}
export function isObject(object) {
	return (object != null && typeof object === 'object');
}
export function isInRange(num : number, min : number, max : number, inclusive=true){
	if(inclusive)
		return (num>=min && num<=max);
	else
		return (num>min && num<max);
}
export function isJSON(str : any) {
	if(!isString(str)){
		str = JSON.stringify(str);
	}
	let obj = null;
	try{ obj = JSON.parse(str) }
	catch(e){ return false; }

	if(isObject(obj)) return true;
	return false;
}
export function link_is_external(link_element, _location=window.location) {
	return (link_element.host !== _location.host);
}
export function isExternalURLFast(url) {
	var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
	if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
	if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) return true;
	return false;
}
export function isExternalURL(url : string | URL){
	try{
		if(typeof URL === 'undefined'){}
	}catch(e){
		console.debug(e);
	}
	var res = false;
	try {
		res = (new URL(url).origin !== location.origin);
	} catch(e) {
		return false;
	}
	return res;
}

export function JSONobjectsAreEqual(objA , objB){
	var jsonA = JSON.stringify(objA);
	var jsonB = JSON.stringify(objB);
	if(jsonA===jsonB) return true;
	return false;
}

///GENERATING RANDOM VALUE///

export function randomId(_prefix='',_suffix=''){
	return _prefix+(Math.random().toString(36).substr(2, 9))+_suffix;
}

export function randomID(_prefix='',_suffix='',_length=9){
	return `${_prefix}${randomString(9)}${_suffix}`;
}

export function hexadecimalID(_len=16,_pow=4){
    return Math.floor((1 + Math.random()) * (Math.pow(_len,_pow))).toString(16).substring(1);
}

export function randomString(length:number, chars:string|null=null) {
	if(!chars)
		chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	else
		chars = String(chars);
	var result = '';
	for (var i = length; i > 0; --i)
		result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}
export function randomCharFrom(str:string){
	return randomString(1,str);
}

export function rndInt(min:number, max:number) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export function randomItemFrom<T>(arr : Array<T>) : T{
	return arr[rndInt(0,arr.length-1)];
}

export function safeStringify(obj : any){
    let cache:any[] = [];
    let s = JSON.stringify(obj, (key, value) => {
      if (isObject(value)) {
        // Duplicate reference found, discard key
        if (cache.includes(value)) return;
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
	cache = []; // Enable garbage collection

    return s;
}

///HASHING///
export function hash32(str:string){
	var hash = 0, i, chr;
	str = JSON.stringify(str);
	if (str.length === 0)
		return String(hash);
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return String(hash);
}
export function hash64(str:string) {
	var h1 = hash32(str);	// returns 32 bit (as 8 byte hex string)
	return h1 + hash32(h1 + str);	// 64 bit (as 16 byte hex string)
}
export function hash128(str:string) {
	var h1 = hash64(str);	// returns 64 bit (as 16 byte hex string)
	return h1 + hash64(h1 + str);	// 128 bit (as 32 byte hex string)
}

//OTHER//
export function stringTrimToLength(_str : string, _len : number){
	if(_len==null) _len = String(_str).length;
	_str = String(_str);
	return _str.substring(0, _len);
}
export function jsonFix(str : string){
	str = String(str);
	// let regex = /\,(?=\s*?[\}\]])/g;
	let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
	var newStr = str.replace(regex, '');
	return newStr;
}

export function deg2rad(deg : number){
	var res = (deg * Math.PI)/180;
	return res;
}
export function rad2deg(rad : number){
	var res = (rad * 180)/Math.PI;
	return res;
}
export function stepify(value : number, step : number){
	if(step==0) return value;
	if(step==Infinity) return 1;
	return Math.round((value+Number.EPSILON)/step)*step;
}

export function splitStringByLength(str : string, len : number){
	var parts:string[] = [];
	for (var i = 0; i < str.length; i += len) {
		parts.push(str.substring(i, i + len));
	}
	return parts;
}
export function sanitizeString(str : string){
	str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
	return str.trim();
}
export function validateEmail(email : string){
 	return String(email)
	.toLowerCase()
	.match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
}
//https://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
export function mysql_real_escape_string (str : string) {
	return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
		switch (char) {
			case "\0":
				return "\\0";
			case "\x08":
				return "\\b";
			case "\x09":
				return "\\t";
			case "\x1a":
				return "\\z";
			case "\n":
				return "\\n";
			case "\r":
				return "\\r";
			case "\"":
			case "'":
			case "\\":
			case "%":
				return "\\"+char; // prepends a backslash to backslash, percent, and double/single quotes
			default:
				return char;
		}
	});
}

///OBJECTS

export function areSimilar(objA, objB){
    if(objA == objB) return true;
    if(isObject(objA) && isObject(objB)){
        objA = JSON.parse(JSON.stringify(objA));
        objB = JSON.parse(JSON.stringify(objB));

        for(let k of Object.keys(objA)){
            if(!(k in objB)) return false;
            if(!areSimilar(objA[k],objB[k])) return false;
        }
        return true;
    }else{
        if(typeof objA === typeof objB){
            return objA === objB;
        }
    }
    return false;
}

///ARRAYS

export function hardPush<T>(arr : T[], item:T, compareProps:string[]){
	if(!arr || !(arr instanceof Array)) return false;
	if(!item) return false;
	if(!arr.length){
		arr.push(item);
		return true;
	}
    if(arr.indexOf(item)>=0) return false;

	for(var i=0;i<arr.length;i++){
		var arrItem = arr[i];
        if(isObject(arrItem) && isObject(item)){
            if(compareProps && isArray(compareProps)){
                for(let prop of compareProps){
                    if(prop in (arrItem as Object) && areSimilar(arrItem[prop],item[prop])){
                        return false;
                    }
                }
            }
        }else if(arrItem===item){
           	return false; 
        }
	}
	arr.push(item);
	return true;
}

export function shallowEqual(object1:IObject, object2:IObject) {
	let keys1 = Object.keys(object1);
	let keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (let key of keys1) {
		if (object1[key] !== object2[key]) {
			return false;
		}
	}

	return true;
}

export function deepEqual(object1:IObject, object2:IObject) {
	let keys1 = Object.keys(object1);
	let keys2 = Object.keys(object2);

	if(keys1.length !== keys2.length) {
		return false;
	}

	for(let key of keys1) {
		let val1 = object1[key];
		let val2 = object2[key];
		let areObjects = isObject(val1) && isObject(val2);
		if (
			areObjects && !deepEqual(val1, val2) ||
			!areObjects && val1 !== val2
		) {
			return false;
		}
	}

	return true;
}

export function findItemIndex<T>(arr:T[],item:T){
	if(!arr || !(arr instanceof Array)) return -1;
	if(!item) return -1;

	for(let i=0;i<arr.length;i++){
		let arrItem = arr[i];
		if(isObject(arrItem) && isObject(item))
			if(shallowEqual(arrItem as Object, item)) return i;
		else if(arrItem===item)
			return i;
	}
	return -1;
}

export function findItem<T>(arr:T[], item:T){
	var res = findItemIndex(arr,item);
	if(res < 0) return false;
	return true;
}

export function arrayRemove<T>(arr:T[], item:T){
	var res = arr.indexOf(item);
	if(res<0) return false;
	let x = arr.splice(res,1);
	return (x.length>0);
}

export function findItemObject<T>(arr:T[], item:T, compareProperties:string[]|null=null){
	var res =  findItemObjectIndex(arr,item,compareProperties);
	if(res < 0) return false;
	return true;
}


export function findItemObjectIndex<T>(arr:T[],item:T,compareProperties:string[]|null=null){
	if(!arr || !(arr instanceof Array)) return -1;
	if(!item) return -1;
	if(arr.length==0){
		return -1;
	}
	for(var i=0;i<arr.length;i++){
		let arrItem = arr[i];
		if(arrItem instanceof Object && item instanceof Object){
			if(compareProperties && compareProperties instanceof Array){
				for(let pproperty of compareProperties){
					if(arrItem.hasOwnProperty(pproperty) && arrItem[pproperty]===item[pproperty]) return i;
				}
			}
			else if(shallowEqual(arrItem,item)) return i;
		}
		else if(arrItem===item)
			return i;
	}
	return -1;
}
export function getObjectFromArray<T>(arr:T[],properties:T){
	if(!arr || !(arr instanceof Array)) return false;
	if(!properties) return false;
	if(arr.length==0){
		return false;
	}
	var item = properties;
	var compareProperties = Object.keys(item);
	for(var i=0;i<arr.length;i++){
		var arrItem = arr[i];
		if(arrItem instanceof Object && item instanceof Object){
			if(compareProperties && compareProperties instanceof Array){
				for(let prop of compareProperties){
					if(arrItem.hasOwnProperty(prop) && arrItem[prop]===item[prop]) return arrItem;
				}
			}
			else if(shallowEqual(arrItem,item)) return arrItem;
		}
		else if(arrItem===item)
			return arrItem;
	}
	return false;
}

export function getClosestPathInCircle<T>(arr:T[],_from:number,_to:number, bias=0){
	if(!(arr instanceof Array)){
		return [];
	}if(_from < 0 || _from >= arr.length){
		return [];
	}if(_to < 0 || _to >= arr.length){
		return [];
	}

	let iL:number, iR:number;
	iL = iR = _from;
	let arrL:T[] = [], arrR:T[] = [];
	let arrX:T[];
	while(arrL.length < arr.length){
		let _i = mod(iL, arr.length);
		arrL.push(arr[_i]);
		if(Math.abs(_i)==_to) break;
		iL--;
	}
	while(arrR.length < arr.length){
		let _i = mod(iR, arr.length);
		arrR.push(arr[_i]);
		if(Math.abs(_i)==_to) break;
		iR++;
	}

	if(Math.abs(arrL.length)<Math.abs(arrR.length)){
		arrX = arrL;
	}else if(Math.abs(arrL.length)>Math.abs(arrR.length)){
		arrX = arrR;
	}else{
		if(bias>0) arrX = arrR;
		else arrX = arrL;
	}

	return arrX;
}

export function roundTo(num, step){
    if(step == 0) return num;
    if(isInfinity(step)) return Infinity;
    let invStep = Math.pow(step,-1);
    let invMiniStep = Math.pow(step/10,-1);

    let initNum = Math.round(num * invMiniStep) / invMiniStep;

    let init = Math.round(initNum  * invStep) / invStep;
    // let res = init;
    let res = Math.round((init + Number.EPSILON)  * invStep) / invStep;

    return res;
}
