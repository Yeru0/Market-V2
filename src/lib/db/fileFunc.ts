import fs from 'node:fs';
import readline from 'node:readline';

// Reads any file line by line and returns them into an object
export function readLbL(fileName: string): Promise<string[]> {
	return new Promise((resolve: (value: string[]) => void, reject: (value: Error) => void) => {
		try {
			let fileStream = fs.createReadStream(`static/tables/${fileName}`);

			const rl = readline.createInterface({
				input: fileStream,
				crlfDelay: Infinity // To handle different line endings properly
			});

			let lines: string[] = [];
			// Pushes the line every time the a new line is read
			rl.on('line', (line) => {
				lines.push(line.trim());
			});

			// When the stream closes
			rl.on('close', () => {
				resolve(lines);
			});
		} catch (error) {
			reject(error);
		}
	});
}

export function writeLbL(
	fileName: string,
	linesToWrite: string[],
	overwrite: boolean = false
): Promise<string> {
	return new Promise(async (resolve: (value: string) => void, reject: (value: Error) => void) => {
		let header = linesToWrite.splice(0, 1);
		let file: any;
		let linesWritten: number = 0;
		if (overwrite) {
			await fs.writeFile(`static/tables/${fileName}`, `${header[0]}`, (err) => {
				if (err) {
					reject(err);
				}
			});
		}

		if (linesToWrite.length == 0) {
			resolve('Finished');
			return;
		}

		//I need to slow this down to avoid conflicts
		let writingToFile = setInterval(async () => {
			let line = linesToWrite[linesWritten];
			await fs.appendFile(`static/tables/${fileName}`, `\n${line}`, (err) => {
				if (err) {
					reject(err);
				}
				linesWritten++;
			});
			if (linesWritten == linesToWrite.length - 1) clearInterval(writingToFile);
		}, 100);

		resolve('finished');
	});
}
