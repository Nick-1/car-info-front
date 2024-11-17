import TableStatistic, {TableStatisticConfig} from "../../components/TableStatistic";
import {apiGetStatisticByPeriodAndGroupId} from "../../api/endpoints/apiGetStatisticByPeriodAndGroupId.ts";
import {useEffect, useState} from 'react';
import {ApiGetGroupByNameAndUserId} from '../../api/endpoints/api-get-group-by-name-and-user-id.ts';

const GroupPage_2 = () => {
  const userId = Number(localStorage.getItem('userId'));
  const GROUP_NAME = 'group-2';
  const [groupId, setGroupId] = useState<number>(0);
  const [config, setConfig] = useState<TableStatisticConfig>({
    id: groupId,
    apiGetDataMethod: apiGetStatisticByPeriodAndGroupId,
    minDate: '2024-06-03',
  });

  useEffect(() => {
    const fetchGroupId = async () => {
      try {
        const groupData = await ApiGetGroupByNameAndUserId(GROUP_NAME, userId);
        const id = groupData?.id;
        if (id) {
          setGroupId(id);
          setConfig((prevConfig) => ({
            ...prevConfig,
            id: id,
          }));
        }
      } catch (error) {
        console.error("Error fetching group ID:", error);
      }
    };

    fetchGroupId();
  }, [userId]);

  return (
    <>
      {groupId ? <TableStatistic config={config} /> : <p>Loading...</p>}
    </>
  )
};

export default GroupPage_2;
