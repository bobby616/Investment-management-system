export class FinishedOrderDTO {
    symbol: string;
    market: string;
    closedate: Date;
    direction: string;
    openPrice: number;
    units: number;
    closePrice: string;
    sellPrice: number;
    buyPrice: number;
    result: number;
    company: {
        abbr,
        name
    };
}