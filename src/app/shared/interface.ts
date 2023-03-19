export interface fbResponse {
  name: string,
}

export interface productItem {
  id?: string,
  type: string,
  title: string,
  photo: string,
  info: string,
  price: string,
  date: Date
}

export interface orderItem {
  id?: string,
  name: string,
  phone: string,
  address: string,
  payment: string,
  price: number,
  products: productItem[],
  date: Date
}
