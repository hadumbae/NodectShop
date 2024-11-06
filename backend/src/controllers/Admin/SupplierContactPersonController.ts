import { Request, Response, NextFunction } from 'express';
import asyncHandler from "../../middleware/asyncHandler.js";

export const createSupplierContactPerson = asyncHandler(async (req: Request, res: Response) => {
   const {supplierID} = req.params;
   const data = req.body;
});

export const fetchSupplierContactPerson = asyncHandler(async (req: Request, res: Response) => {
   const {supplierID, contactID} = req.params;
});

export const updateSupplierContactPerson = asyncHandler(async (req: Request, res: Response) => {
   const {supplierID, contactID} = req.params;
});

export const deleteSupplierContactPerson = asyncHandler(async (req: Request, res: Response) => {
   const {supplierID, contactID} = req.params;
});