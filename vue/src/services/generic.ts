import { FilterQuery } from "@types-app/filter-query";
import axios from "./request";
import { ICrudOptions, TypeAllItemsDto } from "@types-app/index";

class GenericService<T = {}, TOne = T, TCreate = T, TUpdate = Partial<TCreate>>{
  private _url: string;
  private _name: string;

  constructor({ url, name }: ICrudOptions) {
    this._url = url;
    this._name = name;
  }

  async fetchAll(filterQuery?: FilterQuery<T>): Promise<TypeAllItemsDto<T>> {
    try {
      const { data } = await axios.get(`${this._url}/`, { params: filterQuery });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async fetchOne(id: number): Promise<TOne> {
    try {
      const { data } = await axios.get(`${this._url}/${id}`);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async create(payload: TCreate): Promise<T> {
    try {
      const { data } = await axios.post(`${this._url}/`, payload);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, payload: TUpdate): Promise<T> {
    try {
      const { data } = await axios.put(`${this._url}/${id}`, payload);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this._url}/${id}`);
    } catch (err) {
      throw err;
    }
  }
}

export { GenericService };
