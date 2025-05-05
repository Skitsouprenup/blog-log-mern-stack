const defaultStyleDesktop = 'p-[0.75rem] cursor-pointer hover:bg-amber-200 rounded-lg'
export const btnDesktop = [
    {
        className: defaultStyleDesktop,
        title: 'Home',
        href: '/'
    },
    {
        className: defaultStyleDesktop,
        title: 'Trending',
        href: '/'
    },
    {
        className: defaultStyleDesktop,
        title: 'Most Popular',
        href: '/'
    },
    {
        className: 'bg-emerald-400 p-[0.75rem] rounded-lg '+
        'hover:bg-green-500 text-gray-900 cursor-pointer',
        title: 'Login',
        href: '/login'
    }
]

const defaultStyleMobile = 'cursor-pointer p-[0.75rem] w-[125px] border border-zinc-400/50 rounded-lg'
export const btnMobile = [
    {
        className: defaultStyleMobile,
        title: 'Home',
        href: '/'
    },
    {
        className: defaultStyleMobile,
        title: 'Trending',
        href: '/'
    },
    {
        className: defaultStyleMobile,
        title: 'Most Popular',
        href: '/'
    },
    {
        className: 'bg-emerald-400 p-[0.5rem] rounded-lg '+
        'hover:bg-fuchsia-400 text-gray-900 w-[125px]',
        title: 'Login',
        href: '/login'
    }
]