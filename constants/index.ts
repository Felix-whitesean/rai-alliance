export const FIELD_NAMES = {
    first_name: "First name",
    last_name: "Last name",
    username: "username",
    email: "Email",
    password: "Password",
    event_title: "Event title",
    event_theme: "Event description",
    event_location: "Event location",
    event_link: "Event link",
    poster_id: "Poster",
    event_date: "Date",
    target_group: "Target Group [Default: public]",
    editor_group: "Who can edit",
}
export const FIELD_TYPES = {
    first_name: "text",
    username: "text",
    last_name: "text",
    email: "email",
    password: "password",
    event_title: "text",
    event_theme: "text",
    event_location: "text",
    event_link: "url",
    poster_id: "text",
    event_date: "datetime-local",
    target_group: "select",
    editor_group: "select",
    event_id: "hidden"
}
export type EventRow = {
    event_id: string;
    event_title: string;
    event_theme: string;
    event_link: string;
    event_location: string;
    added_by?: string;
    target_group: string;
    editor_group: string;
    poster_id: string;
    event_date: string;
    date_created?: string,
};
export const ROLE_NAMES = {
    public : "Public",
    registered_users: "Registered users",
    admin: "Restricted",
    ambassadors: "RAI members",
}
export const ROLE_TYPES = {
    public : "3",
    registered_users: "4",
    admin: "1",
    ambassadors: "2",
}
export const select_groups = {
    roles: "Roles",
    editors: "Editors",
}