
export interface Payment {
  id?: number;
  number: string;
  guid: string;
  contracGuid: string;
  contractId?: number;
  createDate: Date;
  summ?: number;
  mark?: number;

}
