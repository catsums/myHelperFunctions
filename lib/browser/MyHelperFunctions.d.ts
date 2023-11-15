declare global {
    interface Array<T> {
        midCeil(): T;
        midFloor(): T;
        midRound(): T;
        last(): T;
        first(): T;
        removeAt(index: number): T;
        removeItem(item: T): T;
    }
    interface BigInt {
        toJSON(): string;
    }
    interface Number {
        mod(n: number): number;
    }
    interface IObject extends Object {
        [key: string]: any;
    }
    type JSONType = string | number | boolean | JSONType[] | IJSON | Object | null | undefined;
    interface IJSON extends Object {
        [key: string]: JSONType;
    }
}
export declare function cout(...vars: any[]): void;
export declare function clog(...x: any[]): void;
export declare function mod(n: number, m: number): number;
export declare function isInfinity(x: number): boolean;
export declare function safeDivide(a: number, b: number, useNaN?: boolean): number;
export declare function getAverageFrom(arr: Array<number>): number | null;
export declare function getCSSValueInPixels(str: string): number;
export declare function loadHTMLtoObject(query: string, url: string): void;
export declare function docReady(fn: (e: Event) => void): void;
export declare let footstrapMediaQueries: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
};
export declare function forMediaQuery(mediaQuery: string, matchFunc: () => void, unmatchFunc: () => void): void;
export declare function checkBootstrapMedia(): string;
export declare function getFormData(query: string | HTMLElement): FormData | null;
export declare function submitForm(query: string, callback: (any: any) => void, url: string): void;
export declare function defectAllFormSubmits(): void;
export declare function formDataToJSON(formData: FormData, stringify?: boolean): any;
export declare function getBase64(file: any): Promise<unknown>;
export declare function ajax(data: any, url?: string, type?: string, success?: (x: any) => void, fail?: (x: any) => void): void;
export declare function ajaxGET(url: string, callback: (x: any) => void, failback?: (x: any) => void): void;
export declare function ajaxPOST(data: any, url: string, callback: (x: any) => void, failback?: (x: any) => void): void;
export declare function getFileBlob(url: string | URL, type?: string, callback?: (uurl: any, bblob: any, bbytes: any) => void): void;
export declare function processAjaxData(contentElement: Element | null, urlPath?: string, response?: IObject | null, state?: IObject, callback?: () => void): void;
export declare function setHistoryState(urlPath: string, response: IObject | null, state?: IObject, callback?: () => void): void;
export declare function pushHistoryState(urlPath: string, response: IObject | null, state?: IObject, callback?: () => void): void;
export declare function objectToURLParams(obj: IObject): string;
export declare function parseURLParams(url: string, typecast?: boolean, autoParseObjects?: boolean): {};
export declare function checkCookie(cname: string): boolean;
export declare function setCookie(cname: string, cvalue: string, exdays?: number): void;
export declare function deleteCookie(cname: string): void;
export declare function getCookie(cname: string): string;
export declare function isInt(val: any): boolean;
export declare function isNumber(val: any): boolean;
export declare function isArray(arr: any): boolean;
export declare function isString(str: any): boolean;
export declare function isFunction(func: any): boolean;
export declare function isObject(object: any): boolean;
export declare function isInRange(num: number, min: number, max: number, inclusive?: boolean): boolean;
export declare function isJSON(str: any): boolean;
export declare function link_is_external(link_element: any, _location?: Location): boolean;
export declare function isExternalURLFast(url: any): boolean;
export declare function isExternalURL(url: string | URL): boolean;
export declare function JSONobjectsAreEqual(objA: any, objB: any): boolean;
export declare function randomId(_prefix?: string, _suffix?: string): string;
export declare function randomID(_prefix?: string, _suffix?: string, _length?: number): string;
export declare function hexadecimalID(_len?: number, _pow?: number): string;
export declare function randomString(length: number, chars?: string | null): string;
export declare function randomCharFrom(str: string): string;
export declare function rndInt(min: number, max: number): number;
export declare function randomItemFrom<T>(arr: Array<T>): T;
export declare function safeStringify(obj: any): string;
export declare function hash32(str: string): string;
export declare function hash64(str: string): string;
export declare function hash128(str: string): string;
export declare function stringTrimToLength(_str: string, _len: number): string;
export declare function jsonFix(str: string): string;
export declare function deg2rad(deg: number): number;
export declare function rad2deg(rad: number): number;
export declare function stepify(value: number, step: number): number;
export declare function splitStringByLength(str: string, len: number): string[];
export declare function sanitizeString(str: string): string;
export declare function validateEmail(email: string): RegExpMatchArray;
export declare function mysql_real_escape_string(str: string): string;
export declare function areSimilar(objA: any, objB: any): boolean;
export declare function hardPush<T>(arr: T[], item: T, compareProps: string[]): boolean;
export declare function shallowEqual(object1: IObject, object2: IObject): boolean;
export declare function deepEqual(object1: IObject, object2: IObject): boolean;
export declare function findItemIndex<T>(arr: T[], item: T): number;
export declare function findItem<T>(arr: T[], item: T): boolean;
export declare function arrayRemove<T>(arr: T[], item: T): boolean;
export declare function findItemObject<T>(arr: T[], item: T, compareProperties?: string[] | null): boolean;
export declare function findItemObjectIndex<T>(arr: T[], item: T, compareProperties?: string[] | null): number;
export declare function getObjectFromArray<T>(arr: T[], properties: T): false | T;
export declare function getClosestPathInCircle<T>(arr: T[], _from: number, _to: number, bias?: number): T[];
export declare function roundTo(num: any, step: any): any;
