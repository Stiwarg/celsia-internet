export class DateValidatos {
    static isBeforeToday = ( date: Date ): boolean => {
        const today = new Date();

        today.setHours(0, 0, 0, 0 );
        const inputDate = new Date( date );
        inputDate.setHours(0, 0, 0, 0 );
        return inputDate <= today;
    }
}