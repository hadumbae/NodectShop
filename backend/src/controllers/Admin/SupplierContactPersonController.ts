import { Request, Response, NextFunction } from 'express';
import asyncHandler from "../../middleware/asyncHandler.js";
import SupplierContactPersonService from "../../services/Supplier/SupplierContactPersonService.js";

export const createSupplierContactPerson = asyncHandler(async (req: Request, res: Response) => {
   const {supplierID} = req.params;
   const data = req.body;

   const contactPerson = await SupplierContactPersonService.createSupplierContactPerson(supplierID, data);
   return res.status(200).json({message: "Contact person created successfully.", data: contactPerson});
});

export const fetchSupplierContactPerson = asyncHandler(async (req: Request, res: Response) => {
   const {supplierID, contactID} = req.params;

   const contactPerson =  await SupplierContactPersonService.fetchSupplierContactPerson(supplierID, contactID);
   return res.status(200).json({message: "Contact person fetch successfully.", data: contactPerson});
});

export const updateSupplierContactPerson = asyncHandler(async (req: Request, res: Response) => {
   const {supplierID, contactID} = req.params;
   const data = req.body;

   const contactPerson = await SupplierContactPersonService.updateSupplierContactPerson(supplierID, contactID, data);
   return res.status(200).json({message: "Contact person updated successfully.", data: contactPerson});
});

export const deleteSupplierContactPerson = asyncHandler(async (req: Request, res: Response) => {
   const {supplierID, contactID} = req.params;
   await SupplierContactPersonService.deleteSupplierContactPerson(supplierID, contactID);

   return res.status(200).json({message: "Contact person deleted successfully."});
});