export const ProgressBarVertical = ({ value = 0 }: { value: number }) => {
    const getColor = () => {
        if (value <= 25) return '#4CAF50';
        if (value <= 74) return '#D9A34A';

        return  '#FF4D4F'
    };

    return (
        <div className="ProgressBarVertical" style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative',
            height: '24px',
        }}>
            <div style={{
                height: '100%',
                width: `${value}%`,
                backgroundColor: getColor(),
                transition: 'width 0.3s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
        <span style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            left: '6%',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 1)',
        }}>
          {value} %
        </span>
            </div>
        </div>
    );
};
