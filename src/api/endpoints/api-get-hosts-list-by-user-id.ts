import {api} from "../axios";
import {Host} from '../../interfaces/host.ts';

export const ApiGetHostsListByUserId = async (): Promise<(Host & {vehiclesCount: number, firstVehicleImage: string})[]> => {
    try {
        const response = await api.get('api/v1/host/list');

        return response.data;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(error.response?.data?.message || error.message);
    }
}
