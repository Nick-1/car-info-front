import {api} from "../axios";
import {VehicleStatistic} from '../../components/VehiclesStatisticTable';

export const ApiGetStatisticFroGroup = async (
    groupName: string,
    year: number,
    month: number,
): Promise<VehicleStatistic[]> => {

  try {
    const response = await api.get(
      `api/v1/statistic/group/${groupName}`,
        {
          params: { year, month },
        }
    );

    return response.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    throw new Error(error.response?.data?.message || error.message);
  }
}
