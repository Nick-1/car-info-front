import {api} from "../axios";

export const ApiGetGroupByNameAndUserId = async (
  name: string,
  userId: number,
): Promise<any> => {

  try {
    const response = await api.get<any>(
      '/api/v1/vehicle-group/get-by-name-and-user-id',
        {
          params: { name, userId }
        }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    throw new Error(error.response?.data?.message || error.message);
  }
}
