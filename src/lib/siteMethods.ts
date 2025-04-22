
// A function that tells how much the change should be
export const changeNotes = (inputNotes: { [key: number]: number; }, change: number) => {

    return new Promise((resolve: (value: { [key: number]: number; }) => void, reject: (value: string) => void) => {

        if (change < 0) {
            reject("Not enough notes given");
            return;
        } // The customer hasn't payed enough yet

        let avabNotes: { [key: number]: number; } = {
            ...inputNotes
        };

        delete avabNotes.id;
        for (let key in inputNotes) {
            avabNotes[key] = parseInt(avabNotes[key]);
        }



        let endValues: { [key: number]: number; } = {
            5: 0,
            50: 0,
            500: 0,
            5000: 0,
            10: 0,
            100: 0,
            1000: 0,
            10000: 0,
            20: 0,
            200: 0,
            2000: 0,
            20000: 0,
        };

        // If not divisible by five, then round to five
        if (change % 5 != 0) {
            change = 5 * Math.round(change / 5);
        }


        let currentNotePos: number = Object.keys(avabNotes).length - 1;

        while (currentNotePos >= 0) {
            let listId: string = Object.keys(avabNotes)[currentNotePos];
            let tryAmount = change - parseInt(listId); // If there is available note, then subtract the value from change

            if (avabNotes[listId] > 0 && tryAmount >= 0) { // If the note we want to use is available
                endValues[listId]++; // We want to use this note
                avabNotes[listId]--; // But now it is not available
                change = tryAmount; // Repeat
            } else {
                currentNotePos--; // The amount subtracted from the change was too large, so we need to go to the note one lower
            }

            if (currentNotePos <= -1 && change != 0) {
                reject("Not enough available notes");
                return;
            } //There aren't enough available notes to give change
        }

        resolve(endValues);
        // Promise END
    });

    //Method changeNotes END
};