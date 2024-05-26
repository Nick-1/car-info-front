import {api} from "../axios";


export const apiGetStatisticByPeriodAndGroupId = async (
  groupId: number,
  from: string | null,
  to: string | null
): Promise<any> => {
  try {
    const response = await api.get<any>(
      `/api/v1/vehicle-group/statistic?groupId=${groupId}&from=${from}&to=${to}`
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    throw new Error(error.response?.data?.message || error.message);
  }
}
