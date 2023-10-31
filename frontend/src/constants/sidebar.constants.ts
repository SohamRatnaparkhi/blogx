const sidebarItems = ['Home', 'Post', 'View', 'Profile', 'Settings', 'Log-out']
const sidebarRoutes = ['/home', '/post', '/view', '/profile', '/settings', '/']

export const SidebarMap :{
    [key: string]: string
} = {
    '/home': 'Home',
    '/post': 'Post',
    '/view': 'View',
    '/profile': 'Profile',
    '/settings': 'Settings',
    '/': 'Log-out'
}

export const SidebarOptions = {
    'items': sidebarItems,
    'routes': sidebarRoutes
}