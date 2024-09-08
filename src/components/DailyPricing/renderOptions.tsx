import {GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {Link} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import classNames from 'classnames';

export const carColProps = {
    renderCell: (params: GridRenderCellParams) => {
        if (params.row.car.url) {
            return (
                <Link href={params.row.car.url} target="_blank" rel="noopener noreferrer">
                    {params.row.car.name}
                </Link>
            );
        }
        return <span>{params.row.car.name}</span>;
    },
    valueGetter: (params: any) => {
        return params.name;
    },
};

export const activeListingColProps = {
    renderCell: (params: GridRenderCellParams) => (
        params.row.listingEnabled ? <CheckCircleIcon color="success" /> : <RemoveCircleIcon color="error" />
    ),
};

export const dateAndPriceProps = (rowName: string): Partial<GridColDef> => {
    return {
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams) => {
            const row = params.row[rowName];
            const classes = classNames('priceRow', {
                'red': row?.wholeDayUnavailable,
                'green': !row?.wholeDayUnavailable,
            });

            if (row) {
                return <span className={classes}>${row.price}</span>;
            }

            return <span className="priceRow">-</span>;
        },
        valueGetter: (params: any) => {
            return params?.price;
        },
    };
};
