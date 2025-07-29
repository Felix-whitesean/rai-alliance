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
    poster_id: "Poster id",
    event_date: "Date",
    target_group: "Target Group [Default: public]",
    editor_group: "Who can edit",
    recording: "Recording ",
    presentation_slides: "Slides",
    path: "Path",
    displayed: "Display",
    linkedin_post: "LinkedIn post",
    fullname: "Guest Name",
    guest: "Guest id",
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
    recording: "url",
    presentation_slides: "url",
    poster_id: "text",
    event_date: "datetime-local",
    target_group: "select",
    editor_group: "select",
    event_id: "hidden",
    path: "hidden",
    displayed:  "select",
    linkedin_post: "url",
    guest: "text",
    fullname: "text",
}
export const GUEST_FIELD_TYPES = {
    guest_name: "text",
    email: "text",
    company: "text",
    linkedin: "url",
    country_of_residence: "text",
    position_in_company: "text",
    guest_id: "",
    company_website_url:"text",
}
export const GUEST_FIELD_NAMES = {
    guest_name: " Full Name",
    email: "Email",
    company: "Company",
    linkedin: "LinkedIn url",
    country_of_residence: "Country of Residence",
    position_in_company: "Position in Company",
    company_website_url: "Website URL",
}
export type EventRow = {
    event_id: string;
    event_title: string;
    event_theme: string;
    event_link: string;
    path: string;
    displayed: string;
    event_location: string;
    added_by?: string;
    target_group: string;
    editor_group: string;
    poster_id: string;
    event_date: string;
    recording: string;
    presentation_slides: string;
    date_created?: string,
    linkedin_post?: string,
    linkedin?: string;
    fullname: string;
    email?: string;
    company?: string;
    position_in_company?: string;
    company_website_url?: string;
    country_of_residence?: string;
    guest ?: string;
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