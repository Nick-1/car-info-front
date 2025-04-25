import {api} from "../axios";
import {Host} from '../../interfaces/host.ts';
import {DEFAULT_STATE} from '../../components/Filters/StatesFilter.tsx';

export const ApiGetHostsListByUserId = async (state?: string, country?: string): Promise<(Host & {vehiclesCount: number, firstVehicleImage: string})[]> => {
    const validState = state === DEFAULT_STATE ? '' : state;

    try {
        const response = await api.get('api/v1/host/list', {
            params: {
                country,
                state: validState,
            }
        });

        return response.data;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(error.response?.data?.message || error.message);
    }
}
