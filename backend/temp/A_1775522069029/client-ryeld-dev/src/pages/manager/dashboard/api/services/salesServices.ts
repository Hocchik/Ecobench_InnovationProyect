import axios from "../../../../../api/axios";
import { SALES_STATISTICS,SALES_CURRENT_MONTH,SALE_COMPARISON_CURRENT_MONTH } from "../endpoints/sales";

export const getSaleStatistics = () => axios.get(SALES_STATISTICS);
export const getSaleCurrentMonth = () => axios.get(SALES_CURRENT_MONTH);
export const getSaleComparisonCurrentMonth = () => axios.get(SALE_COMPARISON_CURRENT_MONTH);