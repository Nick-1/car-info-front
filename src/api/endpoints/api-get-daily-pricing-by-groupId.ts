import {api} from "../axios";
import {convertStatesToQueryString} from '../helpers';

export const ApiGetDailyPricingByGroupId = async (
  groupId: number,
  year: number,
  month: number,
  listingEnabled: boolean = false,
  state: string
): Promise<any> => {
  const states = convertStatesToQueryString(state)
  try {
    const response = await api.get<any>(
      `/api/v1/daily-pricing/group/${groupId}/year/${year}/month/${month}?listingEnabled=${listingEnabled}${states}`
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    throw new Error(error.response?.data?.message || error.message);
  }
}
