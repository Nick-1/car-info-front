import {gridClasses, GridRowSpacingParams} from '@mui/x-data-grid';

export const dataGridStyles = () => ({
    [`& .${gridClasses.row}`]: {
        bgcolor: '#eee',
    },
});

export const rowSpacingStyle = (params: GridRowSpacingParams) => ({
    top: params.isFirstVisible ? 0 : 3,
    bottom: params.isLastVisible ? 0 : 3
});
