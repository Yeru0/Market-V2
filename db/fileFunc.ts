import fs from "node:fs";
import readline from "node:readline";

// Reads any file line by line and returns them into an object
export function readLbL(fileName: string): Promise<string[]> {
    return new Promise((resolve: (value: string[]) => void, reject: (value: Error|string) => void) => {

        try {

            fs.access(fileName, fs.constants.F_OK, (err) => {
                if (err) {
                  reject(`DB ERROR: The file "${fileName}" does not exist or is not accessible.`);
                }
              });

            const fileStream = fs.createReadStream(`db/tables/${fileName}`);            

            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity, // To handle different line endings properly
            });

            let lines: string[] = [];
            // Pushes the line every time the a new line is read
            rl.on("line", (line) => {
                lines.push(line.trim());
            });

            // When the stream closes
            rl.on("close", () => {
                resolve(lines);
            });

        } catch (err) {          
            reject(err);
        }

    });
};

export function writeLbL(fileName: string, linesToWrite:string[], overwrite:boolean = false): Promise<string> {
    return new Promise((resolve, reject) => {
        let header = linesToWrite.splice(0,1)
        if(overwrite) {
            fs.writeFile(`db/tables/${fileName}`, `${header[0]}`, (err) => {
                if (err) {
                    reject(err);
                }
            });
        }

        for (const line of linesToWrite) {
            fs.appendFile(`db/tables/${fileName}`, `\n${line}`, (err) => {
                if (err) {
                    reject(err);
                }
            });
        }

        resolve("finished")


    });
};