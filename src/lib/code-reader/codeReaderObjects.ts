/*---------------------------------------------------------------*\
    "codeReaderObjects.ts" contains classes used by the module
\*---------------------------------------------------------------*/

import { genPacket, reduceDigits } from './codeReaderFunc';

export class Code {
	code: string = '';

	constructor(code?: string, gen?: boolean) {
		if (code) {
			this.code = code;
		} else if (gen) {
			code = this.gen();
		}
	}

	// Generates a special code, that can be later validated by a simple checksum
	gen(): string {
		let packet1: { n1: number; n2: number; n3: number } = genPacket();
		let packet2: { n1: number; n2: number; n3: number } = genPacket();
		let packet3: { n1: number; n2: number; n3: number } = genPacket();

		// Multiplies the nth digit of all the packets with each other
		let multiplicateOfFirstNumber: number = packet1.n1 * packet2.n1 * packet3.n1;
		let multiplicateOfSecondNumber: number = packet1.n2 * packet2.n2 * packet3.n2;
		let multiplicateOfThirdNumber: number = packet1.n3 * packet2.n3 * packet3.n3;

		// Reduces the multiplicates put after each other
		/* 
            eg.
            multiplicateOfFirstNumber = 146
            multiplicateOfSecondNumber = 320
            multiplicateOfThirdNumber = 896
    
            reduced = reduceDigits(146320896) --> 1+4+6+3+2+0+8+9+6=39
        */
		let reduced = reduceDigits(
			parseInt(
				`${multiplicateOfFirstNumber}${multiplicateOfSecondNumber}${multiplicateOfThirdNumber}`
			)
		);

		/*
            If the sum of the digits of reduced is more than twelve,
            then the fourth packet can't be summed to exactly twelve,
            so reduced is divided / 9 and then rounded, making sure,
            the sum of the digits of reduced is less than twelve
        */
		/*
            eg.
            reduced = 95 --> 9+5=14
            reduced = Math.round(14/9)
            reduced = 2
        */
		if (parseInt(reduced.toString()[0]) + parseInt(reduced.toString()[1]) > 12)
			reduced = Math.round(reduced / 9);
		if (reduced == 11 || reduced == 20 || reduced <= 10) reduced += 12;

		// The sum of the digits of reduced
		let reducedDigitsSummed = parseInt(reduced.toString()[0]) + parseInt(reduced.toString()[1]);

		/*
            Generates the fourth packet by pasting reduced into
            the first part of the number, the last number just
            makes sure the fourth packet is equal to twelve
    
            reduced = 39
            packet4Str = 39[12-(3+9)] --> 390
            
        */
		let packet4Str: string = `${reduced}${12 - reducedDigitsSummed}`;

		let packet1Str = `${packet1.n1}${packet1.n2}${packet1.n3}`;
		let packet2Str = `${packet2.n1}${packet2.n2}${packet2.n3}`;
		let packet3Str = `${packet3.n1}${packet3.n2}${packet3.n3}`;

		return `/#${packet1Str}-${packet2Str}-${packet3Str}-${packet4Str}:/`;

		// method gen END
	}

	validate(): boolean {
		let keyedCodeStr: string = this.code.trim();

		let regEx: RegExp = new RegExp('\/#([0-9]{3})-([0-9]{3})-([0-9]{3})-([0-9]{3}):\/');
		if (!regEx.test(keyedCodeStr)) return false;
		if (keyedCodeStr.length != 19) return false;

		const codeStr = keyedCodeStr.substring(2, 17);

		// Code sub string. Individual packets in string format
		const css: Array<string> = codeStr.split('-');

		// Code sub integer. Individual packets in integer format
		const csi: Array<number> = Array(3);

		// Deconstructed code sub string. Individual characters of each packet in string format
		let deconstCsi: Array<Array<number>> = [Array(2), Array(2), Array(2), Array(2)];

		// @ts-ignore
		for (let [i, n] = [0, 0]; i <= 12, n < 4; i += 4, n++) {
			csi[n] = parseInt(codeStr.substring(i, i + 3));
		}

		for (let i = 0; i < 4; i++) {
			for (let n = 0; n <= 2; n++) {
				deconstCsi[i][n] = parseInt(css[i].substring(n, n + 1));
			}
		}

		// If the sum of any of the packets is more than twelve then return false
		if (
			reduceDigits(csi[0]) != 12 ||
			reduceDigits(csi[1]) != 12 ||
			reduceDigits(csi[2]) != 12 ||
			reduceDigits(csi[3]) != 12
		)
			return false;

		// Multiplies the nth digits of the nth packets
		let multiplicateOfFirstNumber = deconstCsi[0][0] * deconstCsi[1][0] * deconstCsi[2][0];
		let multiplicateOfSecondNumber = deconstCsi[0][1] * deconstCsi[1][1] * deconstCsi[2][1];
		let multiplicateOfThirdNumber = deconstCsi[0][2] * deconstCsi[1][2] * deconstCsi[2][2];

		// Reduces the multiplicates put after each other
		/* 
            eg.
            multiplicateOfFirstNumber = 146
            multiplicateOfSecondNumber = 320
            multiplicateOfThirdNumber = 896
    
            reduced = reduceDigits(146320896) --> 1+4+6+3+2+0+8+9+6=39
        */
		let reduced = parseInt(
			`${multiplicateOfFirstNumber}${multiplicateOfSecondNumber}${multiplicateOfThirdNumber}`
		);
		reduced = reduceDigits(reduced);

		/*
            Checks if the fourth packet's first two
            numbers equal the reduced value. The third
            number is there to make the packet's sum twelve
    
            reduced = 39 --> css[4] = 390
        */

		if (reduced.toString() != `${deconstCsi[3][0]}${deconstCsi[3][1]}`) return false;

		return true;

		// method validate END
	}

	// class code END
}
