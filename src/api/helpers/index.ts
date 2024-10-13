export function convertStatesToQueryString(states: string): string {
    return states
        .split(',')
        .map(state => state.trim())
        .filter(state => state)
        .map(state => `&state=${state}`)
        .join('');
}
