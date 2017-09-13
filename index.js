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
		while( this.hash.substring(0,4) != "ffff"){
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

	isValid(){
		for( var i = 1; i < this.chain.length; i++ ){

			var curent_block   = this.chain[i];
			var previous_block = this.chain[i-1];

			if( curent_block.hash != curent_block.makeHash() ){
				return false;
			}
			if( curent_block.previoushash != previous_block.hash ){
				return false
			}
		}

		return true;
	}
}


https://www.youtube.com/watch?v=EuvVOA8uvsc
blockchain = new BlockChain();

blockchain.addBlock( { name: "peddro", wathever: "ewewew"} );

blockchain.addBlock( "adasfasfsafasf" );

console.log( blockchain.print() );
console.log( "blockChain is valid = " + blockchain.isValid() );

