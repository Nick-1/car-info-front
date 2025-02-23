import {api} from "../axios";
import {VehicleStatistic} from '../../components/VehiclesStatisticTable';

export const ApiGetTopVehiclesByUnavailableDays = async (
    year: number,
    month: number,
    minUnavailableDays: number,
    limit: number,
): Promise<VehicleStatistic[]> => {

  try {
    const response = await api.get(
      'api/v1/statistic/get-top-vehicles-by-unavailable-days/',
        {
          params: { year, month, minUnavailableDays, limit }
        }
    );

    return response.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    throw new Error(error.response?.data?.message || error.message);
  }
}
