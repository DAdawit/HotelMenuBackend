"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // Define a custom pagination and relation-fetching function
// async function paginateAndFetchRelations(
//   entity: EntitySchema<any>,
//   options: {
//     relations?: any;
//     order?: any;
//     take?: number;
//     skip?: number;
//   }
// ) {
//   // Use the find method with options for relations, ordering, and pagination
//   const items = await entity.find({
//     relations: options.relations,
//     order: options.order,
//     take: options.take,
//     skip: options.skip,
//   });
//   // Optionally, fetch total count for full pagination info
//   const total = await entity.count({
//     where: options.relations, // Adjust based on actual needs
//   });
//   // Calculate additional pagination details
//   const result = {
//     data: items,
//     total: total,
//     totalPages: Math.ceil(total / (options.take || 1)),
//     currentPage: (options.skip || 0) / (options.take || 1) + 1,
//     pageSize: options.take,
//   };
//   return result;
// }
