import {api} from "../axios";

export const ApiGetDetailVehicleStatistic = async (
    vehicleId: number,
    year: number,
): Promise<any> => {

  try {
    const response = await api.get<any>(
      'api/v1/vehicle/detail-statistic/',
        {
          params: { vehicleId, year }
        }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    throw new Error(error.response?.data?.message || error.message);
  }
}
