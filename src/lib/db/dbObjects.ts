import crypto from "node:crypto";
import { error, log } from "node:console";

export class Record {
    id: string;
    constructor(line: string[], header: string[], needId?: boolean) {

        if (!header.includes("id")) {
            this.id = crypto.randomUUID();
        } else if (needId) {
            line.splice(header.indexOf("id"), 0, crypto.randomUUID());
        };


        if (header.length > line.length && !needId) throw new Error("DB ERROR: Not enough elements");
        if (header.length > line.length + 1 && needId) throw new Error("DB ERROR: Not enough elements");
        else if (header.length < line.length) throw new Error("DB ERROR: Too many elements");

        // For each field of the line it creates an object, where
        // the key is the corresponding header field, and the 
        // value is the value of the field
        for (const [index, field] of line.entries()) {
            this[header[index]] = field;
        }

    };

    getField(fieldName: string) {
        if (this[fieldName]) {
            return this[fieldName];
        } else {
            throw new Error(`DB ERROR: No field with name ${fieldName}`);
        }
    };

    setField(fieldName: string, newValue) {
        if (this[fieldName]) {

            for (const field in this) {
                if (field == fieldName) {
                    this[field] = newValue;

                }
            }

            return `Value changed to ${newValue} for ${fieldName}`;
        } else {
            throw new Error(`DB ERROR: No field with name ${fieldName}`);
        }
    };

}

export class Table {
    records: Record[];
    header: string[];
    tableName: string;
    constructor(header: string[], records: Record[], tableName: string) {
        this.records = [];
        this.header = header;
        this.tableName = tableName;
        if (records) this.records = records;
        if (!header.includes("id")) header.unshift("id");
    }



    newRecord(line: string[], needID: boolean = true): Promise<string> {
        return new Promise((resolve: (value: string) => void, reject: (value: Error) => void) => {
            //Check if the length of the new record is correct
            //If it needs id, then that's an extra field
            if (this.header.length > line.length && !needID) reject(new Error("DB ERROR: Not enough elements"));
            else if (this.header.length < line.length) reject(new Error("DB ERROR: Too many elements"));
            else if (this.header.length > line.length + 1 && needID) reject(new Error("DB ERROR: Not enough elements"));

            let newRecord = new Record(line, this.header, needID);

            this.records.push(newRecord);

            resolve(`Added new record: ${newRecord}`);
        });
    }

    getRecord(id: string): Promise<Record> {
        return new Promise((resolve: (value: Record) => void, reject: (value: Error) => void) => {
            for (const record of this.records) {
                if (record.getField("id") === id) resolve(record);
            }
            reject(new Error(`DB ERROR: Couldn't find record with id ${id}`));
        });
    };

    getRecords() {
        return this.records;
    }

    getHeader() {
        return this.header;
    }

    updateRecord(recordID: string, updateValue: string[]): Promise<string> {
        return new Promise((resolve: (value: string) => void, reject: (value: Error) => void) => {

            let oldRecord: Record;
            const newRecord = new Record(updateValue, this.header);
            this.getRecord(recordID).then((result) => {
                oldRecord = result;

                //Check if the amount of props match  
                if (Object.keys(newRecord).length > Object.keys(oldRecord).length) reject(new Error(`DB ERROR: Too many elements`));
                if (Object.keys(newRecord).length > Object.keys(oldRecord).length) reject(new Error(`DB ERROR: Not enough elements`));

                this.records[this.records.indexOf(oldRecord)] = newRecord;
                resolve("updated");


            }).catch((err) => {
                reject(err);
            });

        });
    }

    deleteRecord(recordID: string): Promise<string> {
        return new Promise((resolve: (value: string) => void, reject: (value: Error) => void) => {

            this.getRecord(recordID).then((result) => {
                let record: Record = result;

                let oldRecord: Record[] = this.records.splice(this.records.indexOf(record), 1);

                resolve("Success");

            }).catch((err) => {
                reject(err);
            });

        });
    }

}