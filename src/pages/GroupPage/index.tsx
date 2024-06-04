import {apiGetStatisticByPeriodAndGroupId} from "../../api/endpoints/apiGetStatisticByPeriodAndGroupId.ts";
import TableStatistic, {TableStatisticConfig} from "../../components/TableStatistic";
const GroupPage = () => {
  const config: TableStatisticConfig = {
    id: 1,
    apiGetDataMethod: apiGetStatisticByPeriodAndGroupId,
    minDate: '2024/05/28',
  }

  return (
    <TableStatistic config={config}/>
  )
};

export default GroupPage;
