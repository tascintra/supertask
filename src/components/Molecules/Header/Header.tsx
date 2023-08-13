import Image from 'next/image'
import JohnAvatar from '@/assets/john-avatar.png'

export const Header = () => {
  return (
    <header className="flex items-center gap-4 px-5 pb-5 pt-8">
      <Image
        src={JohnAvatar}
        alt="John avatar"
        className="inset-1 rounded-full ring-1 ring-primary-900"
        priority={true}
      />
      <div>
        <h2 className="text-2xl">
          Hello,{' '}
          <span className="font-bold leading-none text-primary-900">John</span>
        </h2>
        <p className="leading-none text-neutral-400">Manage your tasks!</p>
      </div>
    </header>
  )
}
