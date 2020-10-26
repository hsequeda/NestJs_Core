import { PaginatorParams } from 'src/core/dto/paginator.params.dto';

export default class PaginatorUtils {
	public static processQueryParams = (paginator: PaginatorParams): PaginatorParams | null => {
		let { page, limit, query } = paginator;
		query = String(undefined == query ? '' : query);

		if (page && limit && !isNaN(Number(page)) && !isNaN(Number(limit))) {
			return {
				page: Number(page),
				limit: Number(limit),
				query: query
			}
		} else if (page && !limit && !isNaN(Number(page))) {

			return {
				page: Number(page),
				query: query
			}
		}

		return { page: 1, query: query };
	}
}