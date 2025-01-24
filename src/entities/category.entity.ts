type CategoryProps = {
    id?: string;
    title: string;
    color: string;
};


export class Category {
    public id?: string;
    public title: string;
    public color: string;

    constructor({title, color, id}: CategoryProps ){
        this.id = id;
        this.title = title;
        this.color = color.toUpperCase();
    }
}

const shoppingCategory = new Category({
    title:"title",
    color:"#fff33bb",
});