import { ICrudOptions } from "@types-app/index";
declare class GenericService<T = {}, TOne = T, TCreate = T, TUpdate = Partial<TCreate>> {
    private _url;
    private _name;
    constructor({ url, name }: ICrudOptions);
    fetchAll(): Promise<T[]>;
    fetchOne(id: number): Promise<TOne>;
    create(payload: TCreate): Promise<T>;
    update(id: number, payload: TUpdate): Promise<T>;
    delete(id: number): Promise<void>;
}
export { GenericService };
