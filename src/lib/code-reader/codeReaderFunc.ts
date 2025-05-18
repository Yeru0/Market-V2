/*-------------------------------------------------------------*\
    "codeReaderFunc.ts" contains functions used by the module
\*-------------------------------------------------------------*/
import { Code } from './codeReaderObjects';

// Reduces the length of a number into a maximum 2 digit number by adding it's digits
// eg. 123 --> 1+2+3=5 || 123456 --> 1+2+3+4+5+6=21 || 999999999999 --> 9+9+9+9+9+9+9+9+9+9+9+9=108 --> 1+0+8=9
// Returns the reduced number
export function reduceDigits(n: number): number {
	let nStr: string = n.toString();
	let nArray: Array<number> = [];

	while (nStr.length > 2) {
		for (let i = 0; i < nStr.length; i++) {
			nArray.push(parseInt(nStr[i]));
		}

		n = nArray.reduce((a, b) => a + b, 0);
		nStr = n.toString();
		nArray = [];
	}

	return n;
}

/*
    Generates three random numbers, who's sum equals 12
    eg. 237 or 660
    Returns an object of the individual numbers
    eg. 237 -> {
        n1:2,
        n2:3,
        n3:7,
    }
*/
export function genPacket(): { n1: number; n2: number; n3: number } {
	let min: number = 3;
	let max: number = 9;

	let n1: number = Math.floor(Math.random() * (max - min) + min);
	min = 0;
	max = 12 - n1;

	let n2: number = Math.floor(Math.random() * (max - min) + min);

	let n3: number = 12 - (n1 + n2);

	return {
		n1,
		n2,
		n3
	};
}
