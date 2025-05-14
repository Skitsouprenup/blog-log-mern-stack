const writeBlogBtnHidden = 'max-md:block hidden'

const defaultStyleDesktop = 'p-[0.75rem] cursor-pointer hover:bg-amber-200 rounded-lg font-medium'
export const btnDesktop = [
    {
        className: defaultStyleDesktop,
        title: 'Home',
        href: '/'
    },
    {
        className: defaultStyleDesktop,
        title: 'Posts',
        href: '/posts'
    },
    {
        className: `${defaultStyleDesktop} ${writeBlogBtnHidden}`,
        title: 'Write',
        href: '/write'
    },
    {
        className: 'bg-emerald-400 p-[0.75rem] rounded-lg '+
        'hover:bg-green-500 text-gray-900 cursor-pointer font-medium',
        title: 'Login',
        href: '/login'
    }
]

const defaultStyleMobile = 'cursor-pointer p-[0.75rem] w-[125px]'+
' border border-zinc-400/50 rounded-lg font-medium'


export const btnMobile = [
    {
        className: defaultStyleMobile,
        title: 'Home',
        href: '/'
    },
    {
        className: defaultStyleMobile,
        title: 'Posts',
        href: '/posts'
    },
    {
        className: `${defaultStyleMobile} ${writeBlogBtnHidden}`,
        title: 'Write',
        href: '/write'
    },
    {
        className: 'bg-emerald-400 p-[0.5rem] rounded-lg '+
        'hover:bg-fuchsia-400 text-gray-900 w-[125px] font-medium',
        title: 'Login',
        href: '/login'
    }
]