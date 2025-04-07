import { readLbL, writeLbL } from "./fileFunc";
import { Record, Table } from "./dbObjects";


const readTable: Table = async (tableName: string) => {

    let data: [string] = await readLbL(`${tableName}.csv`);

    // Slices off the header from data, puts the header into a separate
    // array, takes out the string from that array, then splits the
    // string apart into separate array elements into a new array
    let header: [string] = data.splice(0, 1)[0].split(",");
    let table = new Table(header);

    return new Promise((resolve, reject) => {

        try {
            for (const lines of data) {
                let line = lines.split(",");
                table.newRecord(line);
            }

            resolve(table);

        } catch (err) {
            reject(err);
        }

    });

};

readTable("asd").then((result) => {
    let AsdTable = result;
});

// writeLbL("asd.csv", ["a,b,c"]);

// TODO Write table whatever