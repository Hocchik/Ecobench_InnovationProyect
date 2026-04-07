type UUID = string;

export interface Notification {
    id_notification: UUID;
    type_notification: string;
    client_building: string;
    send_date: string;
    details: NotificationsDetails;
}

export interface NotificationsDetails {
}

export interface ToolRequestDetails extends NotificationsDetails {
    id: UUID;
    request_number: string;
    name_technician: string;
    send_date: string;
    reason: string;
    items: ToolItemNoti[];
}
export interface ToolItemNoti {
    id_tool: UUID;
    code_tool: string;
    name_tool: string;
    requestedQuantity: number;
    availableQuantity: number; 
}


export interface CompletedActivity extends NotificationsDetails {
    id: UUID;
    title: string;
    order_number: string;
    building_client: string;
    address: string;
    type_activity: string;
    date: string;
    start_time: string;
    end_time: string;
    executor: string; // Name of the technician who executed the activity 
    activities: string[]; // Description of the activity performed
    tools: ActivityItemNoti[];
    required_parts: ActivityItemNoti[];
    supplies: ActivityItemNoti[];
}

export interface ActivityItemNoti {
    name: string;
    quantity: number;
}