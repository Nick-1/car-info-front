import TableStatistic, {TableStatisticConfig} from "../../components/TableStatistic";
import {apiGetStatisticByPeriodAndGroupId} from "../../api/endpoints/apiGetStatisticByPeriodAndGroupId.ts";

const GroupPage_2 = () => {
  const config: TableStatisticConfig = {
    id: 2,
    apiGetDataMethod: apiGetStatisticByPeriodAndGroupId,
    minDate: '2024-06-03'
  }

  return (
    <>
      <TableStatistic config={config}/>
    </>
  )
};

export default GroupPage_2;
