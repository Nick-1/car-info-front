import {api} from "../axios";


export const apiGetStatisticByPeriodAndHostId = async (
  hostId: number,
  from: string | null,
  to: string | null
): Promise<any> => {
  try {
    const response = await api.get<any>(
      `/api/v1/vehicle/statistic?hostId=${hostId}&from=${from}&to=${to}`
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    throw new Error(error.response?.data?.message || error.message);
  }
}
