import { readLbL, writeLbL } from "./fileFunc";
import { Table, Record } from "./dbObjects";
import { log, table } from "node:console";
import { resolve } from "node:path";


export const readTable: (tableName: string) => Promise<Table> = async (tableName: string) => {


    // Slices off the header from data, puts the header into a separate
    // array, takes out the string from that array, then splits the
    // string apart into separate array elements into a new array
    let table: Record[] = [];

    return new Promise((resolve: (value: Table) => void, reject: (value: Error) => void) => {

        let data: string[] = [];

        readLbL(`${tableName}.csv`).then((result) => {
            data = result;

            if (data.length === 0) {
                reject(`DB ERROR: Given table with name ${table} is empty`);
                return;
            }

            let header: string[] = data.splice(0, 1)[0].split(",");



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
            if (err.code === "ENOENT") reject(`DB ERROR: Table with name "${tableName}" doesn't exist or is not accessible.`);
            reject(err);
        });

    });

};

export const writeTable: (tableValue: Table, overwrite?: boolean) => Promise<string> = async (tableValue: Table, overwrite?: boolean) => {
    return new Promise((resolve: (value: string) => void, reject: (value: Error) => void) => {

        let data: string[] = [];

        data.push(tableValue.getHeader().toString());

        for (const record of tableValue.getRecords()) {
            let properties: string[] = [];
            for (const [key, property] of Object.entries(record)) {
                properties.push(property);
            }
            data.push(properties.toString());
        }

        writeLbL(`${tableValue.tableName}.csv`, data, overwrite).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });

    });
};
