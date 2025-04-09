import { readLbL, writeLbL } from "./fileFunc";
import { Table, Record } from "./dbObjects";
import { log, table } from "node:console";
import { resolve } from "node:path";


export const readTable: (tableName: string) => Promise<Table> | any = async (tableName: string) => {


    // Slices off the header from data, puts the header into a separate
    // array, takes out the string from that array, then splits the
    // string apart into separate array elements into a new array
    let table: Record[] = [];

    return new Promise((resolve, reject) => {

        let data: string[] = [];

        readLbL(`${tableName}.csv`).then((result) => {
            data = result;

            let header: string[] = data.splice(0, 1)[0].split(",");


            if (data.length === 0 || data.length === 1) reject("DB ERROR: Given table empty");


            try {
                for (const lines of data) {
                    let line = lines.split(",");
                    table.push(new Record(line, header));
                }

                resolve(new Table(header, table, tableName));

            } catch (err) {
                reject(err);
            }

        }).catch((err) => {
            console.log(err);

            if (err.code === "ENOENT") reject(`DB ERROR: Table with name "${tableName}" doesn't exist or is not accessible.`);
            reject(err);
        });

    });

};

export const writeTable: (tableName: string, tableValue: Table, overwrite?: boolean) => Promise<string> = async (tableName: string, tableValue: Table, overwrite?: boolean) => {
    return new Promise((resolve, reject) => {

        let data: string[] = [];

        data.push(tableValue.getHeader().toString());

        for (const record of tableValue.getRecords()) {
            let properties: string[] = [];
            for (const [key, property] of Object.entries(record)) {
                properties.push(property);
            }
            data.push(properties.toString());
        }

        writeLbL(`${tableName}.csv`, data, overwrite).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });

    });
};

readTable("asd").catch((err) => {
    console.log(err);

});

/* TODO not handled empty table nonexistent */
// TODO SET TYPE ON PROMISES AS WELL