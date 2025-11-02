export interface NavigationItem {
    title: string;
    children: {
        label: string;
        icon: string;
        badge?: string;
        route: string;
    }[];
}