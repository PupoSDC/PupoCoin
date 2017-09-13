let SHA256 = require('crypto-js/sha256');


class Block {

	constructor( data, previoushash ) {
		this.data         = data;
		this.previoushash = previoushash;
		this.hash         = this.makeHash();
	}

	makeHash(){
		return SHA256( this.data.toString() + this.previoushash ).toString();
	}
}

class BlockChain {

	constructor() {
		this.chain = [ new Block( {},'0' ) ];
	}

	print(){
		return JSON.stringify( this.chain,{},4 );
	}

	addBlock( data ){

		this.chain.push( new Block(
			data,
			this.chain[ this.chain.length - 1 ].hash
		));
	}
}

b = new BlockChain();
b.addBlock( { name: "peddro", wathever: "ewewew"} );
b.addBlock( "adasfasfsafasf" );
console.log( b.print() );

