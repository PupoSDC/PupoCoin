let SHA256 = require('crypto-js/sha256');


class Block {

	constructor( data, previoushash ) {
		this.data         = data;
		this.previoushash = previoushash;
		this.hash         = this.makeHash();
		this.code         = "nothing"
	}

	makeHash(){
		return SHA256(
			  this.data.toString()
			+ this.previoushash
			+ this.code
		).toString();
	}

	mine(){
		while( this.hash.substring(0,5) != "fffff"){
			this.code = this.hash;
			this.hash = this.makeHash();
		}
	}
}

class BlockChain {

	constructor() {
		let genesis = new Block( {},'0' );
		genesis.mine();
		this.chain = [ genesis ];
	}

	print(){
		return JSON.stringify( this.chain,{},4 );
	}

	addBlock( data ){
		let block = new Block( data, this.chain[ this.chain.length - 1 ].hash );
		block.mine();
		this.chain.push( block );
	}
}

blockchain = new BlockChain();
blockchain.addBlock( { name: "peddro", wathever: "ewewew"} );
blockchain.addBlock( "adasfasfsafasf" );
console.log( blockchain.print() );

