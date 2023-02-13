import { Post } from "../types/Post"

type Props = {
    data: Post
}

export const PostItem = ({data}: Props) => {

    return(
        <div className='flex flex-col bg-stone-900 rounded p-10 items-center relative'>

            <h2 className='text-sm text-slate-200 uppercase mb-5'>{data.title}</h2>

            <h3 className='text-xs text-slate-200'>{data.body}{data.body}</h3>

            <p className='text-xs text-slate-200 absolute bottom-0 left-0 ml-5 mb-2'>#{data.id}</p>

          </div>
    )
}