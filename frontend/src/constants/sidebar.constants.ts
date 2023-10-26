const sidebarItems = ['Home', 'Post', 'View', 'Profile', 'Log-out']
const sidebarRoutes = ['/home', '/post', '/view', '/profile']

export const SidebarMap :{
    [key: string]: string
} = {
    '/home': 'Home',
    '/post': 'Post',
    '/view': 'View',
    '/profile': 'Profile',
    '/': 'Log-out'
}

export const SidebarOptions = {
    'items': sidebarItems,
    'routes': sidebarRoutes
}