const defaultStyleDesktop = 'p-[0.75rem] cursor-pointer hover:bg-emerald-200 rounded-lg'
export const btnDesktop = [
    {
        className: defaultStyleDesktop,
        title: 'Home'
    },
    {
        className: defaultStyleDesktop,
        title: 'Trending'
    },
    {
        className: defaultStyleDesktop,
        title: 'Most Popular'
    },
    {
        className: 'bg-emerald-400 p-[0.75rem] rounded-lg '+
        'hover:bg-green-500 text-gray-900 cursor-pointer',
        title: 'Login'
    }
]

const defaultStyleMobile = 'cursor-pointer p-[0.75rem] w-[125px] border border-zinc-400/50 rounded-lg'
export const btnMobile = [
    {
        className: defaultStyleMobile,
        title: 'Home'
    },
    {
        className: defaultStyleMobile,
        title: 'Trending'
    },
    {
        className: defaultStyleMobile,
        title: 'Most Popular'
    },
    {
        className: 'bg-emerald-400 p-[0.5rem] rounded-lg '+
        'hover:bg-fuchsia-400 text-gray-900 w-[125px]',
        title: 'Login'
    }
]