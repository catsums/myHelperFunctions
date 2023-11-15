export {};

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