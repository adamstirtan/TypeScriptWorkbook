export class TodoItem {

    constructor(public id: number,
                public label: string,
                public isComplete: boolean = false)
    { }

    public printDetails(): void
    {
        console.log(`${this.id}\t${this.label}\t${this.isComplete}`);
    }
}