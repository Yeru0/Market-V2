import crypto from "node:crypto";

export class Record {
    constructor(line: [string], header: [string]) {

        if (![header].includes("id")) this.id = crypto.randomUUID();

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
    constructor(header: [string], records?: [Record]) {
        this.records = [];
        this.header = header;
        if (records) this.records = records;
    }

    newRecord(line: [string]) {
        this.records.push(new Record(line, this.header));
    }

    getRecord(id: string) {
        for (const record of this.records) {
            if (record.getField("id") === id) return record;
        }
    };

    //TODO RUD accessors, for the header as well

}