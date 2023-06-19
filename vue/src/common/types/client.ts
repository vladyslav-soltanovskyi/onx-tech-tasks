import { ICar } from "./car";
import { IEmployee } from "./employee";
import { IOrder } from "./order";

interface IClient {
  id: number;
  name: string;
  surname: string;
  email: string;
  address: string;
  employee_id: number;
  created_at: string;
}

interface IClientDetalis {
  id: number;
  name: string;
  surname: string;
  email: string;
  address: string;
  employee_id: number;
  created_at: string;
  employee: IEmployee;
  cars: ICar[];
  orders: IOrder[];
}

interface ICLientCreate extends Omit<IClient, 'id' | 'created_at'> {}

export type { IClient, IClientDetalis, ICLientCreate };