import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SendHorizontal } from 'lucide-react'


export default async function page({ params }) {
    const slug = (await params).slug
    return (
        <main className='border-y border-r col-span-9'>
            <section className='border-b p-3 flex items-center gap-3'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <h1 className='capitalize font-medium'>{slug}</h1>
            </section>

            <ScrollArea className='h-[calc(70vh-80px)]'>
                <section className='space-y-3 p-3 flex flex-col gap-5' >
                    <div className='w-1/2'>
                        <div className='bg-secondary text-secondary-foreground p-3 rounded w-fit self-start space-y-3'>
                            <p className='text-sm text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, consequuntur nisi architecto, porro culpa aspernatur nostrum perspiciatis magni molestias eius labore enim, dolor id quo ipsa incidunt dolore! Accusamus, veritatis!</p>
                            <p className='text-xs text-end'>23.00</p>
                        </div>
                    </div>

                    <div className='w-1/2 self-end flex items-end justify-end'>
                        <div className='bg-primary text-primary-foreground p-3 rounded w-fit  space-y-3'>
                            <p className='text-sm  text-justify'>Hai {slug}, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa temporibus itaque dolore libero tempora ab fuga cumque excepturi in debitis? Ullam quaerat aliquid alias amet ipsa ut, perferendis odit consectetur? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos facilis, ipsa assumenda odit tempora accusamus maiores aspernatur obcaecati in. Magni commodi quis et explicabo provident eum voluptate accusantium accusamus ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate debitis optio voluptatum repellat temporibus explicabo architecto libero! Excepturi quam natus, unde aperiam reiciendis voluptate repudiandae qui? Dolor ea eveniet pariatur!</p>
                            <p className='text-xs text-end'>23.00</p>
                        </div>
                    </div>

                    <div className='w-1/2'>
                        <div className='bg-secondary text-secondary-foreground p-3 rounded w-fit self-start space-y-3'>
                            <p className='text-sm text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, consequuntur nisi architecto, porro culpa aspernatur nostrum perspiciatis magni molestias eius labore enim, dolor id quo ipsa incidunt dolore! Accusamus, veritatis!</p>
                            <p className='text-xs text-end'>23.00</p>
                        </div>
                    </div>

                    <div className='w-1/2 self-end flex items-end justify-end'>
                        <div className='bg-primary text-primary-foreground p-3 rounded w-fit  space-y-3'>
                            <p className='text-sm  text-justify'>Hai {slug}, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa temporibus itaque dolore libero tempora ab fuga cumque excepturi in debitis? Ullam quaerat aliquid alias amet ipsa ut, perferendis odit consectetur? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos facilis, ipsa assumenda odit tempora accusamus maiores aspernatur obcaecati in. Magni commodi quis et explicabo provident eum voluptate accusantium accusamus ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate debitis optio voluptatum repellat temporibus explicabo architecto libero! Excepturi quam natus, unde aperiam reiciendis voluptate repudiandae qui? Dolor ea eveniet pariatur!</p>
                            <p className='text-xs text-end'>23.00</p>
                        </div>
                    </div>
                </section>
            </ScrollArea>

            <div className='border-t p-3 flex gap-5'>
                <Input type="text" placeholder='Ketik Pesan' className='' />
                <Button className=''>Kirim <SendHorizontal /></Button>
            </div>
        </main>
    )
}
