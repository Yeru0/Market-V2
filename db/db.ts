import { readLbL, writeLbL } from "./fileFunc";
import { Table, Record } from "./dbObjects";
import { log, table } from "node:console";
import { resolve } from "node:path";


const readTable: (tableName: string) => Promise<Table> = async (tableName: string) => {

    let data: string[] = await readLbL(`${tableName}.csv`);

    // Slices off the header from data, puts the header into a separate
    // array, takes out the string from that array, then splits the
    // string apart into separate array elements into a new array
    let header: string[] = data.splice(0, 1)[0].split(",");
    let table: Record[] = [];

    return new Promise((resolve, reject) => {

        try {
            for (const lines of data) {
                let line = lines.split(",");
                table.push(new Record(line, header));
            }

            resolve(new Table(header, table));

        } catch (err) {
            reject(err);
        }

    });

};

const writeTable: (tableName: string, tableValue: Table, overwrite?:boolean) => Promise<string> = async (tableName: string, tableValue: Table, overwrite?:boolean) => {
    return new Promise((resolve, reject) => {

        let data: string[] = []
        
        data.push(tableValue.getHeader().toString())

        for (const record of tableValue.getRecords()) {
            let properties: string[] = []
            for (const [key, property] of Object.entries(record)) {
                properties.push(property)
            }
            data.push(properties.toString())
        }

        writeLbL(`${tableName}.csv`, data, overwrite).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })

    })
}

readTable("asd").then((result) => {
    let AsdTable = result;

    AsdTable.newRecord(["This","Is","New"], true).catch((err) => {
        console.log(err);
        
    })

    writeTable("asd", AsdTable, true).then((result) => {
        console.log(result)
    })
});

// TODO Update
/* TODO not handled empty table nonexistent */