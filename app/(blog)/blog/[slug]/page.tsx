import { UnderlineHeading } from "@/components/underline-heading";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";


export default async function PostPage({params}: {params: Promise<{slug: string}>}) {

const {slug} = await params
  return (
		<main className="w-full max-w-5xl mx-auto  flex flex-col lg:flex lg:flex-row relative ">
			<div className="flex justify-start px-10 items-center py-6 gap-6 overflow-hidden w-full flex-col">
				<div className="w-full relative">
					<div className="h-58 w-full bg-zinc-700" />

					<button className=" text-zinc-50 px-6 py-0.5 font-bold text-xs shadow-[3px_3px_0px_#000] w-fit active:scale-98 tracking-wide absolute top-4 left-4 z-10 bg-red-500">
						<p className="uppercase font-extrabold"> technology</p>
					</button>

					<UnderlineHeading
						size="text-lg pt-2"
            text="Trump launches precision strikes is Nigeria, Sokoto as promised."
           
					/>

					<p className="text-sm py-4 font-light leading-6.5 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam tempore voluptates incidunt nihil atque quasi quibusdam placeat ea, recusandae sed? Rem eius, dolorum ad accusantium quasi a quo explicabo fugit voluptatibus quibusdam repellat harum animi itaque suscipit dolores dicta facilis nesciunt tenetur? Neque aut aperiam, consequatur eveniet voluptas voluptatum commodi.
            
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, similique. Quae saepe ea, fuga ex odio non tempora minima, ad atque sapiente beatae recusandae amet quo rem incidunt unde reprehenderit.
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti nesciunt similique tenetur, delectus debitis hic culpa! Iure ea, magni provident sequi architecto id vitae perspiciatis quis cumque, vel repellendus illum esse laudantium repudiandae sint praesentium? Sint quas modi id sequi aliquid magni maiores quia eos alias. Quisquam, autem vel rerum fugit id obcaecati? Dolores libero rem mollitia quisquam voluptatem dolor aliquam placeat! Laborum, sunt ipsum est ad quisquam deleniti porro?
          
					</p>
					<p className=" uppercase text-xs my-1 text-zinc-500">
						Dec 20 - chuddi
					</p>
					<div className="flex justify-between px-2">
						<div className="flex items-center gap-2">
							<Heart className="text-zinc-500" size={20} />
							<span className="text-xs text-zinc-500">354</span>
						</div>
						<div className="flex items-center gap-2">
							<MessageCircle className="text-zinc-500" size={20} />
							<span className="text-xs text-zinc-500">54</span>
						</div>
						<div>
							<Share2 size={20} className="text-zinc-500" />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
