import { Category } from "./category"

export interface Product {
    productId: number
    barcode: string
    description: string
    perishable: boolean
    categoryId: Category
    unitofmeasurement: string
    purchasePrice: number
    salePrice: number
    statusId: number
}