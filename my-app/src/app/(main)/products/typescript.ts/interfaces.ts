//product images
export type TImages = string[]
//-----

//product tags
export type TTags = string[]
// -------

//product spec-proccessor
interface IProcessorItems  {
  label: string
  value: string
} 
type TProcessorItems = IProcessorItems[]
interface IProcessor {
  title: string
  items: TProcessorItems
}
//------

//product spec-memory
interface IMemoryItems {
  label: string
  value: string
}
type TMemoryItems = IMemoryItems[]
interface IMemory {
  title: string
  items: TMemoryItems
}
//-------

//product spec-storage
interface IStorageItems {
  label: string
  value: string
}
type TStorageItems = IStorageItems[]
interface IStorage {
  title: string
  items: TStorageItems
}
//--------

//product spec-display
interface IDisplayItems {
  label: string
  value: string
}
type TDisplayItems = IDisplayItems[]
interface IDisplay {
  title: string
  items: TDisplayItems
}
//-------

//product spec-os
interface IOsItems {
  label: string
  value: string
}
type TOsItems = IOsItems[]
interface IOs {
  title: string
  items: TOsItems
}
//-------

//product spec
export interface ISpec {
  processor: IProcessor
  memory: IMemory
  storage: IStorage
  display: IDisplay
  os: IOs
}

export interface Product {
  _id: string;
  sku: string;
  name: string;
  price: number;
  category: string;
  images: TImages;
  specs: ISpec;
  excerpt: string;
  description: string;
  tags: TTags;
  thumbnail: string;
  status: string;
  rating: number;
}