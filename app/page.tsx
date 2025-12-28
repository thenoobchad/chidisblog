import { HighlightedText } from "@/components/highlighted-text";

export default function Home() {
	return (
		<main className="w-full ">
			<div className="flex justify-start px-10 items-center py-6 max-w-5xl mx-auto gap-6 overflow-hidden w-full flex-col">
				<div className="flex flex-row gap-2 items-center w-full">
					<h4>FEAT. </h4>
					<div className="w-full h-px bg-zinc-300" />
				</div>
				{new Array(3).fill(0).map((_,i) => (
					<div key={i}  className="w-full relative">
						<div className="h-58 w-full bg-zinc-700" />

						<button className=" text-zinc-50 px-6 py-0.5 font-bold text-xs shadow-[3px_3px_0px_#000] w-fit active:scale-98 tracking-wide absolute top-4 left-4 z-10 bg-red-500">
							<p className="uppercase font-extrabold"> technology</p>
						</button>

						<HighlightedText
							text="WHO TF IS IN MY HEAD??"
							textClass="text-xl py-4"
						/>
					</div>
				))}
			</div>
		</main>
	);
}
