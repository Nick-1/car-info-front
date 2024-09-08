import {api} from "../axios";

export const ApiGetGroupListByCategoryId = async (
    categoryId: number,
): Promise<any> => {
    try {
        const response = await api.get<any>(
            `/api/v1/category/${categoryId}/groups`
        );
        return response.data;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(error.response?.data?.message || error.message);
    }
}
