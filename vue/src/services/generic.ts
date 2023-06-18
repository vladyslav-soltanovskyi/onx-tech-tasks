import axios from "./request";
import { ICrudOptions } from "@types-app/index";

class GenericService<T = {}, TOne = T, TCreate = T, TUpdate = Partial<TCreate>>{
  private _url: string;
  private _name: string;

  constructor({ url, name }: ICrudOptions) {
    this._url = url;
    this._name = name;
  }

  async fetchAll(): Promise<T[]> {
    try {
      const { data } = await axios.get(`${this._url}/`);
      return data;
    } catch (err) {
      throw {
        err,
        error: true,
        message: `${this._name} on fetch all something wrong`,
      };
    }
  }

  async fetchOne(id: number): Promise<TOne> {
    try {
      const { data } = await axios.get(`${this._url}/${id}`);
      return data;
    } catch (err) {
      throw {
        err,
        error: true,
        message: `${this._name} with fetchOne request something wrong`,
      };
    }
  }

  async create(payload: TCreate): Promise<T> {
    try {
      const { data } = await axios.post(`${this._url}/`, payload);
      return data;
    } catch (err) {
      throw {
        err,
        error: true,
        message: `${this._name} with create request something wrong`,
      };
    }
  }

  async update(id: number, payload: TUpdate): Promise<T> {
    try {
      const { data } = await axios.put(`${this._url}/${id}`, payload);
      return data;
    } catch (err) {
      throw {
        err,
        error: true,
        message: `${this._name} with update request something wrong`,
      };
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this._url}/${id}`);
    } catch (err) {
      throw {
        err,
        error: true,
        message: `${this._name} with delete request something wrong`,
      };
    }
  }
}

export { GenericService };
