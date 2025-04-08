import crypto from "node:crypto";

export class Record {
    id: string;
    constructor(line: string[], header: string[], needId?:boolean) {

        if (!header[0].includes("id")) {
            this.id = crypto.randomUUID()
        } else if (needId) {
            line.splice(header.indexOf("id"), 0, crypto.randomUUID())
        };

        if (header.length > line.length) throw new Error("DB ERROR: Not enough elements")
        else if (header.length < line.length) throw new Error("DB ERROR: Too many elements")

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
    constructor(header: string[], records: Record[]) {
        this.records = [];
        this.header = header;
        if (records) this.records = records;
        if(!header.includes("id")) header.unshift("id")
    }



    newRecord(line: string[], needID:boolean = true): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.header.length > line.length && !needID) reject("DB ERROR: Not enough elements")
            else if (this.header.length < line.length) reject("DB ERROR: Too many elements")
            else if (this.header.length > line.length + 1 && !needID) reject("DB ERROR: Not enough elements")
        
            let newRecord = new Record(line, this.header, needID)

            this.records.push(newRecord);

            resolve(`Added new record: ${newRecord}`)
        })
    }

    getRecord(id: string) {
        for (const record of this.records) {
            if (record.getField("id") === id) return record;
        }
    };

    getRecords() {
        return this.records
    }

    getHeader () {
        return this.header
    }

    //TODO RUD accessors, for the header as well

}