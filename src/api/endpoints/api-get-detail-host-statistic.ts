import {api} from "../axios";
import {HostDetailStatistic} from '../../pages/HostDetailStatisticPage';

export const ApiGetDetailHostStatistic= async (
    hostId: number,
    year: number,
    month: number,
): Promise<HostDetailStatistic> => {

  try {
    const response = await api.get<any>(
      'api/v1/host/detail-statistic/',
        {
          params: { hostId, year, month }
        }
    );

    return response.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    throw new Error(error.response?.data?.message || error.message);
  }
}
