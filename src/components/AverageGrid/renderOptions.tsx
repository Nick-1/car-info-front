import {GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {ProgressBarVertical} from '../Layout/ProgressBarVertical';

export const renderCellParams = (rowName: string): Partial<GridColDef> => {
    return {
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams) => {
            if (params.row.id === 3 && params.row[rowName]) {
                return <div className="priceRow">
                            <ProgressBarVertical value={params.row[rowName]} />
                        </div>;
            }

            if (params.row[rowName]) {
                return <span className="priceRow">{params.row[rowName]}</span>;
            }

            return <span className="priceRow">-</span>;
        },
    };
};

export const itemColProps = {
    renderCell: (params: GridRenderCellParams) => {
        return (<span>{params.row.item.name}</span>);
    },
};
