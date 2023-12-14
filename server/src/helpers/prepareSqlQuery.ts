import { ParsedQs } from 'qs';

export const prepareSqlQuery = (reqQuery: ParsedQs) => {
  const { patientId, doctorId, name, surname, startDate, sort, endDate, page = 1, pageSize = 50 } = reqQuery;
  const queryParams = [];
  const totalCountQueryParams = [];
  const whereClauses = [];

  let sortQuery = ``;

  if (sort) {
    const sortItems = JSON.parse(sort as string);
    if (Array.isArray(sortItems) && sortItems.length > 0) {
      sortQuery += ' ORDER BY ';

      sortItems.forEach((item: { field: string; sort: string }, index: number) => {
        if (index > 0) {
          sortQuery += ', ';
        }

        if (item.field === 'patientId') {
          sortQuery += `"patient"."surname" ${item.sort}`;
        } else {
          sortQuery += `"visit"."${item.field}" ${item.sort}`;
        }
      });
    }
  }

  if (patientId) {
    whereClauses.push(`"visit"."patientId" = $${queryParams.length + 1}`);
    queryParams.push(patientId);
    totalCountQueryParams.push(patientId);
  }

  if (name) {
    whereClauses.push(`"visit"."name" = $${queryParams.length + 1}`);
    queryParams.push(name);
    totalCountQueryParams.push(name);
  }

  if (surname) {
    whereClauses.push(`"patient"."surname" = $${queryParams.length + 1}`);
    queryParams.push(surname);
    totalCountQueryParams.push(surname);
  }

  if (doctorId) {
    whereClauses.push(`"visit"."doctorId" = $${queryParams.length + 1}`);
    queryParams.push(doctorId);
    totalCountQueryParams.push(doctorId);
  }

  if (startDate && endDate) {
    whereClauses.push(`"visit"."visitDate" BETWEEN $${queryParams.length + 1} AND $${queryParams.length + 2}`);
    queryParams.push(startDate, endDate);
    totalCountQueryParams.push(startDate, endDate);
  } else if (startDate) {
    whereClauses.push(`DATE("visit"."visitDate") = $${queryParams.length + 1}`);
    queryParams.push(startDate);
    totalCountQueryParams.push(startDate);
  }

  const offset = (+page - 1) * +pageSize;

  let query = `
    SELECT "visit".*, "patient"."surname"
    FROM visit
    JOIN patient ON "visit"."patientId" = "patient"."id"
  `;

  let totalCountQuery = `SELECT count(*) FROM visit`;

  if (whereClauses.length > 0) {
    query += ` WHERE ${whereClauses.join(' AND ')}`;
    totalCountQuery += ` WHERE ${whereClauses.join(' AND ')}`;
  }

  query += ` ${sortQuery ? sortQuery : 'ORDER by "visitDate" desc'} LIMIT $${queryParams.length + 1} OFFSET $${
    queryParams.length + 2
  }`;

  queryParams.push(pageSize, offset);

  return { query, queryParams, totalCountQuery, totalCountQueryParams };
};
