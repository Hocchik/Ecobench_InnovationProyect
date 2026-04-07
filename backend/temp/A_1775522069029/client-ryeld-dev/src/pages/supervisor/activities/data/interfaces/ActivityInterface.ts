type UUID = string

export interface CalendarActivity{
    id_activity: UUID,
    title: string,
    section: string,
    client_location: ClientLocation,
    date: string,
    start_time: string,
    end_time: string,
    maintenance_type: string,
    status: boolean,
    building_client: string,
    technician_assigned: string,
    technician_executor: string,
    executor_position: string,
    name_coordinador: string,
    name_supervisor: string,
    name_client: string,
    activities: string[],
    tools: ActivityTools[],
    supplies: ActivitySupplies[],
    required_parts: ActivityParts[],
    comments: string,
    elevator_condition: string,
    image_url: string
}

export interface ClientLocation{
    id_client: UUID,
    building_client: string,
    name_client: string,
    address: string,
    access_doors: number,
    floor_doors: number
}

export interface ActivityTools{
    name: string,
    quantity: number
}

export interface ActivitySupplies{
    description: string,
    quantity: number
}

export interface ActivityParts{
    description: string,
    quantity: number
}

export interface UpdateActivity{
    id_activity: UUID; // UUID
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    status: boolean;
    technician_executor: string;
    activities: string[];
    tools: ActivityTools[];
    supplies: ActivitySupplies[];
    required_parts: ActivityParts[];
    comments: string;
    /* elevator_condition: string; */
    image_url: string;
}
