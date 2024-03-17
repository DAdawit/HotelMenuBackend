import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export async function paginate<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  { page, pageSize }: PaginationOptions
): Promise<PaginationResult<T>> {
  const total = await queryBuilder.getCount();
  const totalPages = Math.ceil(total / pageSize);
  const data = await queryBuilder
    .offset((page - 1) * pageSize)
    .limit(pageSize)
    .getMany();

  return {
    data,
    total,
    totalPages,
    currentPage: page,
    pageSize,
  };
}
