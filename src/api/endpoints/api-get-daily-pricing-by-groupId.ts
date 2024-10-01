import {api} from "../axios";

export const ApiGetDailyPricingByGroupId = async (
  groupId: number,
  year: number,
  month: number,
  listingEnabled: boolean = false,
): Promise<any> => {
  try {
    const response = await api.get<any>(
      `/api/v1/daily-pricing/group/${groupId}/year/${year}/month/${month}?listingEnabled=${listingEnabled}`
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    throw new Error(error.response?.data?.message || error.message);
  }
}
